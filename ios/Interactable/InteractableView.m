//
//  InteractableView.m
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "InteractableView.h"
#import <React/UIView+React.h>

@interface InteractableView()
@property (nonatomic, assign) CGPoint origin;
@property (nonatomic, assign) CGPoint initialPanCenter;
@end

@implementation InteractableView

- (instancetype)init
{
    if ((self = [super init]))
    {
        UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handlePan:)];
        [pan setMinimumNumberOfTouches:1];
        [pan setMaximumNumberOfTouches:1];
        [self addGestureRecognizer:pan];
    }
    return self;
}

- (void)reactSetFrame:(CGRect)frame
{
    [super reactSetFrame:frame];
    self.origin = self.center;
}

- (void)handlePan:(UIPanGestureRecognizer *)pan
{
    if (pan.state == UIGestureRecognizerStateBegan)
    {
        self.initialPanCenter = self.center;
    }
    
    CGPoint translation = [pan translationInView:self];
    if (self.horizontalOnly)
    {
        self.center = CGPointMake(self.initialPanCenter.x + translation.x, self.initialPanCenter.y);
    } else if (self.verticalOnly)
    {
        self.center = CGPointMake(self.initialPanCenter.x, self.initialPanCenter.y + translation.y);
    } else
    {
        self.center = CGPointMake(self.initialPanCenter.x + translation.x, self.initialPanCenter.y + translation.y);
    }
    
    if (pan.state == UIGestureRecognizerStateEnded)
    {
        InteractablePoint *snapPoint = [self findClosestPoint:self.snapTo toPoint:self.center];
        if (snapPoint)
        {
            [UIView animateWithDuration:0.8 delay:0 usingSpringWithDamping:0.7 initialSpringVelocity:0 options:nil animations:^
            {
                self.center = [snapPoint positionWithOrigin:self.origin];
            } completion:^(BOOL finished)
            {
            }];
        }
    }
}

- (InteractablePoint*)findClosestPoint:(NSArray<InteractablePoint *>*)points toPoint:(CGPoint)relativeToPoint
{
    InteractablePoint *res = nil;
    CGFloat minDistance = CGFLOAT_MAX;
    for (InteractablePoint *point in points)
    {
        CGFloat distance = [point distanceFromPoint:relativeToPoint withOrigin:self.origin];
        if (distance < minDistance)
        {
            minDistance = distance;
            res = point;
        }
    }
    return res;
}


@end
