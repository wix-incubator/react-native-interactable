//
//  PhysicsAttractionBehavior.h
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PhysicsBehavior.h"

@interface PhysicsAttractionBehavior : PhysicsBehavior

@property (nonatomic, assign) CGPoint anchorPoint;
@property (nonatomic, assign) CGFloat strength;
@property (nonatomic, assign) CGFloat damping;

- (id) initWithTarget:(UIView*)target attractToPoint:(CGPoint)point;

@end
