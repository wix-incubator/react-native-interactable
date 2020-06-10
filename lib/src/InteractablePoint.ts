import { InteractableArea } from "./InteractableArea";
import { IPoint } from "./types";

const MAX = Infinity;

export class InteractablePoint {
    x: number;
    y: number;
    damping: number;
    tension: number;
    strength: number;
    falloff: number;
    id: string;
    influenceArea: InteractableArea;
    haptics: boolean;

    positionWithOrigin(origin: IPoint): IPoint {
        const result = origin;
        if (this.x != Number.MAX_SAFE_INTEGER) result.x += this.x;
        if (this.y != Number.MAX_SAFE_INTEGER) result.y += this.y;
        return result;
    }

    distanceFromPoint(point: IPoint, origin: IPoint): number {
        let dx = Number.MAX_SAFE_INTEGER;
        let dy = Number.MAX_SAFE_INTEGER;
        if (this.x != Number.MAX_SAFE_INTEGER) dx = point.x - (origin.x + this.x);
        if (this.y != Number.MAX_SAFE_INTEGER) dy = point.y - (origin.y + this.y);
        if (dx === Number.MAX_SAFE_INTEGER && dy === Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
        if (dx === Number.MAX_SAFE_INTEGER) return Math.abs(dy);
        if (dy === Number.MAX_SAFE_INTEGER) return Math.abs(dx);
        return Math.sqrt(dx*dx + dy*dy);
    }

    static deltaBetweenPoint(point: IPoint, origin: IPoint): IPoint {
        return { x: point.x - origin.x, y: point.y - origin.y };
    }

    static findClosestPoint(points: InteractablePoint[], relativeToPoint: IPoint, origin: IPoint): InteractablePoint {
        let resultPoint = null;
        let minDistance = Number.MAX_SAFE_INTEGER;
        for (const point of points) {
            const distance = point.distanceFromPoint(relativeToPoint, origin);
            if (distance < minDistance) {
                minDistance = distance;
                resultPoint = point;
            }
        }

        return resultPoint;
    }
}