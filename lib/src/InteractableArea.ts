import { IPoint } from "./types";

export class InteractableArea {
    top: number;
    left: number;
    bottom: number;
    right: number;
    bounce: number;
    haptics: boolean;

    pointInside(point: IPoint, origin: IPoint) {
        const cx = point.x - origin.x;
        const cy = point.y - origin.y;

        if (cx < this.left) return false;
        if (cx > this.right) return false;
        
        if (cy < this.top) return false;
        if (cy > this.bottom) return false;

        return true;
    }
}





