//
//  InteractableView.h
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "InteractablePoint.h"

@interface InteractableView : UIView <UIDynamicAnimatorDelegate>

@property (nonatomic, assign) BOOL verticalOnly;
@property (nonatomic, assign) BOOL horizontalOnly;
@property (nonatomic, copy) NSArray<InteractablePoint *> *snapTo;
@property (nonatomic, assign) BOOL allowRotation;

@end
