//
//  PhysicsArea.h
//  Interactable
//
//  Created by Tal Kol on 2/11/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface PhysicsArea : NSObject<NSCopying>

@property (nonatomic, assign) CGPoint minPoint;
@property (nonatomic, assign) CGPoint maxPoint;

- (instancetype)initWithMinPoint:(CGPoint)minPoint maxPoint:(CGPoint)maxPoint;

@end
