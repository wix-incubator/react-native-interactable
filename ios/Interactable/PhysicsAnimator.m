//
//  PhysicsAnimator.m
//  Interactable
//
//  Created by Tal Kol on 2/4/17.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "PhysicsAnimator.h"
#import "PhysicsObject.h"

const int ANIMATOR_PAUSE_CONSECUTIVE_FRAMES = 10;
const CGFloat ANIMATOR_PAUSE_ZERO_VELOCITY = 1.0;

@interface PhysicsAnimator()
@property (nonatomic) CADisplayLink *displayLink;
@property (nonatomic, assign) CFTimeInterval lastFrameTime;
@property (nonatomic) NSMutableArray<PhysicsBehavior *> *behaviors;
@property (nonatomic) NSMapTable *targetsToObjects;
@property (nonatomic, assign) int consecutiveFramesWithNoMovement;
@property (nonatomic, assign) CGFloat screenScale;
@end

@implementation PhysicsAnimator

- (instancetype)init
{
    if ((self = [super init]))
    {
        self.behaviors = [NSMutableArray new];
        self.targetsToObjects = [NSMapTable new];
        self.screenScale = [[UIScreen mainScreen] scale];
        self.displayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(displayLinkUpdated)];
        [self.displayLink addToRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];
        self.displayLink.paused = YES;
    }
    return self;
}

- (void)dealloc
{
    [self.displayLink removeFromRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];
    self.displayLink = nil;
    self.behaviors = nil;
    self.targetsToObjects = nil;
}

- (void)ensureRunning
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    if (!self.displayLink.paused) return;
    self.lastFrameTime = 0.0;
    self.consecutiveFramesWithNoMovement = 0;
    self.displayLink.paused = NO;
}

- (void)stopRunning
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    if (self.displayLink.paused) return;
    self.displayLink.paused = YES;
}

- (void)addBehavior:(PhysicsBehavior*)behavior
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    if (behavior.target) [self ensureTargetObjectExists:behavior.target];
    NSUInteger index = [behavior findSortIndexInArray:self.behaviors];
    [self.behaviors insertObject:behavior atIndex:index];
    [self ensureRunning];
}

- (void)addTempBehavior:(PhysicsBehavior*)behavior
{
    behavior.temp = YES;
    [self addBehavior:behavior];
}

- (void)removeAllBehaviors
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    [self.behaviors removeAllObjects];
    [self.targetsToObjects removeAllObjects];
    [self stopRunning];
}

- (void)removeTempBehaviors
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    [self.behaviors filterUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(id evaluatedObject, NSDictionary *bindings)
    {
        PhysicsBehavior *behavior = (PhysicsBehavior *)evaluatedObject;
        return behavior.temp == NO;
    }]];
}

- (PhysicsObject*)ensureTargetObjectExists:(UIView*)target
{
    PhysicsObject *object = [self.targetsToObjects objectForKey:target];
    if (!object)
    {
        object = [PhysicsObject new];
        [self.targetsToObjects setObject:object forKey:target];
    }
    return object;
}

- (void)setTarget:(UIView*)target mass:(CGFloat)mass
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    PhysicsObject *object = [self ensureTargetObjectExists:target];
    object.mass = mass;
    [self ensureRunning];
}

- (void)setTarget:(UIView*)target velocity:(CGPoint)velocity
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    PhysicsObject *object = [self ensureTargetObjectExists:target];
    object.velocity = velocity;
    [self ensureRunning];
}

- (CGPoint)getTargetVelocity:(UIView*)target
{
    NSAssert([NSThread isMainThread], @"Not on main thread");
    PhysicsObject *object = [self.targetsToObjects objectForKey:target];
    if (object) return object.velocity;
    return CGPointZero;
}

- (void)displayLinkUpdated
{
    CFTimeInterval deltaTime = 0.0;
    CFTimeInterval currentTime = [self.displayLink timestamp];
    if (self.lastFrameTime > 0.0) deltaTime = currentTime - self.lastFrameTime;
    self.lastFrameTime = currentTime;
    
    [self animateFrameWithDeltaTime:deltaTime];
}

- (void)animateFrameWithDeltaTime:(CFTimeInterval)deltaTime
{
    // execute all behaviors
    for (PhysicsBehavior *behavior in self.behaviors)
    {
        PhysicsObject *object = [self.targetsToObjects objectForKey:behavior.target];
        NSAssert(object, @"Target does not have physics object");
        [behavior executeFrameWithDeltaTime:deltaTime onObject:object];
    }
    
    // update all the target views accordingly
    BOOL hadMovement = NO;
    for (UIView *target in self.targetsToObjects)
    {
        PhysicsObject *object = [self.targetsToObjects objectForKey:target];
        CGFloat dx = 0.0;
        if (ABS(object.velocity.x) > ANIMATOR_PAUSE_ZERO_VELOCITY)
        {
            dx = deltaTime * object.velocity.x;
            hadMovement = YES;
        }
        CGFloat dy = 0.0;
        if (ABS(object.velocity.y) > ANIMATOR_PAUSE_ZERO_VELOCITY)
        {
            dy = deltaTime * object.velocity.y;
            hadMovement = YES;
        }
        target.center = CGPointMake(target.center.x + dx, target.center.y + dy);
    }
    
    // did all movement stop
    if (hadMovement) self.consecutiveFramesWithNoMovement = 0;
    else self.consecutiveFramesWithNoMovement++;
    if (self.consecutiveFramesWithNoMovement >= ANIMATOR_PAUSE_CONSECUTIVE_FRAMES)
    {
        [self stopRunning];
        
        // round centers for all targets on screen
        for (UIView *target in self.targetsToObjects) target.center = [self roundPointToPixelRatio:target.center];
        
        if (self.delegate) [self.delegate physicsAnimatorDidPause:self];
    }
}

- (CGPoint)roundPointToPixelRatio:(CGPoint)point
{
    CGFloat x = round(point.x * self.screenScale) / self.screenScale;
    CGFloat y = round(point.y * self.screenScale) / self.screenScale;
    return CGPointMake(x, y);
}

@end
