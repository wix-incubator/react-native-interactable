//
//  PhysicsBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsBehavior.h"

@implementation PhysicsBehavior

- (instancetype) initWithTarget:(UIView*)target
{
    if ((self = [super init]))
    {
        self.target = target;
    }
    return self;
}

@end
