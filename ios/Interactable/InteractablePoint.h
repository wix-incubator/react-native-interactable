//
//  InteractablePoint.h
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface InteractablePoint : NSObject

@property (nonatomic, assign) CGFloat x;
@property (nonatomic, assign) CGFloat y;
@property (nonatomic, assign) CGFloat damping;

- (CGPoint)positionWithOrigin:(CGPoint)origin;
- (CGFloat)distanceFromPoint:(CGPoint)point withOrigin:(CGPoint)origin;

@end
