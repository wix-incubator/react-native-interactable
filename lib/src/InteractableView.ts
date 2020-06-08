import { InteractablePoint } from "./InteractablePoint";
import { InteractableArea } from "./InteractableArea";
import { InteractableSpring } from "./InteractableSpring";
import { IPoint } from "./types";
import { PhysicsAnimator } from "./PhysicsAnimator";
import { PhysicsBehavior } from "./PhysicsBehavior";
import { PhysicsObject } from "./PhysicsObject";

export class InteractableView {
    verticalOnly: boolean;
    horizontalOnly: boolean;
    dragEnabled: boolean;
    bridge: any;
    snapPoints: InteractablePoint[];
    springPoints: InteractablePoint[];
    gravityPoints: InteractablePoint[];
    frictionAreas: InteractablePoint[];
    alertAreas: InteractablePoint[];
    boundaries: InteractableArea;
    dragWithSpring: InteractableSpring;
    dragToss: number;
    onSnap: () => void;
    onSnapStart: () => void;
    onStop: () => void;
    onAlert: () => void;
    onDrag: () => void;
    initialPosition: number;
    onAnimatedEvent: () => void;
    reportOnAnimatedEvents: boolean;

    originSet: boolean = false;
    origin: IPoint;
    animator: PhysicsAnimator;
    dragBehavior: PhysicsBehavior;
    dragStartCenter: IPoint;
    dragStartLocation: IPoint;
    initialPositionSet: boolean;
    reactRelayoutHappening: boolean;
    reactRelayoutCenterDeltaFromOrigin: IPoint;
    insideAlertAreas: Set<PhysicsObject>;
    pan: any; // TODO: PanGestureHandler from react-native?

    constructor() {

    }

    setVelocity(parameters: any) {

    }

    snapTo(parameters: any) {

    }

    changePosition(parameters: any) {

    }

    bringToFront(parameters: any) {

    }
}