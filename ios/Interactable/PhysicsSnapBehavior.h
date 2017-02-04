//
//  PhysicsSnapBehavior.h
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PhysicsBehavior.h"

@interface PhysicsSnapBehavior : PhysicsBehavior

@property (nonatomic, assign) CGPoint anchorPoint;
@property (nonatomic, assign) CGFloat tension;
@property (nonatomic, assign) CGFloat damping;

- (id) initWithTarget:(UIView*)target snapToPoint:(CGPoint)point;

@end
