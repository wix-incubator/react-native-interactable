import { PhysicsBehavior } from "./PhysicsBehavior";
import { IPoint, ITarget } from "./types";
import { PhysicsObject } from "./PhysicsObject";

const ANIMATOR_PAUSE_CONSECUTIVE_FRAMES = 10;
const ANIMATOR_PAUSE_ZERO_VELOCITY = 1.0;

class WebRenderer {
    renderCallback: (timestamp: number) => void;
    paused: boolean;

    constructor(renderCallback: (timestamp: number) => void) {
        this.renderCallback = renderCallback;
        window.requestAnimationFrame(this.animationFrameCallback);
    }

    animationFrameCallback(timestamp: number) {
        if (!this.paused) {
            this.renderCallback(timestamp);
        }
        window.requestAnimationFrame(this.animationFrameCallback);
    }
}


export class PhysicsAnimator {

    lastFrameTime: number;
    behaviors: PhysicsBehavior[];
    targetsToObjects: Map<ITarget, PhysicsObject>;
    keysToTargets: Record<string, ITarget>;
    consecutiveFramesWithNoMovement: number;
    screenScale: number;

    webRenderer: WebRenderer;

    constructor() {
        this.behaviors = [];
        this.targetsToObjects = new Map();
        this.screenScale = 1;

        this.webRenderer = new WebRenderer(this.renderCallback);
        this.webRenderer.paused = true;
    }


    addBehavior(behavior: PhysicsBehavior) {

    }

    addTempBehavior(behavior: PhysicsBehavior) {

    }

    removeAllBehaviors() {

    }

    removeTempBehaviors() {

    }

    ensureRunning() {
        if (!this.webRenderer.paused) return;
        this.lastFrameTime = 0.0;
        this.consecutiveFramesWithNoMovement = 0;
        this.webRenderer.paused = false;
    }

    stopRunning() {
        if (this.webRenderer.paused) return;
        this.webRenderer.paused = true;
    }

    setTarget(target: ITarget, mass: number);
    setTarget(target: ITarget, velocity: IPoint);
    setTarget(target: ITarget, massOrVelocity: number | IPoint) {
        let object;
        if (typeof massOrVelocity == "number") {
            object = this.ensureTargetObjectExists(target);
            object.mass = massOrVelocity;
        } else {
            object = this.ensureTargetObjectExists(target);
            object.velocity = massOrVelocity;
        }
        this.ensureRunning();
    }

    getTargetVelocity(target: ITarget): IPoint {
        const object = this.targetsToObjects.get(target);
        if (object) return object.velocity;
        return { x: 0, y: 0 };
    }

    renderCallback(timestamp: number) {
        let deltaTime = 0.0;
        const currentTime = timestamp;
        if (this.lastFrameTime > 0.0) {
            deltaTime = currentTime - this.lastFrameTime;
        }
        this.lastFrameTime = currentTime;
        
        this.animateFrameWithDeltaTime(deltaTime);
    }

    animateFrameWithDeltaTime(deltaTime: number) {
        for (const behavior of this.behaviors) {
            const object = this.targetsToObjects.get(behavior.target);
            if (!object) {
                console.warn('Target does not have physics object', behavior.target);
            } else {
                behavior.executeFrameWithDeltaTime(deltaTime, object);
            }
        }

        let hadMovement = false;
        for (const [ target, object ] of this.targetsToObjects.entries()) {
            let dx = 0.0;
            if (Math.abs(object.velocity.x) > ANIMATOR_PAUSE_ZERO_VELOCITY) {
                dx = deltaTime * object.velocity.x;
                hadMovement = true;
            }

            let dy = 0.0;
            if (Math.abs(object.velocity.y) > ANIMATOR_PAUSE_ZERO_VELOCITY) {
                dy = deltaTime * object.velocity.y;
                hadMovement = true;
            }

            target.center = { x: target.center.x + dx, y: target.center.y + dy };
        }

        if (hadMovement) {
            this.consecutiveFramesWithNoMovement = 0;
        } else {
            this.consecutiveFramesWithNoMovement++;
        }

        if (this.consecutiveFramesWithNoMovement >= ANIMATOR_PAUSE_CONSECUTIVE_FRAMES) {
            this.stopRunning();
        }
    }

    ensureTargetObjectExists(target: ITarget) {
        let object = this.targetsToObjects.get(target);
        if (!object) {
            object = new PhysicsObject();
            this.targetsToObjects.set(target, object);

        }
        return object;
    }


}