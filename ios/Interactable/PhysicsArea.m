//
//  PhysicsArea.m
//  Interactable
//
//  Created by Tal Kol on 2/11/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsArea.h"

@implementation PhysicsArea

- (instancetype)init
{
    if ((self = [super init]))
    {
        self.minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
        self.maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
    }
    return self;
}

- (instancetype)initWithMinPoint:(CGPoint)minPoint maxPoint:(CGPoint)maxPoint
{
    if ((self = [super init]))
    {
        self.minPoint = minPoint;
        self.maxPoint = maxPoint;
    }
    return self;
}

- (id)copyWithZone:(__unused NSZone *)zone
{
    return self;
}

@end
