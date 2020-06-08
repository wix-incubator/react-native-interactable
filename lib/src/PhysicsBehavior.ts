import { IPoint, ITarget } from "./types";
import { PhysicsArea } from "./PhysicsArea";
import { PhysicsObject } from "./PhysicsObject";

export const DURATION_BETWEEN_HAPTICS = 0.5;

export class PhysicsBehavior {
    target: ITarget;
    priority: number;
    temp: boolean;
    anchorPoint: IPoint;
    influence: PhysicsArea;
    haptics: boolean;

    hapticsEngine: any;
    lastHapticsAction: number;
    lastIsWithinInfluence: boolean;
    lastIsWithinInfluenceInitialized: boolean;

    setup(target) {
        this.target = target;
        this.temp = false;
        this.haptics = false;
        this.hapticsEngine = null;
        this.lastHapticsAction = 0.0;
        this.lastIsWithinInfluence = false;
        this.lastIsWithinInfluenceInitialized = false;
        this.priority = 1;
    }

    initWithTarget(target: ITarget, anchorOrMinPoint?: IPoint, maxPoint?: IPoint) {
        this.setup(target);
        if (anchorOrMinPoint) {
            this.anchorPoint = anchorOrMinPoint;
        }
    }

    setHaptics(haptics: boolean) {
        if (haptics && window.navigator.vibrate) {
            this.hapticsEngine = window.navigator.vibrate;
            this.haptics = haptics;
        }
    }

    executeFrameWithDeltaTime(deltaTime: number, object: PhysicsObject) {}

    findSortIndexInArray(array: PhysicsBehavior[]) {
        const sortedArray = array.sort((behaviorA, behaviorB) => {
            return behaviorA.priority - behaviorB.priority;
        });
        return sortedArray.indexOf(this);
    }

    isWithinInfluence() {
        let result = true;

        if (this.influence) {
            if (this.target.center.x < this.influence.minPoint.x) result = false;
            if (this.target.center.x > this.influence.maxPoint.x) result = false;
            
            if (this.target.center.y < this.influence.minPoint.y) result = false;
            if (this.target.center.y > this.influence.maxPoint.y) result = false;
            
            // haptics
            if (this.lastIsWithinInfluenceInitialized)
            {
                if (this.lastIsWithinInfluence != result) {
                    this.doHaptics();
                }
            }
            else
            {
                this.lastIsWithinInfluenceInitialized = true;
            }
            this.lastIsWithinInfluence = result;
        }

        return result;
    }

    doHaptics() {
        if (!this.hapticsEngine) {
            return;
        }
        const now = Date.now();
        if (this.lastHapticsAction == 0 || (now - this.lastHapticsAction > DURATION_BETWEEN_HAPTICS)) {
            this.hapticsEngine(10);
        }
        this.lastHapticsAction = now;
    };
}