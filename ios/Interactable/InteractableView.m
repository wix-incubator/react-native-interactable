//
//  InteractableView.m
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "InteractableView.h"
#import <React/UIView+React.h>

const CGFloat VTPP = 0.1; // VELOCITY_TO_POSITION_PROJECTION

@interface InteractableView()
@property (nonatomic, assign) BOOL originSet;
@property (nonatomic, assign) CGPoint origin;
@property (nonatomic, assign) CGPoint initialPanCenter;
@property (nonatomic) PhysicsAnimator *animator;
@property (nonatomic, assign) BOOL initialPositionSet;
@end

@implementation InteractableView

- (instancetype)init
{
    if ((self = [super init]))
    {
        UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handlePan:)];
        [pan setMinimumNumberOfTouches:1];
        [pan setMaximumNumberOfTouches:1];
        [self addGestureRecognizer:pan];
        self.originSet = NO;
        self.initialPositionSet = NO;
    }
    return self;
}

- (void)didMoveToSuperview
{
    [super didMoveToSuperview];
    if (self.superview)
    {
        self.animator = [[PhysicsAnimator alloc] initWithReferenceView:self.superview];
        self.animator.delegate = self;
    }
}

- (void)reactSetFrame:(CGRect)frame
{
    [super reactSetFrame:frame];
    self.origin = self.center;
    self.originSet = YES;
    
    // initial position
    if (!self.initialPositionSet)
    {
        self.initialPositionSet = YES;
        if (!CGPointEqualToPoint(self.initialPosition, CGPointZero))
        {
            self.center = CGPointMake(self.origin.x + self.initialPosition.x, self.origin.y + self.initialPosition.y);
        }
    }
}

- (void)setCenter:(CGPoint)center
{
    if (self.originSet)
    {
        if (self.horizontalOnly) center.y = self.origin.y;
        if (self.verticalOnly) center.x = self.origin.x;
        
        if (self.limitX)
        {
            if (center.x - self.origin.x < self.limitX.min) center.x = self.limitX.min + self.origin.x;
            if (center.x - self.origin.x > self.limitX.max) center.x = self.limitX.max + self.origin.x;
        }
        if (self.limitY)
        {
            if (center.y - self.origin.y < self.limitY.min) center.y = self.limitY.min + self.origin.y;
            if (center.y - self.origin.y > self.limitY.max) center.y = self.limitY.max + self.origin.y;
        }
    }
    
    [super setCenter:center];
    [self reportAnimatedEvent];
}

- (void)handlePan:(UIPanGestureRecognizer *)pan
{
    if (pan.state == UIGestureRecognizerStateBegan)
    {
        self.initialPanCenter = self.center;
        [self.animator removeAllBehaviors];
    }
    
    CGPoint translation = [pan translationInView:self];
    if (self.horizontalOnly)
    {
        self.center = CGPointMake(self.initialPanCenter.x + translation.x, self.initialPanCenter.y);
    } else if (self.verticalOnly)
    {
        self.center = CGPointMake(self.initialPanCenter.x, self.initialPanCenter.y + translation.y);
    } else
    {
        self.center = CGPointMake(self.initialPanCenter.x + translation.x, self.initialPanCenter.y + translation.y);
    }
    
    if (pan.state == UIGestureRecognizerStateEnded)
    {
        CGPoint velocity = [pan velocityInView:self.superview];
        if (self.horizontalOnly) velocity.y = 0;
        if (self.verticalOnly) velocity.x = 0;
        CGPoint projectedCenter = CGPointMake(self.center.x + VTPP*velocity.x, self.center.y + VTPP*velocity.y);
        InteractablePoint *snapPoint = [self findClosestPoint:self.snapTo toPoint:projectedCenter];
        if (snapPoint)
        {
            [self.animator setTarget:self velocity:velocity];
            [self snapToPoint:snapPoint];
        }
        
        [self bounceFromLimits];
    }
}

- (InteractablePoint*)findClosestPoint:(NSArray<InteractablePoint *>*)points toPoint:(CGPoint)relativeToPoint
{
    InteractablePoint *res = nil;
    CGFloat minDistance = CGFLOAT_MAX;
    for (InteractablePoint *point in points)
    {
        CGFloat distance = [point distanceFromPoint:relativeToPoint withOrigin:self.origin];
        if (distance < minDistance)
        {
            minDistance = distance;
            res = point;
        }
    }
    return res;
}

- (void)snapToPoint:(InteractablePoint*)snapPoint
{
    PhysicsSnapBehavior *snapBehaviour = [[PhysicsSnapBehavior alloc] initWithTarget:self snapToPoint:[snapPoint positionWithOrigin:self.origin]];
    snapBehaviour.damping = snapPoint.damping;
    snapBehaviour.tension = snapPoint.strength;
    [self.animator addBehavior:snapBehaviour];
}

- (void)bounceFromLimits
{
    if (self.limitX && self.limitX.bounce > 0.0)
    {
        CGPoint minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
        if (self.limitX.min != -CGFLOAT_MAX) minPoint.x = self.origin.x + self.limitX.min;
        CGPoint maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
        if (self.limitX.max != CGFLOAT_MAX) maxPoint.x = self.origin.x + self.limitX.max;
        PhysicsBounceBehavior *bounceBehavior = [[PhysicsBounceBehavior alloc] initWithTarget:self minPoint:minPoint maxPoint:maxPoint];
        bounceBehavior.bounce = self.limitX.bounce;
        [self.animator addBehavior:bounceBehavior];
    }
    if (self.limitY && self.limitY.bounce > 0.0)
    {
        CGPoint minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
        if (self.limitY.min != -CGFLOAT_MAX) minPoint.y = self.origin.y + self.limitY.min;
        CGPoint maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
        if (self.limitY.max != CGFLOAT_MAX) maxPoint.y = self.origin.y + self.limitY.max;
        PhysicsBounceBehavior *bounceBehavior = [[PhysicsBounceBehavior alloc] initWithTarget:self minPoint:minPoint maxPoint:maxPoint];
        bounceBehavior.bounce = self.limitY.bounce;
        [self.animator addBehavior:bounceBehavior];
    }
}

- (void)physicsAnimatorDidPause:(PhysicsAnimator *)animator
{
    if (!self.onSnap) return;
    InteractablePoint *snapPoint = [self findClosestPoint:self.snapTo toPoint:self.center];
    if (snapPoint)
    {
        self.onSnap(@
        {
            @"index": @([self.snapTo indexOfObject:snapPoint]),
            @"id": snapPoint.id
        });
    }
}

- (void)reportAnimatedEvent
{
    if (self.onAnimatedEvent && self.originSet)
    {
        CGPoint deltaFromOrigin = [InteractablePoint deltaBetweenPoint:self.center andOrigin:self.origin];
        self.onAnimatedEvent(@
        {
            @"x": @(deltaFromOrigin.x),
            @"y": @(deltaFromOrigin.y)
        });
    }
}

@end
