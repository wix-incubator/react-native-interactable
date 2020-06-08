import { PhysicsBehavior } from "./PhysicsBehavior";
import { IPoint, ITarget } from "./types";
import { PhysicsObject } from "./PhysicsObject";

export class PhysicsBounceBehavior extends PhysicsBehavior {
    minPoint: IPoint;
    maxPoint: IPoint;
    bounce: number;

    initWithTarget(target: ITarget, minPoint: IPoint, maxPoint: IPoint): PhysicsBounceBehavior {
        super.initWithTarget(target);
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
        this.bounce = 0.5;

        return this;
    }

    executeFrameWithDeltaTime(deltaTime: number, object: PhysicsObject) {
        if (this.minPoint.x == this.target.center.x && object.velocity.x < 0.0) {
            const vx = -object.velocity.x * this.bounce;
            const vy = object.velocity.y;
            object.velocity = { x: vx, y: vy };
            this.doHaptics();
        }

        if (this.minPoint.y == this.target.center.y && object.velocity.y < 0.0) {
            const vx = object.velocity.x;
            const vy = -object.velocity.y * this.bounce;
            object.velocity = { x: vx, y: vy };
            this.doHaptics();
        }

        if (this.maxPoint.x == this.target.center.x && object.velocity.x > 0.0) {
            const vx = -object.velocity.x * this.bounce;
            const vy = object.velocity.y;
            object.velocity = { x: vx, y: vy };
            this.doHaptics();
        }

        if (this.maxPoint.y == this.target.center.y && object.velocity.y > 0.0) {
            const vx = object.velocity.x;
            const vy = -object.velocity.y * this.bounce;
            object.velocity = { x: vx, y: vy };
            this.doHaptics();
        }
    }
}