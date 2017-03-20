//
//  InteractableViewManager.m
//  InteractableViewManager
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "InteractableViewManager.h"
#import "InteractableView.h"
#import "InteractablePoint.h"
#import "InteractableArea.h"
#import "InteractableSpring.h"
#import "RCTConvert+Interactable.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation InteractableViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[InteractableView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(verticalOnly, BOOL)
RCT_EXPORT_VIEW_PROPERTY(horizontalOnly, BOOL)
RCT_EXPORT_VIEW_PROPERTY(snapPoints, NSArray<InteractablePoint *>)
RCT_EXPORT_VIEW_PROPERTY(springPoints, NSArray<InteractablePoint *>)
RCT_EXPORT_VIEW_PROPERTY(gravityPoints, NSArray<InteractablePoint *>)
RCT_EXPORT_VIEW_PROPERTY(frictionAreas, NSArray<InteractablePoint *>)
RCT_EXPORT_VIEW_PROPERTY(alertAreas, NSArray<InteractablePoint *>)
RCT_EXPORT_VIEW_PROPERTY(boundaries, InteractableArea)
RCT_EXPORT_VIEW_PROPERTY(dragWithSpring, InteractableSpring)
RCT_EXPORT_VIEW_PROPERTY(dragToss, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(onSnap, RCTDirectEventBlock    )
RCT_EXPORT_VIEW_PROPERTY(onStop, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAlert, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(initialPosition, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(onAnimatedEvent, RCTDirectEventBlock)

RCT_EXPORT_METHOD(setVelocity:(nonnull NSNumber *)reactTag
                  params:(NSDictionary*)params)
{
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry)
    {
         UIView *view = viewRegistry[reactTag];
         if ([view isKindOfClass:[InteractableView class]])
         {
             [(InteractableView*)view setVelocity:params];
         }
         else
         {
             RCTLogError(@"tried to setVelocity: on non-InteractableView view %@ "
                         "with tag #%@", view, reactTag);
         }
     }];
}


@end
