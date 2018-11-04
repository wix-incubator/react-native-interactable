//
//  InteractableView.h
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <React/RCTBridge.h>
#import "InteractablePoint.h"
#import "InteractableArea.h"
#import "InteractableSpring.h"
#import "PhysicsAnimator.h"

@interface InteractableView : UIView <PhysicsAnimatorDelegate, UIGestureRecognizerDelegate>

@property (nonatomic, assign) BOOL verticalOnly;
@property (nonatomic, assign) BOOL horizontalOnly;
@property (nonatomic, assign) BOOL dragEnabled;
@property (nonatomic, strong) RCTBridge *bridge;
@property (nonatomic, copy) NSArray<InteractablePoint *> *snapPoints;
@property (nonatomic, copy) NSArray<InteractablePoint *> *springPoints;
@property (nonatomic, copy) NSArray<InteractablePoint *> *gravityPoints;
@property (nonatomic, copy) NSArray<InteractablePoint *> *frictionAreas;
@property (nonatomic, copy) NSArray<InteractablePoint *> *alertAreas;
@property (nonatomic, copy) InteractableArea *boundaries;
@property (nonatomic, copy) InteractableSpring *dragWithSpring;
@property (nonatomic, assign) CGFloat dragToss;
@property (nonatomic, copy) RCTDirectEventBlock onSnap;
@property (nonatomic, copy) RCTDirectEventBlock onSnapStart;
@property (nonatomic, copy) RCTDirectEventBlock onStop;
@property (nonatomic, copy) RCTDirectEventBlock onAlert;
@property (nonatomic, copy) RCTDirectEventBlock onDrag;
@property (nonatomic, assign) CGPoint initialPosition;
@property (nonatomic, copy) RCTDirectEventBlock onAnimatedEvent;
@property (nonatomic, assign) BOOL reportOnAnimatedEvents;

- (instancetype)initWithBridge:(RCTBridge*)bridge;
- (void)setVelocity:(NSDictionary*)params;
- (void)snapTo:(NSDictionary*)params;
- (void)changePosition:(NSDictionary*)params;
- (void)bringToFront:(NSDictionary*)params;

@end
