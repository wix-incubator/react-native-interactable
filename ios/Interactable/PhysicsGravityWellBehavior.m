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
