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

@implementation RCTConvert(Interactable)

+ (InteractablePoint *)InteractablePoint:(id)json
{
    json = [self NSDictionary:json];
    InteractablePoint *point = [InteractablePoint new];
    point.x = [self CGFloat:json[@"x"] ?: @(CGFLOAT_MAX)];
    point.y = [self CGFloat:json[@"y"] ?: @(CGFLOAT_MAX)];
    point.damping = [self CGFloat:json[@"damping"] ?: @(0.7)];
    point.strength = [self CGFloat:json[@"strength"] ?: @(300.0)];
    point.id = [self NSString:json[@"id"] ?: nil];
    return point;
}

+ (InteractableLimit *)InteractableLimit:(id)json
{
    json = [self NSDictionary:json];
    InteractableLimit *limit = [InteractableLimit new];
    limit.min = [self CGFloat:json[@"min"] ?: @(-CGFLOAT_MAX)];
    limit.max = [self CGFloat:json[@"max"] ?: @(CGFLOAT_MAX)];
    return limit;
}

RCT_ARRAY_CONVERTER(InteractablePoint)

@end
