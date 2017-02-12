//
//  InteractableView.h
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import "InteractablePoint.h"
#import "InteractableLimit.h"
#import "InteractableDrag.h"
#import "PhysicsAnimator.h"

@interface InteractableView : UIView <PhysicsAnimatorDelegate>

@property (nonatomic, assign) BOOL verticalOnly;
@property (nonatomic, assign) BOOL horizontalOnly;
@property (nonatomic, copy) NSArray<InteractablePoint *> *snapTo;
@property (nonatomic, copy) NSArray<InteractablePoint *> *springs;
@property (nonatomic, copy) NSArray<InteractablePoint *> *gravity;
@property (nonatomic, copy) NSArray<InteractablePoint *> *friction;
@property (nonatomic, copy) InteractableLimit *limitX;
@property (nonatomic, copy) InteractableLimit *limitY;
@property (nonatomic, copy) InteractableDrag *drag;
@property (nonatomic, copy) RCTBubblingEventBlock onSnap;
@property (nonatomic, assign) CGPoint initialPosition;
@property (nonatomic, copy) RCTDirectEventBlock onAnimatedEvent;

@end
