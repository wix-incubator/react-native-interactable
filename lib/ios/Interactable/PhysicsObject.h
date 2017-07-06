//
//  PhysicsTarget.h
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface PhysicsObject : NSObject

@property (nonatomic, assign) CGPoint velocity;
@property (nonatomic, assign) CGFloat mass;

@end
