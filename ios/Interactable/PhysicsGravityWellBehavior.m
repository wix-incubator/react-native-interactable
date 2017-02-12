//
//  PhysicsGravityWellBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsGravityWellBehavior.h"

@implementation PhysicsGravityWellBehavior

- (instancetype)initWithTarget:(UIView*)target anchorPoint:(CGPoint)anchorPoint
{
    if ((self = [super initWithTarget:target anchorPoint:anchorPoint]))
    {
        self.strength = 400.0;
        self.falloff = 40.0;
    }
    return self;
}

// regular gravitational force is proportional to 1/r^2 which is instable when r -> 0
// instead, we're using a potential that looks like an inverted gaussian which behaves much better
// its deriviative (the force) looks like this:
// https://www.wolframalpha.com/input/?i=max+-5%2F(7)*sqrt(e)x*e%5E(-1%2F2%2F7%5E2*x%5E2)

- (void)executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    if (![self isWithinInfluence]) return;
    
    CGFloat dx = self.target.center.x - self.anchorPoint.x;
    CGFloat dy = self.target.center.y - self.anchorPoint.y;
    CGFloat dr = sqrt(dx*dx + dy*dy);
    if (dr == 0.0) return;
        
    CGFloat a = (-self.strength * dr * exp(-0.5 * dr * dr / self.falloff / self.falloff)) / object.mass;
    
    CGFloat ax = dx / dr * a;
    CGFloat vx = object.velocity.x + deltaTime * ax;
    
    
    CGFloat ay = dy / dr * a;
    CGFloat vy = object.velocity.y + deltaTime * ay;
    
    object.velocity = CGPointMake(vx, vy);
}

@end
