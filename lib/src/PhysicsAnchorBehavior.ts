import { PhysicsBehavior } from "./PhysicsBehavior";
import { IPoint, ITarget } from "./types";
import { PhysicsObject } from "./PhysicsObject";

export class PhysicsAnchorBehavior extends PhysicsBehavior {
    initWithTarget(target: ITarget, anchorPoint: IPoint) {
        super.initWithTarget(target, anchorPoint);
        this.priority = 3;
    }

    executeFrameWithDeltaTime(deltaTime: number, object: PhysicsObject) {
        if (deltaTime == 0.0) {
            return;
        }

        const dx = this.anchorPoint.x - this.target.center.x;
        const vx = dx / deltaTime;

        const dy = this.anchorPoint.y - this.target.center.y;
        const vy = dy / deltaTime;

        object.velocity = { x: vx, y: vy };
    }
}