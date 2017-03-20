//
//  InteractableArea.h
//  Interactable
//
//  Created by Tal Kol on 2/6/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface InteractableArea : NSObject<NSCopying>

@property (nonatomic, assign) CGFloat top;
@property (nonatomic, assign) CGFloat left;
@property (nonatomic, assign) CGFloat bottom;
@property (nonatomic, assign) CGFloat right;
@property (nonatomic, assign) CGFloat bounce;
@property (nonatomic, assign) BOOL haptics;

- (BOOL)pointInside:(CGPoint)point withOrigin:(CGPoint)origin;

@end
