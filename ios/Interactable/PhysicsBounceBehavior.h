//
//  PhysicsBounceBehavior.h
//  Interactable
//
//  Created by Tal Kol on 2/8/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PhysicsBehavior.h"

@interface PhysicsBounceBehavior : PhysicsBehavior

@property (nonatomic, assign) CGPoint minPoint;
@property (nonatomic, assign) CGPoint maxPoint;
@property (nonatomic, assign) CGFloat bounce;

- (instancetype)initWithTarget:(UIView*)target minPoint:(CGPoint)minPoint maxPoint:(CGPoint)maxPoint;

@end
