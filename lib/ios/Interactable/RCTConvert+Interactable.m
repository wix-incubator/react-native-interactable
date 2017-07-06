//
//  RCTConvert+Interactable.m
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "RCTConvert+Interactable.h"
#import "InteractablePoint.h"
#import "InteractableArea.h"
#import "InteractableSpring.h"

@implementation RCTConvert(Interactable)

+ (InteractablePoint *)InteractablePoint:(id)json
{
    json = [self NSDictionary:json];
    InteractablePoint *point = [InteractablePoint new];
    point.x = [self CGFloat:json[@"x"] ?: @(CGFLOAT_MAX)];
    point.y = [self CGFloat:json[@"y"] ?: @(CGFLOAT_MAX)];
    point.damping = [self CGFloat:json[@"damping"] ?: @(0.0)];
    point.tension = [self CGFloat:json[@"tension"] ?: @(300.0)];
    point.strength = [self CGFloat:json[@"strength"] ?: @(400.0)];
    point.falloff = [self CGFloat:json[@"falloff"] ?: @(40.0)];
    point.id = [self id:json[@"id"] ?: [NSNull null]];
    point.influenceArea = [self InteractableArea:json[@"influenceArea"] ?: nil];
    point.haptics = [self BOOL:json[@"haptics"] ?: @(NO)];
    return point;
}

+ (InteractableArea *)InteractableArea:(id)json
{
    json = [self NSDictionary:json];
    if (json == nil) return nil;
    InteractableArea *area = [InteractableArea new];
    area.top = [self CGFloat:json[@"top"] ?: @(-CGFLOAT_MAX)];
    area.left = [self CGFloat:json[@"left"] ?: @(-CGFLOAT_MAX)];
    area.bottom = [self CGFloat:json[@"bottom"] ?: @(CGFLOAT_MAX)];
    area.right = [self CGFloat:json[@"right"] ?: @(CGFLOAT_MAX)];
    area.bounce = [self CGFloat:json[@"bounce"] ?: @(0.0)];
    area.haptics = [self BOOL:json[@"haptics"] ?: @(NO)];
    return area;
}

+ (InteractableSpring *)InteractableSpring:(id)json
{
    json = [self NSDictionary:json];
    if (json == nil) return nil;
    InteractableSpring *spring = [InteractableSpring new];
    spring.tension = [self CGFloat:json[@"tension"] ?: @(CGFLOAT_MAX)];
    spring.damping = [self CGFloat:json[@"damping"] ?: @(0.0)];
    return spring;
}

RCT_ARRAY_CONVERTER(InteractablePoint)

@end
