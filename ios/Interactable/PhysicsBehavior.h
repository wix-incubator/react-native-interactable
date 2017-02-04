//
//  PhysicsBehavior.h
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "PhysicsObject.h"

@interface PhysicsBehavior : NSObject

@property (nonatomic) UIView *target;

- (id) initWithTarget:(UIView*)target;
- (void) executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object;

@end
