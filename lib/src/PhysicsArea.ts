import { IPoint } from "./types";


export class PhysicsArea {
    minPoint: IPoint;
    maxPoint: IPoint;

    constructor() {
        this.minPoint = {
            x: Number.MAX_SAFE_INTEGER,
            y: Number.MAX_SAFE_INTEGER
        };

        this.maxPoint = {
            x: Number.MAX_SAFE_INTEGER,
            y: Number.MAX_SAFE_INTEGER,
        }
    }

    initWithMinPoint(minPoint: IPoint, maxPoint: IPoint) {
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
    }
}