//
//  InteractableView.m
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "InteractableView.h"
#import <React/UIView+React.h>

@interface InteractableView()
@property (nonatomic, assign) BOOL originSet;
@property (nonatomic, assign) CGPoint origin;
@property (nonatomic) PhysicsAnimator *animator;
@property (nonatomic) PhysicsBehavior *dragBehavior;
@property (nonatomic, assign) CGPoint dragStartCenter;
@property (nonatomic, assign) CGPoint dragStartLocation;
@property (nonatomic, assign) BOOL initialPositionSet;
@end

@implementation InteractableView

- (instancetype)init
{
    if ((self = [super init]))
    {
        self.originSet = NO;
        self.initialPositionSet = NO;
    }
    return self;
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
        
        // make sure this is after origin is set and happens once
        [self initializeAnimator];
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

- (void)initializeAnimator
{
    self.animator = [[PhysicsAnimator alloc] init];
    self.animator.delegate = self;
    
    // initialize constant behaviors
    if (self.springs)
    {
        for (InteractablePoint *point in self.springs) [self addConstantSpringBehavior:point];
    }
    if (self.gravity)
    {
        for (InteractablePoint *point in self.gravity) [self addConstantGravityBehavior:point];
    }
}

- (void)physicsAnimatorDidPause:(PhysicsAnimator *)animator
{
    if (!self.onSnap) return;
    InteractablePoint *snapPoint = [InteractablePoint findClosestPoint:self.snapTo toPoint:self.center withOrigin:self.origin];
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

// MARK: - Touches

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *touch = [[event allTouches] anyObject];
    self.dragStartCenter = self.center;
    self.dragStartLocation = [touch locationInView:self.superview];
    
    [self setTempBehaviorsForDragStart];
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *touch = [[event allTouches] anyObject];
    CGPoint location = [touch locationInView:self.superview];
    CGFloat newCenterX = self.dragStartCenter.x + location.x - self.dragStartLocation.x;
    CGFloat newCenterY = self.dragStartCenter.y + location.y - self.dragStartLocation.y;
    
    self.dragBehavior.anchorPoint = CGPointMake(newCenterX, newCenterY);
    [self.animator ensureRunning];
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self setTempBehaviorsForDragEnd];
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self setTempBehaviorsForDragEnd];
}

- (void)setTempBehaviorsForDragStart
{
    [self.animator removeTempBehaviors];
    self.dragBehavior = nil;
    
    self.dragBehavior = [self addTempDragBehavior:self.drag];
}

- (void)setTempBehaviorsForDragEnd
{
    [self.animator removeTempBehaviors];
    self.dragBehavior = nil;
    
    CGPoint velocity = [self.animator getTargetVelocity:self];
    if (self.horizontalOnly) velocity.y = 0;
    if (self.verticalOnly) velocity.x = 0;
    CGFloat toss = 0.1;
    if (self.drag) toss = self.drag.toss;
    CGPoint projectedCenter = CGPointMake(self.center.x + toss*velocity.x, self.center.y + toss*velocity.y);
    
    InteractablePoint *snapPoint = [InteractablePoint findClosestPoint:self.snapTo toPoint:projectedCenter withOrigin:self.origin];
    if (snapPoint) [self addTempSnapToPointBehavior:snapPoint];
    
    [self addTempBounceBehaviorWithLimitX:self.limitX limitY:self.limitY];
}

// MARK: - Behaviors

- (PhysicsBehavior*)addTempDragBehavior:(InteractableDrag*)drag
{
    PhysicsBehavior *res = nil;
    
    if (!drag || drag.tension == CGFLOAT_MAX)
    {
        PhysicsAnchorBehavior *anchorBehavior = [[PhysicsAnchorBehavior alloc] initWithTarget:self anchorPoint:self.center];
        res = anchorBehavior;
        [self.animator addTempBehavior:anchorBehavior];
    }
    else
    {
        PhysicsSpringBehavior *springBehavior = [[PhysicsSpringBehavior alloc] initWithTarget:self anchorPoint:self.center];
        springBehavior.tension = drag.tension;
        res = springBehavior;
        [self.animator addTempBehavior:springBehavior];
    }
    
    if (drag && drag.damping > 0.0)
    {
        PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
        frictionBehavior.friction = drag.damping;
        [self.animator addTempBehavior:frictionBehavior];
    }
    
    return res;
}

- (void)addTempSnapToPointBehavior:(InteractablePoint*)snapPoint
{
    PhysicsSpringBehavior *snapBehavior = [[PhysicsSpringBehavior alloc] initWithTarget:self anchorPoint:[snapPoint positionWithOrigin:self.origin]];
    snapBehavior.tension = snapPoint.tension;
    [self.animator addTempBehavior:snapBehavior];
    
    CGFloat damping = 0.7;
    if (snapPoint.damping > 0.0) damping = snapPoint.damping;
    PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
    frictionBehavior.friction = damping;
    [self.animator addTempBehavior:frictionBehavior];
}

- (void)addTempBounceBehaviorWithLimitX:(InteractableLimit*)limitX limitY:(InteractableLimit*)limitY
{
    if (limitX && limitX.bounce > 0.0)
    {
        CGPoint minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
        if (limitX.min != -CGFLOAT_MAX) minPoint.x = self.origin.x + limitX.min;
        CGPoint maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
        if (limitX.max != CGFLOAT_MAX) maxPoint.x = self.origin.x + limitX.max;
        PhysicsBounceBehavior *bounceBehavior = [[PhysicsBounceBehavior alloc] initWithTarget:self minPoint:minPoint maxPoint:maxPoint];
        bounceBehavior.bounce = limitX.bounce;
        [self.animator addTempBehavior:bounceBehavior];
    }
    if (limitY && limitY.bounce > 0.0)
    {
        CGPoint minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
        if (limitY.min != -CGFLOAT_MAX) minPoint.y = self.origin.y + limitY.min;
        CGPoint maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
        if (limitY.max != CGFLOAT_MAX) maxPoint.y = self.origin.y + limitY.max;
        PhysicsBounceBehavior *bounceBehavior = [[PhysicsBounceBehavior alloc] initWithTarget:self minPoint:minPoint maxPoint:maxPoint];
        bounceBehavior.bounce = limitY.bounce;
        [self.animator addTempBehavior:bounceBehavior];
    }
}

- (void)addConstantSpringBehavior:(InteractablePoint*)point
{
    CGPoint anchor = self.origin;
    if (point.x != CGFLOAT_MAX) anchor.x = self.origin.x + point.x;
    if (point.y != CGFLOAT_MAX) anchor.y = self.origin.y + point.y;
    
    PhysicsSpringBehavior *springBehavior = [[PhysicsSpringBehavior alloc] initWithTarget:self anchorPoint:anchor];
    springBehavior.tension = point.tension;
    springBehavior.influence = [self influenceAreaFromPoint:point];
    [self.animator addBehavior:springBehavior];
    
    if (point.damping > 0.0)
    {
        PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
        frictionBehavior.friction = point.damping;
        if (springBehavior.influence) frictionBehavior.influence = springBehavior.influence;
        [self.animator addBehavior:frictionBehavior];
    }
}

- (void)addConstantGravityBehavior:(InteractablePoint*)point
{
    CGPoint anchor = self.origin;
    if (point.x != CGFLOAT_MAX) anchor.x = self.origin.x + point.x;
    if (point.y != CGFLOAT_MAX) anchor.y = self.origin.y + point.y;
    
    PhysicsGravityWellBehavior *gravityBehavior = [[PhysicsGravityWellBehavior alloc] initWithTarget:self anchorPoint:anchor];
    gravityBehavior.strength = point.strength;
    gravityBehavior.falloff = point.falloff;
    gravityBehavior.influence = [self influenceAreaFromPoint:point];
    [self.animator addBehavior:gravityBehavior];
    
    if (point.damping > 0.0)
    {
        PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
        frictionBehavior.friction = point.damping;
        if (gravityBehavior.influence) frictionBehavior.influence = gravityBehavior.influence;
        else frictionBehavior.influence = [self influenceAreaWithRadius:1.2 * point.falloff fromAnchor:anchor];
        [self.animator addBehavior:frictionBehavior];
    }
}

- (PhysicsArea*)influenceAreaFromPoint:(InteractablePoint*)point
{
    if (!point.limitX && !point.limitY) return nil;
    CGPoint minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
    CGPoint maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
    if (point.limitX && point.limitX.min != -CGFLOAT_MAX) minPoint.x = self.origin.x + point.limitX.min;
    if (point.limitX && point.limitX.max != CGFLOAT_MAX) maxPoint.x = self.origin.x + point.limitX.max;
    if (point.limitY && point.limitY.min != -CGFLOAT_MAX) minPoint.y = self.origin.y + point.limitY.min;
    if (point.limitY && point.limitY.max != CGFLOAT_MAX) maxPoint.y = self.origin.y + point.limitY.max;
    return [[PhysicsArea alloc] initWithMinPoint:minPoint maxPoint:maxPoint];
}

- (PhysicsArea*)influenceAreaWithRadius:(CGFloat)radius fromAnchor:(CGPoint)anchor
{
    if (radius <= 0.0) return nil;
    CGPoint minPoint = CGPointMake(anchor.x - radius, anchor.y - radius);
    CGPoint maxPoint = CGPointMake(anchor.y + radius, anchor.y + radius);
    return [[PhysicsArea alloc] initWithMinPoint:minPoint maxPoint:maxPoint];
}

@end
