//
//  PhysicsBehavior.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsBehavior.h"

@implementation PhysicsBehavior

- (void)setup:(UIView*)target
{
    self.target = target;
    self.temp = NO;
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
    if (self.influence)
    {
        if (self.target.center.x < self.influence.minPoint.x) return NO;
        if (self.target.center.x > self.influence.maxPoint.x) return NO;
        
        if (self.target.center.y < self.influence.minPoint.y) return NO;
        if (self.target.center.y > self.influence.maxPoint.y) return NO;
    }
    
    return YES;
}

@end
