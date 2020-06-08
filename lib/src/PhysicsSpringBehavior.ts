import { PhysicsBehavior } from "./PhysicsBehavior";
import { IPoint, ITarget } from "./types";
import { PhysicsObject } from "./PhysicsObject";


export class PhysicsSpringBehavior extends PhysicsBehavior {
    tension: number;

    initWithTarget(target: ITarget, anchorPoint: IPoint) {
        super.initWithTarget(target, anchorPoint);
        this.tension = 300.0;
        return this;
    }

    executeFrameWithDeltaTime(deltaTime: number, object: PhysicsObject) {
        if (!this.isWithinInfluence()) {
            return;
        }

        const dx = this.target.center.x - this.anchorPoint.x;
        const ax = (-this.tension * dx) / object.mass;
        const vx = object.velocity.x + deltaTime * ax;

        const dy = this.target.center.y - this.anchorPoint.y;
        const ay = (-this.tension * dy) / object.mass;
        const vy = object.velocity.y + deltaTime * ay;

        object.velocity = { x: vx, y: vy };
    }
}