//
//  PhysicsBounceBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/8/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsBounceBehavior.h"

@implementation PhysicsBounceBehavior

- (instancetype)initWithTarget:(UIView*)target minPoint:(CGPoint)minPoint maxPoint:(CGPoint)maxPoint
{
    if ((self = [super initWithTarget:target]))
    {
        self.minPoint = minPoint;
        self.maxPoint = maxPoint;
        self.bounce = 0.5;
    }
    return self;
}

- (void)executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    if (self.minPoint.x == self.target.center.x && object.velocity.x < 0.0)
    {
        CGFloat vx = -object.velocity.x * self.bounce;
        CGFloat vy = object.velocity.y;
        object.velocity = CGPointMake(vx, vy);
        [self doHaptics];
    }
    if (self.minPoint.y == self.target.center.y && object.velocity.y < 0.0)
    {
        CGFloat vx = object.velocity.x;
        CGFloat vy = -object.velocity.y * self.bounce;
        object.velocity = CGPointMake(vx, vy);
        [self doHaptics];
    }
    if (self.maxPoint.x == self.target.center.x && object.velocity.x > 0.0)
    {
        CGFloat vx = -object.velocity.x * self.bounce;
        CGFloat vy = object.velocity.y;
        object.velocity = CGPointMake(vx, vy);
        [self doHaptics];
    }
    if (self.maxPoint.y == self.target.center.y && object.velocity.y > 0.0)
    {
        CGFloat vx = object.velocity.x;
        CGFloat vy = -object.velocity.y * self.bounce;
        object.velocity = CGPointMake(vx, vy);
        [self doHaptics];
    }
}


@end
