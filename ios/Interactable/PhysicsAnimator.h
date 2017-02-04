//
//  PhysicsAnimator.h
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "PhysicsSnapBehavior.h"

@protocol PhysicsAnimatorDelegate;

@interface PhysicsAnimator : NSObject

@property (nonatomic, assign) id<PhysicsAnimatorDelegate> delegate;

- (id) initWithReferenceView:(UIView*)referenceView;
- (void) addBehavior:(PhysicsBehavior*)behavior;
- (void) removeAllBehaviors;
- (void) setTarget:(UIView*)target mass:(CGFloat)mass;
- (void) setTarget:(UIView*)target velocity:(CGPoint)velocity;

@end

@protocol PhysicsAnimatorDelegate <NSObject>

- (void)physicsAnimatorDidPause:(PhysicsAnimator *)animator;

@end
