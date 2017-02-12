//
//  PhysicsBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsBehavior.h"

const CFTimeInterval DURATION_BETWEEN_HAPTICS = 0.5;

@interface PhysicsBehavior()
@property (nonatomic) UIImpactFeedbackGenerator *hapticsEngine;
@property (nonatomic, assign) CFTimeInterval lastHapticsAction;
@property (nonatomic, assign) BOOL lastIsWithinInfluence;
@property (nonatomic, assign) BOOL lastIsWithinInfluenceInitialized;
@end


@implementation PhysicsBehavior

- (void)setup:(UIView*)target
{
    self.target = target;
    self.temp = NO;
    self.haptics = NO;
    self.hapticsEngine = nil;
    self.lastHapticsAction = 0.0;
    self.lastIsWithinInfluence = NO;
    self.lastIsWithinInfluenceInitialized = NO;
    self.priority = 1;
}

- (instancetype)initWithTarget:(UIView*)target
{
    if ((self = [super init]))
    {
        [self setup:target];
    }
    return self;
}

- (instancetype)initWithTarget:(UIView*)target anchorPoint:(CGPoint)anchorPoint
{
    if ((self = [super init]))
    {
        [self setup:target];
        self.anchorPoint = anchorPoint;
    }
    return self;
}

- (void)dealloc
{
    self.hapticsEngine = nil;
}

- (void)setHaptics:(BOOL)haptics
{
    if (haptics)
    {
        Class kUIImpactFeedbackGenerator = NSClassFromString(@"UIImpactFeedbackGenerator");
        if (kUIImpactFeedbackGenerator) self.hapticsEngine = [[kUIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleLight];
    }
    _haptics = haptics;
}

- (NSUInteger)findSortIndexInArray:(NSArray*)array
{
    return [array indexOfObject:self
                  inSortedRange:(NSRange){0, [array count]}
                        options:NSBinarySearchingInsertionIndex
                usingComparator:^NSComparisonResult(id obja, id objb)
                {
                    PhysicsBehavior *a = (PhysicsBehavior*)obja;
                    PhysicsBehavior *b = (PhysicsBehavior*)objb;
                    if (a.priority == b.priority) return (NSComparisonResult)NSOrderedSame;
                    if (a.priority > b.priority) return (NSComparisonResult)NSOrderedDescending;
                    else return (NSComparisonResult)NSOrderedAscending;
                }];
}

- (BOOL)isWithinInfluence
{
    BOOL res = YES;
    
    if (self.influence)
    {
        if (self.target.center.x < self.influence.minPoint.x) res = NO;
        if (self.target.center.x > self.influence.maxPoint.x) res = NO;
        
        if (self.target.center.y < self.influence.minPoint.y) res = NO;
        if (self.target.center.y > self.influence.maxPoint.y) res = NO;
        
        // haptics
        if (self.lastIsWithinInfluenceInitialized)
        {
            if (self.lastIsWithinInfluence != res) [self doHaptics];
        }
        else
        {
            self.lastIsWithinInfluenceInitialized = YES;
        }
        self.lastIsWithinInfluence = res;
    }
    
    return res;
}

- (void)doHaptics
{
    if (!self.hapticsEngine) return;
    CFTimeInterval now = CFAbsoluteTimeGetCurrent();
    if (self.lastHapticsAction == 0.0 || (now - self.lastHapticsAction > DURATION_BETWEEN_HAPTICS))
    {
        [self.hapticsEngine impactOccurred];
    }
    self.lastHapticsAction = now;
}

@end
