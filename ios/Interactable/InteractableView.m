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
@property (nonatomic, assign) CGPoint origin;
@property (nonatomic, assign) CGPoint initialPanCenter;
@property (nonatomic) UIDynamicAnimator *animator;
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
    }
    return self;
}

- (void)didMoveToSuperview
{
    [super didMoveToSuperview];
    if (self.superview)
    {
        self.animator = [[UIDynamicAnimator alloc] initWithReferenceView:self.superview];
        self.animator.delegate = self;
    }
}

- (void)reactSetFrame:(CGRect)frame
{
    [super reactSetFrame:frame];
    self.origin = self.center;
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
        CGPoint correctedCenter = CGPointMake(self.center.x + VTPP*velocity.x, self.center.y + VTPP*velocity.y);
        InteractablePoint *snapPoint = [self findClosestPoint:self.snapTo toPoint:correctedCenter];
        if (snapPoint)
        {
            [self setVelocity:velocity];
            [self snapToPoint:snapPoint];
        }
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

- (void)setVelocity:(CGPoint)velocity
{
    UIDynamicItemBehavior *itemBehaviour = [[UIDynamicItemBehavior alloc] initWithItems:@[self]];
    itemBehaviour.allowsRotation = self.allowRotation;
    itemBehaviour.resistance = 0;
    [itemBehaviour addLinearVelocity:velocity forItem:self];
    [self.animator addBehavior:itemBehaviour];
}

- (void)snapToPoint:(InteractablePoint*)snapPoint
{
    UISnapBehavior *snapBehaviour = [[UISnapBehavior alloc] initWithItem:self snapToPoint:[snapPoint positionWithOrigin:self.origin]];
    snapBehaviour.damping = snapPoint.damping;
    [self.animator addBehavior:snapBehaviour];
}

- (void)dynamicAnimatorDidPause:(UIDynamicAnimator *)animator
{
    
}

@end
