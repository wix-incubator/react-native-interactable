//
//  InteractableView.m
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "InteractableView.h"

@interface InteractableView()
@property (nonatomic, assign) CGPoint initialCenter;
@end

@implementation InteractableView

- (instancetype)init
{
    if ((self = [super init])) {
        UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handlePan:)];
        [pan setMinimumNumberOfTouches:1];
        [pan setMaximumNumberOfTouches:1];
        [self addGestureRecognizer:pan];
    }
    return self;
}

- (void)handlePan:(UIPanGestureRecognizer *)pan {
    if (pan.state == UIGestureRecognizerStateBegan) {
        self.initialCenter = self.center;
    }
    
    CGPoint translation = [pan translationInView:self];
    if (self.horizontalOnly) {
        self.center = CGPointMake(self.initialCenter.x + translation.x, self.initialCenter.y);
    } else if (self.verticalOnly) {
        self.center = CGPointMake(self.initialCenter.x, self.initialCenter.y + translation.y);
    } else {
        self.center = CGPointMake(self.initialCenter.x + translation.x, self.initialCenter.y + translation.y);
    }
    
    if (pan.state == UIGestureRecognizerStateEnded) {
        // self.center = self.initialCenter;
    }
}


@end
