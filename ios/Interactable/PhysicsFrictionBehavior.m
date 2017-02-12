//
//  PhysicsFrictionBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/9/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsFrictionBehavior.h"

@implementation PhysicsFrictionBehavior

- (instancetype)initWithTarget:(UIView*)target
{
    if ((self = [super initWithTarget:target]))
    {
        self.priority = 2;
        self.friction = 0.7;
    }
    return self;
}

- (void)executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    if (![self isWithinInfluence]) return;
    
    CGFloat vx = pow(self.friction, 60.0 * deltaTime) * object.velocity.x;
    CGFloat vy = pow(self.friction, 60.0 * deltaTime) * object.velocity.y;
    
    object.velocity = CGPointMake(vx, vy);
}

@end
