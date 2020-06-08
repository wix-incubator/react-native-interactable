import { IPoint } from "./types";


export class PhysicsObject {
    velocity: IPoint;
    mass: number;

    constructor() {
        this.velocity = { x: 0, y: 0 };
        this.mass = 1.0;
    }
}