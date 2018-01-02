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
#import "PhysicsArea.h"

@interface PhysicsBehavior : NSObject

@property (nonatomic) UIView *target;
@property (nonatomic, assign) int priority; // priority 1 is handled first, 2 handled 2nd
@property (nonatomic, assign) BOOL temp;
@property (nonatomic, assign) CGPoint anchorPoint;
@property (nonatomic, copy) PhysicsArea *influence;
@property (nonatomic, assign) BOOL haptics;

- (instancetype)initWithTarget:(UIView*)target;
- (instancetype)initWithTarget:(UIView*)target anchorPoint:(CGPoint)anchorPoint;
- (void)executeFrameWithDeltaTime:(CFTimeInterval)deltaTime onObject:(PhysicsObject*)object;
- (NSUInteger)findSortIndexInArray:(NSArray*)array;
- (BOOL)isWithinInfluence;
- (void)doHaptics;

@end
