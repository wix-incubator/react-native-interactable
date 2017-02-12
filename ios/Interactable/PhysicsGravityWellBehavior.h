//
//  PhysicsGravityWellBehavior.h
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PhysicsBehavior.h"

@interface PhysicsGravityWellBehavior : PhysicsBehavior

@property (nonatomic, assign) CGFloat strength;
@property (nonatomic, assign) CGFloat falloff;

@end
