import { PhysicsBehavior } from "./PhysicsBehavior";
import { IPoint, ITarget } from "./types";
import { PhysicsObject } from "./PhysicsObject";

export class PhysicsGravityWellBehavior extends PhysicsBehavior {
    strength: number;
    falloff: number;

    initWithTarget(target: ITarget, anchorPoint: IPoint) {
        super.initWithTarget(target, anchorPoint);
        this.strength = 400.0;
        this.falloff = 40.0;
        return this;
    }


    // regular gravitational force is proportional to 1/r^2 which is instable when r -> 0
    // instead, we're using a potential that looks like an inverted gaussian which behaves much better
    // its deriviative (the force) looks like this:
    // https://www.wolframalpha.com/input/?i=max+-5%2F(7)*sqrt(e)x*e%5E(-1%2F2%2F7%5E2*x%5E2)
    executeFrameWithDeltaTime(deltaTime: number, object: PhysicsObject) {
        if (!this.isWithinInfluence()) {
            return;
        }

        const dx = this.target.center.x - this.anchorPoint.x;
        const dy = this.target.center.y - this.anchorPoint.y;
        const dr = Math.sqrt(dx*dx + dy*dy);
        if (dr == 0.0) {
            return;
        }

        const a = (-this.strength * dr * Math.exp(-0.5 * dr * dr / this.falloff / this.falloff)) / object.mass;

        const ax = dx / dr * a;
        const vx = object.velocity.x + deltaTime * ax;

        const ay = dy / dr * a;
        const vy = object.velocity.y + deltaTime * ay;

        object.velocity = { x: vx, y: vy };
    }
}