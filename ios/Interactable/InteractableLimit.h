//
//  InteractableLimit.h
//  Interactable
//
//  Created by Tal Kol on 2/6/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface InteractableLimit : NSObject<NSCopying>

@property (nonatomic, assign) CGFloat min;
@property (nonatomic, assign) CGFloat max;
@property (nonatomic, assign) CGFloat bounce;
@property (nonatomic, assign) BOOL haptics;

@end
