//
//  RCTConvert+Interactable.m
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "RCTConvert+Interactable.h"
#import "InteractablePoint.h"
#import "InteractableLimit.h"
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
    point.id = [self NSString:json[@"id"] ?: nil];
    point.limitX = [self InteractableLimit:json[@"limitX"] ?: nil];
    point.limitY = [self InteractableLimit:json[@"limitY"] ?: nil];
    point.haptics = [self BOOL:json[@"haptics"] ?: @(NO)];
    return point;
}

+ (InteractableLimit *)InteractableLimit:(id)json
{
    json = [self NSDictionary:json];
    if (json == nil) return nil;
    InteractableLimit *limit = [InteractableLimit new];
    limit.min = [self CGFloat:json[@"min"] ?: @(-CGFLOAT_MAX)];
    limit.max = [self CGFloat:json[@"max"] ?: @(CGFLOAT_MAX)];
    limit.bounce = [self CGFloat:json[@"bounce"] ?: @(0.0)];
    limit.haptics = [self BOOL:json[@"haptics"] ?: @(NO)];
    return limit;
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
