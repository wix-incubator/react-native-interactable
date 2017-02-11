//
//  PhysicsAnchorBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/9/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsAnchorBehavior.h"

@implementation PhysicsAnchorBehavior

- (instancetype)initWithTarget:(UIView*)target anchorPoint:(CGPoint)anchorPoint
{
    if ((self = [super initWithTarget:target anchorPoint:anchorPoint]))
    {
        self.priority = 3;
    }
    return self;
}

- (void)executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object
{
    if (deltaTime == 0.0) return;
    
    CGFloat dx = self.anchorPoint.x - self.target.center.x;
    CGFloat vx = dx / deltaTime;
    
    CGFloat dy = self.anchorPoint.y - self.target.center.y;
    CGFloat vy = dy / deltaTime;
    
    object.velocity = CGPointMake(vx, vy);
}

@end
