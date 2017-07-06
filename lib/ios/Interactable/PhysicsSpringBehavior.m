//
//  PhysicsSnapBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsSpringBehavior.h"

@implementation PhysicsSpringBehavior

- (instancetype)initWithTarget:(UIView*)target anchorPoint:(CGPoint)anchorPoint
{
    if ((self = [super initWithTarget:target anchorPoint:anchorPoint]))
    {
        self.tension = 300.0;
    }
    return self;
}

- (void)executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    if (![self isWithinInfluence]) return;
    
    CGFloat dx = self.target.center.x - self.anchorPoint.x;
    CGFloat ax = (-self.tension * dx) / object.mass;
    CGFloat vx = object.velocity.x + deltaTime * ax;
    
    CGFloat dy = self.target.center.y - self.anchorPoint.y;
    CGFloat ay = (-self.tension * dy) / object.mass;
    CGFloat vy = object.velocity.y + deltaTime * ay;
    
    object.velocity = CGPointMake(vx, vy);
}

@end
