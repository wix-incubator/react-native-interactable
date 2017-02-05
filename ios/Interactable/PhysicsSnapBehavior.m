//
//  PhysicsSnapBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsSnapBehavior.h"

@implementation PhysicsSnapBehavior

- (instancetype) initWithTarget:(UIView*)target snapToPoint:(CGPoint)point
{
    if ((self = [super initWithTarget:target]))
    {
        self.anchorPoint = point;
        self.tension = 300.0;
        self.damping = 0.7;
    }
    return self;
}

- (void) executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    [self applySpring:deltaTime onObject:object];
    [self applyDamping:deltaTime onObject:object];
}

- (void) applySpring:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    CGFloat dx = self.target.center.x - self.anchorPoint.x;
    CGFloat ax = (-self.tension * dx) / object.mass;
    CGFloat vx = object.velocity.x + deltaTime * ax;
    
    CGFloat dy = self.target.center.y - self.anchorPoint.y;
    CGFloat ay = (-self.tension * dy) / object.mass;
    CGFloat vy = object.velocity.y + deltaTime * ay;
    
    object.velocity = CGPointMake(vx, vy);
}

- (void) applyDamping:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    CGFloat vx = pow(self.damping, 60.0 * deltaTime) * object.velocity.x;
    CGFloat vy = pow(self.damping, 60.0 * deltaTime) * object.velocity.y;
    
    object.velocity = CGPointMake(vx, vy);
}

@end
