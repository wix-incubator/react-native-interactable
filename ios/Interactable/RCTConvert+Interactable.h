//
//  RCTConvert+Interactable.h
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTConvert.h>

@class InteractablePoint;

@interface RCTConvert (Interactable)

+ (NSArray<InteractablePoint *> *)InteractablePointArray:(id)json;

@end
