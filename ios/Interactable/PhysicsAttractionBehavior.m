//
//  PhysicsAttractionBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsAttractionBehavior.h"

@implementation PhysicsAttractionBehavior

- (instancetype) initWithTarget:(UIView*)target attractToPoint:(CGPoint)point
{
    if ((self = [super initWithTarget:target]))
    {
        self.anchorPoint = point;
        self.strength = 80.0;
        self.damping = 10.0;
    }
    return self;
}

- (void) executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    [self applyPull:deltaTime onObject:object];
    [self applyDamping:deltaTime onObject:object];
}

- (void) applyPull:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    CGFloat dx = self.anchorPoint.x - self.target.center.x;
    CGFloat ax = 0.0;
    if (dx != 0.0)
    {
        if (ABS(dx) < 1.0) dx = dx / ABS(dx);
        ax = (self.strength/dx) / object.mass;
    }
    CGFloat vx = object.velocity.x + deltaTime * ax;
    
    CGFloat dy = self.anchorPoint.y - self.target.center.y;
    CGFloat ay = 0.0;
    if (dy != 0.0)
    {
        if (ABS(dy) < 1.0) dy = dy / ABS(dy);
        ay = (self.strength/dy) / object.mass;
    }
    CGFloat vy = object.velocity.y + deltaTime * ay;
    
    object.velocity = CGPointMake(vx, vy);
}

- (void) applyDamping:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    CGFloat ax = (-self.damping * object.velocity.x) / object.mass;
    CGFloat vx = object.velocity.x + deltaTime * ax;
    
    CGFloat ay = (-self.damping * object.velocity.y) / object.mass;
    CGFloat vy = object.velocity.y + deltaTime * ay;
    
    object.velocity = CGPointMake(vx, vy);
}

@end
