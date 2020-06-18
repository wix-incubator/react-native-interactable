//
//  InteractableView.m
//  Interactable
//
//  Created by Tal Kol on 1/27/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "InteractableView.h"
#import <React/UIView+React.h>
#import <React/RCTRootView.h>
#import <React/RCTEventDispatcher.h>

@interface InteractableEvent : NSObject <RCTEvent>

- (instancetype)initWithEventName:(NSString *)eventName
                         reactTag:(NSNumber *)reactTag
                 interactableView:(InteractableView *)interactableView
                         userData:(NSDictionary *)userData
                    coalescingKey:(uint16_t)coalescingKey NS_DESIGNATED_INITIALIZER;

@end

@implementation InteractableEvent
{
    InteractableView *_interactableView;
    NSDictionary *_userData;
    uint16_t _coalescingKey;
}

@synthesize viewTag = _viewTag;
@synthesize eventName = _eventName;

- (instancetype)initWithEventName:(NSString *)eventName
                         reactTag:(NSNumber *)reactTag
                 interactableView:(InteractableView *)interactableView
                         userData:(NSDictionary *)userData
                    coalescingKey:(uint16_t)coalescingKey
{
    if ((self = [super init])) {
        _eventName = [eventName copy];
        _viewTag = reactTag;
        _interactableView = interactableView;
        _userData = userData;
        _coalescingKey = coalescingKey;
    }
    return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)init)

- (uint16_t)coalescingKey
{
    return _coalescingKey;
}

- (NSDictionary *)body
{
    return _userData;
}

- (BOOL)canCoalesce
{
    return YES;
}

- (InteractableEvent *)coalesceWithEvent:(InteractableEvent *)newEvent
{
    newEvent->_userData = _userData;
    
    return newEvent;
}

+ (NSString *)moduleDotMethod
{
    return @"RCTEventEmitter.receiveEvent";
}

- (NSArray *)arguments
{
    return @[self.viewTag, RCTNormalizeInputEventName(self.eventName), [self body]];
}

@end

@interface InteractableView()
@property (nonatomic, assign) BOOL originSet;
@property (nonatomic, assign) CGPoint origin;
@property (nonatomic) PhysicsAnimator *animator;
@property (nonatomic) PhysicsBehavior *dragBehavior;
@property (nonatomic, assign) CGPoint dragStartCenter;
@property (nonatomic, assign) CGPoint dragStartLocation;
@property (nonatomic, assign) BOOL initialPositionSet;
@property (nonatomic, assign) BOOL reactRelayoutHappening;
@property (nonatomic, assign) CGPoint reactRelayoutCenterDeltaFromOrigin;
@property (nonatomic) NSMutableSet *insideAlertAreas;
@property (nonatomic) UIPanGestureRecognizer *pan;

@property (nonatomic, assign) uint16_t coalescingKey;
@property (nonatomic, assign) NSString* lastEmittedEventName;

@end

@implementation InteractableView

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
    if ((self = [super init]))
    {
        self.originSet = NO;
        self.initialPositionSet = NO;
        self.reactRelayoutHappening = NO;
        self.insideAlertAreas = [NSMutableSet set];
        self.dragEnabled = YES;
        self.bridge = bridge;
        
        // pan gesture recognizer for touches
        self.pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handlePan:)];
        self.pan.delegate = self;
        [self addGestureRecognizer:self.pan];
    }
    return self;
}

- (void)reactSetFrame:(CGRect)frame
{
    // to handle the react relayout we need to remember the delta from previous origin
    self.reactRelayoutCenterDeltaFromOrigin = CGPointMake(self.origin.x - self.center.x, self.origin.y - self.center.y);
    
    self.origin = CGPointMake(CGRectGetMidX(frame), CGRectGetMidY(frame));
    self.originSet = YES;
    
    self.reactRelayoutHappening = YES;
    [super reactSetFrame:frame];
    self.reactRelayoutHappening = NO;
    
    // initial position
    if (!self.initialPositionSet)
    {
        self.initialPositionSet = YES;
        if (!CGPointEqualToPoint(self.initialPosition, CGPointZero))
        {
            self.center = CGPointMake(self.origin.x + self.initialPosition.x, self.origin.y + self.initialPosition.y);
        }
        
        // make sure this is after origin is set and happens once
        [self initializeAnimator];
    }
}

- (void)setCenter:(CGPoint)center
{
    if (self.initialPositionSet && self.reactRelayoutHappening)
    {
        // to handle a react relayout we maintain the same delta but now with the new origin
        center = CGPointMake(self.origin.x - self.reactRelayoutCenterDeltaFromOrigin.x, self.origin.y - self.reactRelayoutCenterDeltaFromOrigin.y);
    }
    
    if (self.originSet)
    {
        if (self.horizontalOnly) center.y = self.origin.y;
        if (self.verticalOnly) center.x = self.origin.x;
        
        if (self.boundaries)
        {
            if (center.x - self.origin.x < self.boundaries.left) center.x = self.boundaries.left + self.origin.x;
            if (center.x - self.origin.x > self.boundaries.right) center.x = self.boundaries.right + self.origin.x;
            if (center.y - self.origin.y < self.boundaries.top) center.y = self.boundaries.top + self.origin.y;
            if (center.y - self.origin.y > self.boundaries.bottom) center.y = self.boundaries.bottom + self.origin.y;
        }
    }
    
    [super setCenter:center];
    [self reportAnimatedEvent];
    [self reportAlertEvent];
}

- (void)setDragEnabled:(BOOL)dragEnabled
{
    _dragEnabled = dragEnabled;
    self.pan.enabled = dragEnabled;
}

- (void)initializeAnimator
{
    self.animator = [[PhysicsAnimator alloc] init];
    self.animator.delegate = self;
    
    // initialize constant behaviors
    if (self.springPoints)
    {
        for (InteractablePoint *point in self.springPoints) [self addConstantSpringBehavior:point];
    }
    if (self.gravityPoints)
    {
        for (InteractablePoint *point in self.gravityPoints) [self addConstantGravityBehavior:point];
    }
    if (self.frictionAreas)
    {
        for (InteractablePoint *point in self.frictionAreas) [self addConstantFrictionBehavior:point];
    }
}


// MARK: - PhysicsAnimatorDelegate

- (void)physicsAnimatorDidPause:(PhysicsAnimator *)animator
{
    if (self.onSnap && self.pan.state == UIGestureRecognizerStatePossible )
    {
        InteractablePoint *snapPoint = [InteractablePoint findClosestPoint:self.snapPoints toPoint:self.center withOrigin:self.origin];
        if (snapPoint)
        {
            self.onSnap(@
                        {
                            @"index": @([self.snapPoints indexOfObject:snapPoint]),
                            @"id": snapPoint.id
                        });
        }
    }
    
    if (self.onStop)
    {
        CGPoint deltaFromOrigin = [InteractablePoint deltaBetweenPoint:self.center andOrigin:self.origin];
        self.onStop(@
                    {
                        @"x": @(deltaFromOrigin.x),
                        @"y": @(deltaFromOrigin.y)
                    });
    }
}

// MARK: - Reports

- (void)reportAnimatedEvent
{
    if (self.reportOnAnimatedEvents && self.originSet)
    {
        CGPoint deltaFromOrigin = [InteractablePoint deltaBetweenPoint:self.center andOrigin:self.origin];
        
        if (![self.lastEmittedEventName isEqualToString:@"onAnimatedEvent"]) {
            self.coalescingKey++;
            self.lastEmittedEventName = @"onAnimatedEvent";
        }
        
        InteractableEvent *event = [[InteractableEvent alloc] initWithEventName:@"onAnimatedEvent"
                                                                       reactTag:self.reactTag
                                                               interactableView:self
                                                                       userData:@{ @"x": @(deltaFromOrigin.x),
                                                                                   @"y": @(deltaFromOrigin.y)}
                                                                  coalescingKey:self.coalescingKey];

        [[self.bridge eventDispatcher] sendEvent:event];
        
        // self.onAnimatedEvent(@
        //                      {
        //                          @"x": @(deltaFromOrigin.x),
        //                          @"y": @(deltaFromOrigin.y)
        //                      });
    }
}

- (void)reportAlertEvent
{
    if (self.onAlert && self.alertAreas && self.originSet)
    {
        NSMutableDictionary *alert = [NSMutableDictionary dictionary];
        for (InteractablePoint *area in self.alertAreas)
        {
            if (area.influenceArea && area.id)
            {
                if ([area.influenceArea pointInside:self.center withOrigin:self.origin])
                {
                    if (![self.insideAlertAreas containsObject:area.id])
                    {
                        [alert setObject:@"enter" forKey:area.id];
                        [self.insideAlertAreas addObject:area.id];
                    }
                }
                else
                {
                    if ([self.insideAlertAreas containsObject:area.id])
                    {
                        [alert setObject:@"leave" forKey:area.id];
                        [self.insideAlertAreas removeObject:area.id];
                    }
                }
            }
        }
        if ([alert count] > 0) self.onAlert(alert);
    }
}

- (void)reportDragEvent:(NSString*)state
{
    [self reportDragEvent:state targetSnapPointId:@""];
}

- (void)reportDragEvent:(NSString*)state targetSnapPointId:(NSString*)targetSnapPointId
{
    if (self.onDrag)
    {
        CGPoint deltaFromOrigin = [InteractablePoint deltaBetweenPoint:self.center andOrigin:self.origin];
        self.onDrag(@{
            @"state": state,
            @"x": @(deltaFromOrigin.x),
            @"y": @(deltaFromOrigin.y),
            @"targetSnapPointId":targetSnapPointId
        });
    }
}

// MARK: - Touches

- (void)handlePan:(UIPanGestureRecognizer *)pan
{
    if (pan.state == UIGestureRecognizerStateBegan)
    {
        [self cancelCurrentReactTouch];
        self.dragStartCenter = self.center;
        [self setTempBehaviorsForDragStart];
        [self reportDragEvent:@"start"];
    }
    
    CGPoint translation = [pan translationInView:self];
    self.dragBehavior.anchorPoint = CGPointMake(self.dragStartCenter.x + translation.x, self.dragStartCenter.y + translation.y);
    [self.animator ensureRunning];
    
    if (pan.state == UIGestureRecognizerStateEnded ||
        pan.state == UIGestureRecognizerStateFailed ||
        pan.state == UIGestureRecognizerStateCancelled)
    {
        InteractablePoint* point = [self setTempBehaviorsForDragEnd];
        NSString* targetSnapPointId = point && point.id != nil ? point.id : @"";
        if (targetSnapPointId == (id)[NSNull null] || targetSnapPointId.length == 0 ) {
            [self reportDragEvent:@"end"];
        } else {
            [self reportDragEvent:@"end" targetSnapPointId:targetSnapPointId];
        }
        
    }
}

- (BOOL)gestureRecognizerShouldBegin:(UIPanGestureRecognizer *)pan
{
    CGPoint translation = [pan translationInView:self];
    if (self.horizontalOnly) return fabs(translation.x) > fabs(translation.y);
    if (self.verticalOnly) return fabs(translation.y) > fabs(translation.x);
    return YES;
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)pan shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)other
{
    // return YES to allow a hosting scrollview to scroll while an interactable view is moving
    return NO;
}

- (void)cancelCurrentReactTouch
{
    RCTRootView *view = [self getRootView];
    if (view != nil)
    {
        [(RCTRootView*)view cancelTouches];
    }
}

- (RCTRootView*)getRootView
{
    UIView *view = self;
    while (view.superview != nil)
    {
        view = view.superview;
        if ([view isKindOfClass:[RCTRootView class]]) break;
    }
    
    if ([view isKindOfClass:[RCTRootView class]])
    {
        return view;
    }
    return nil;
}

/*
 - (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
 {
 UITouch *touch = [[event allTouches] anyObject];
 self.dragStartCenter = self.center;
 self.dragStartLocation = [touch locationInView:self.superview];
 
 [self setTempBehaviorsForDragStart];
 }
 
 - (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
 {
 UITouch *touch = [[event allTouches] anyObject];
 CGPoint location = [touch locationInView:self.superview];
 CGFloat newCenterX = self.dragStartCenter.x + location.x - self.dragStartLocation.x;
 CGFloat newCenterY = self.dragStartCenter.y + location.y - self.dragStartLocation.y;
 
 self.dragBehavior.anchorPoint = CGPointMake(newCenterX, newCenterY);
 [self.animator ensureRunning];
 }
 
 - (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
 {
 [self setTempBehaviorsForDragEnd];
 }
 
 - (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
 {
 [self setTempBehaviorsForDragEnd];
 }
 */

- (void)setTempBehaviorsForDragStart
{
    [self.animator removeTempBehaviors];
    self.dragBehavior = nil;
    
    self.dragBehavior = [self addTempDragBehavior:self.dragWithSpring];
}

- (InteractablePoint*)setTempBehaviorsForDragEnd
{
    [self.animator removeTempBehaviors];
    self.dragBehavior = nil;

    CGPoint velocity = [self.animator getTargetVelocity:self];
    if (self.horizontalOnly) velocity.y = 0;
    if (self.verticalOnly) velocity.x = 0;
    CGFloat toss = self.dragToss;
    CGPoint projectedCenter = CGPointMake(self.center.x + toss*velocity.x, self.center.y + toss*velocity.y);

    InteractablePoint *snapPoint = [InteractablePoint findClosestPoint:self.snapPoints toPoint:projectedCenter withOrigin:self.origin];

    if (snapPoint)
    {
        [self addTempSnapToPointBehavior:snapPoint];
        if (self.onSnapStart)
        {
            self.onSnapStart(@
                        {
                            @"index": @([self.snapPoints indexOfObject:snapPoint]),
                            @"id": snapPoint.id
                        });
        }
    }
    
    [self addTempBounceBehaviorWithBoundaries:self.boundaries];
    return snapPoint;
}

// MARK: - Behaviors

- (PhysicsBehavior*)addTempDragBehavior:(InteractableSpring*)spring
{
    PhysicsBehavior *res = nil;
    
    if (!spring || spring.tension == CGFLOAT_MAX)
    {
        PhysicsAnchorBehavior *anchorBehavior = [[PhysicsAnchorBehavior alloc] initWithTarget:self anchorPoint:self.center];
        res = anchorBehavior;
        [self.animator addTempBehavior:anchorBehavior];
    }
    else
    {
        PhysicsSpringBehavior *springBehavior = [[PhysicsSpringBehavior alloc] initWithTarget:self anchorPoint:self.center];
        springBehavior.tension = spring.tension;
        res = springBehavior;
        [self.animator addTempBehavior:springBehavior];
    }
    
    if (spring && spring.damping > 0.0)
    {
        PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
        frictionBehavior.friction = spring.damping;
        [self.animator addTempBehavior:frictionBehavior];
    }
    
    return res;
}

- (void)addTempSnapToPointBehavior:(InteractablePoint*)snapPoint
{
    PhysicsSpringBehavior *snapBehavior = [[PhysicsSpringBehavior alloc] initWithTarget:self anchorPoint:[snapPoint positionWithOrigin:self.origin]];
    snapBehavior.tension = snapPoint.tension;
    [self.animator addTempBehavior:snapBehavior];
    
    CGFloat damping = 0.7;
    if (snapPoint.damping > 0.0) damping = snapPoint.damping;
    PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
    frictionBehavior.friction = damping;
    [self.animator addTempBehavior:frictionBehavior];
}

- (void)addTempBounceBehaviorWithBoundaries:(InteractableArea*)boundaries
{
    if (boundaries && boundaries.bounce > 0.0)
    {
        CGPoint minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
        if (boundaries.left != -CGFLOAT_MAX) minPoint.x = self.origin.x + boundaries.left;
        if (boundaries.top != -CGFLOAT_MAX) minPoint.y = self.origin.y + boundaries.top;
        CGPoint maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
        if (boundaries.right != CGFLOAT_MAX) maxPoint.x = self.origin.x + boundaries.right;
        if (boundaries.bottom != CGFLOAT_MAX) maxPoint.y = self.origin.y + boundaries.bottom;
        PhysicsBounceBehavior *bounceBehavior = [[PhysicsBounceBehavior alloc] initWithTarget:self minPoint:minPoint maxPoint:maxPoint];
        bounceBehavior.bounce = boundaries.bounce;
        bounceBehavior.haptics = boundaries.haptics;
        [self.animator addTempBehavior:bounceBehavior];
    }
}

- (void)addConstantSpringBehavior:(InteractablePoint*)point
{
    CGPoint anchor = self.origin;
    if (point.x != CGFLOAT_MAX) anchor.x = self.origin.x + point.x;
    if (point.y != CGFLOAT_MAX) anchor.y = self.origin.y + point.y;
    
    PhysicsSpringBehavior *springBehavior = [[PhysicsSpringBehavior alloc] initWithTarget:self anchorPoint:anchor];
    springBehavior.tension = point.tension;
    springBehavior.haptics = point.haptics;
    springBehavior.influence = [self influenceAreaFromPoint:point];
    [self.animator addBehavior:springBehavior];
    
    if (point.damping > 0.0)
    {
        PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
        frictionBehavior.friction = point.damping;
        if (springBehavior.influence) frictionBehavior.influence = springBehavior.influence;
        [self.animator addBehavior:frictionBehavior];
    }
}

- (void)addConstantGravityBehavior:(InteractablePoint*)point
{
    CGPoint anchor = self.origin;
    if (point.x != CGFLOAT_MAX) anchor.x = self.origin.x + point.x;
    if (point.y != CGFLOAT_MAX) anchor.y = self.origin.y + point.y;
    
    PhysicsGravityWellBehavior *gravityBehavior = [[PhysicsGravityWellBehavior alloc] initWithTarget:self anchorPoint:anchor];
    gravityBehavior.strength = point.strength;
    gravityBehavior.falloff = point.falloff;
    gravityBehavior.influence = [self influenceAreaFromPoint:point];
    [self.animator addBehavior:gravityBehavior];
    
    if (point.damping > 0.0)
    {
        PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
        frictionBehavior.friction = point.damping;
        if (gravityBehavior.strength > 0.0) frictionBehavior.haptics = point.haptics;
        if (gravityBehavior.influence) frictionBehavior.influence = gravityBehavior.influence;
        else frictionBehavior.influence = [self influenceAreaWithRadius:1.4 * point.falloff fromAnchor:anchor];
        [self.animator addBehavior:frictionBehavior];
    }
}

- (void)addConstantFrictionBehavior:(InteractablePoint*)point
{
    if (point.damping > 0.0)
    {
        PhysicsFrictionBehavior *frictionBehavior = [[PhysicsFrictionBehavior alloc] initWithTarget:self];
        frictionBehavior.friction = point.damping;
        frictionBehavior.haptics = point.haptics;
        frictionBehavior.influence = [self influenceAreaFromPoint:point];
        [self.animator addBehavior:frictionBehavior];
    }
}

- (PhysicsArea*)influenceAreaFromPoint:(InteractablePoint*)point
{
    if (!point.influenceArea) return nil;
    CGPoint minPoint = CGPointMake(-CGFLOAT_MAX, -CGFLOAT_MAX);
    CGPoint maxPoint = CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX);
    if (point.influenceArea.left != -CGFLOAT_MAX) minPoint.x = self.origin.x + point.influenceArea.left;
    if (point.influenceArea.right != CGFLOAT_MAX) maxPoint.x = self.origin.x + point.influenceArea.right;
    if (point.influenceArea.top != -CGFLOAT_MAX) minPoint.y = self.origin.y + point.influenceArea.top;
    if (point.influenceArea.bottom != CGFLOAT_MAX) maxPoint.y = self.origin.y + point.influenceArea.bottom;
    return [[PhysicsArea alloc] initWithMinPoint:minPoint maxPoint:maxPoint];
}

- (PhysicsArea*)influenceAreaWithRadius:(CGFloat)radius fromAnchor:(CGPoint)anchor
{
    if (radius <= 0.0) return nil;
    CGPoint minPoint = CGPointMake(anchor.x - radius, anchor.y - radius);
    CGPoint maxPoint = CGPointMake(anchor.y + radius, anchor.y + radius);
    return [[PhysicsArea alloc] initWithMinPoint:minPoint maxPoint:maxPoint];
}

// MARK: - Imperative commands

- (void)setVelocity:(NSDictionary*)params
{
    if (self.dragBehavior) return;
    CGFloat x = [[params objectForKey:@"x"] floatValue];
    CGFloat y = [[params objectForKey:@"y"] floatValue];
    [self.animator ensureRunning];
    [self.animator setTarget:self velocity:CGPointMake(x, y)];
    [self setTempBehaviorsForDragEnd];
}

- (void)snapTo:(NSDictionary*)params
{
    NSInteger index = [[params objectForKey:@"index"] integerValue];
    if (self.snapPoints && index >= 0 && index < [self.snapPoints count])
    {
        [self.animator removeTempBehaviors];
        self.dragBehavior = nil;
        
        InteractablePoint *snapPoint = [self.snapPoints objectAtIndex:index];
        if (snapPoint) {
            [self addTempSnapToPointBehavior:snapPoint];
            if (self.onSnapStart) {
                self.onSnapStart(@
                            {
                                @"index": @([self.snapPoints indexOfObject:snapPoint]),
                                @"id": snapPoint.id
                            });
            }
        }
        
        [self addTempBounceBehaviorWithBoundaries:self.boundaries];
        [self.animator ensureRunning];
    }
}

- (void)changePosition:(NSDictionary*)params
{
    if (self.dragBehavior) return;
    CGPoint pt = CGPointMake(((NSNumber *)params[@"x"]).floatValue, ((NSNumber *)params[@"y"]).floatValue);
    pt.x += self.origin.x;
    pt.y += self.origin.y;
    self.center = pt;
    [self setTempBehaviorsForDragEnd];
    [self.animator ensureRunning];
}

- (void)bringToFront:(NSDictionary*)params
{

}

@end


