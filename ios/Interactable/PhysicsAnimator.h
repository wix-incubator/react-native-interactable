//
//  PhysicsAnimator.h
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "PhysicsSpringBehavior.h"
#import "PhysicsBounceBehavior.h"
#import "PhysicsFrictionBehavior.h"
#import "PhysicsAnchorBehavior.h"
#import "PhysicsGravityWellBehavior.h"

@protocol PhysicsAnimatorDelegate;

@interface PhysicsAnimator : NSObject

@property (nonatomic, assign) id<PhysicsAnimatorDelegate> delegate;

- (void)addBehavior:(PhysicsBehavior*)behavior;
- (void)addTempBehavior:(PhysicsBehavior*)behavior;
- (void)removeAllBehaviors;
- (void)removeTempBehaviors;
- (void)ensureRunning;
- (void)stopRunning;
- (void)setTarget:(UIView*)target mass:(CGFloat)mass;
- (void)setTarget:(UIView*)target velocity:(CGPoint)velocity;
- (CGPoint)getTargetVelocity:(UIView*)target;

@end

@protocol PhysicsAnimatorDelegate <NSObject>

- (void)physicsAnimatorDidPause:(PhysicsAnimator *)animator;

@end
