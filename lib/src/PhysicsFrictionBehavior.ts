import { PhysicsBehavior } from "./PhysicsBehavior";
import { PhysicsObject } from "./PhysicsObject";
import { ITarget } from "./types";

export class PhysicsFrictionBehavior extends PhysicsBehavior {
    friction: number;

    initWithTarget(target: ITarget) {
        super.initWithTarget(target);
        this.priority = 2;
        this.friction = 0.7;
        return this;
    }

    executeFrameWithDeltaTime(deltaTime: number, object: PhysicsObject) {
        if (!this.isWithinInfluence()) {
            return;
        }

        const vx = Math.pow(this.friction, 60.0 * deltaTime) * object.velocity.x;
        const vy = Math.pow(this.friction, 60.0 * deltaTime) * object.velocity.y;

        object.velocity = { x: vx, y: vy };
    }
}