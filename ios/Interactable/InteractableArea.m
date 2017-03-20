//
//  InteractableArea.m
//  Interactable
//
//  Created by Tal Kol on 2/6/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "InteractableArea.h"

@implementation InteractableArea

- (id)copyWithZone:(__unused NSZone *)zone
{
    return self;
}

- (BOOL)pointInside:(CGPoint)point withOrigin:(CGPoint)origin
{
    CGFloat cx = point.x - origin.x;
    CGFloat cy = point.y - origin.y;
    
    if (cx < self.left) return NO;
    if (cx > self.right) return NO;
    
    if (cy < self.top) return NO;
    if (cy > self.bottom) return NO;
    
    return YES;
}

@end
