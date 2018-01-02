//
//  PhysicsObject.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsObject.h"

@implementation PhysicsObject

- (instancetype)init
{
    if ((self = [super init]))
    {
        self.velocity = CGPointZero;
        self.mass = 1.0;
    }
    return self;
}

@end
