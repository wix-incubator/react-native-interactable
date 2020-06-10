import React, { Component } from 'react';

import {
  View
} from 'react-native';

import { InteractablePoint } from "./InteractablePoint";
import { InteractableArea } from "./InteractableArea";
import { InteractableSpring } from "./InteractableSpring";
import { IPoint } from "./types";
import { PhysicsAnimator } from "./PhysicsAnimator";
import { PhysicsBehavior } from "./PhysicsBehavior";
import { PanResponder, PanResponderGestureState, GestureResponderEvent, PanResponderInstance } from "react-native";
import { PhysicsAnchorBehavior } from "./PhysicsAnchorBehavior";
import { PhysicsSpringBehavior } from "./PhysicsSpringBehavior";
import { PhysicsFrictionBehavior } from "./PhysicsFrictionBehavior";
import { PhysicsBounceBehavior } from "./PhysicsBounceBehavior";
import { PhysicsArea } from "./PhysicsArea";
import { PhysicsGravityWellBehavior } from "./PhysicsGravityWellBehavior";

interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ISnapEvent {
  index: number;
  id: string;
}

interface IDragEvent {
  state: string;
  x: number;
  y: number;
  targetSnapPointId: string;
}

export class InteractableView extends Component {
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
  onSnap: (snapEvent: ISnapEvent) => void;
  onSnapStart: (snapEvent: ISnapEvent) => void;
  onStop: (point: IPoint) => void;
  onAlert: (alert: any) => void;
  onDrag: (dragEvent: IDragEvent) => void;
  initialPosition: IPoint;
  onAnimatedEvent: () => void;
  reportOnAnimatedEvents: boolean;

  center: IPoint;

  lastEmittedEventName: string;
  coalescingKey: number = 0;

  originSet: boolean = false;
  origin: IPoint;
  animator: PhysicsAnimator;
  dragBehavior: PhysicsBehavior;
  dragStartCenter: IPoint;
  dragStartLocation: IPoint;
  initialPositionSet: boolean;
  reactRelayoutHappening: boolean;
  reactRelayoutCenterDeltaFromOrigin: IPoint;
  insideAlertAreas: Set<string>;
  pan: PanResponderInstance; // TODO: PanGestureHandler from react-native?

  panState: any;

  divElement: any;

  constructor(props) {

    super(props);

    this.originSet = false;
    this.initialPositionSet = false;
    this.reactRelayoutHappening = false;
    this.insideAlertAreas = new Set();
    this.dragEnabled = true;

    // pan gesture recognizer for touches
    this.pan = PanResponder.create({
      onMoveShouldSetPanResponder: (event: GestureResponderEvent) => {
        if (this.horizontalOnly) return (Math.abs(event.nativeEvent.locationX) > Math.abs(event.nativeEvent.locationY));
        if (this.verticalOnly) return (Math.abs(event.nativeEvent.locationY) > Math.abs(event.nativeEvent.locationX));
        return true;
      },
      onPanResponderMove: this.handlePan,
      onPanResponderStart: () => {
        this.panState = 'start';
      },
      onPanResponderEnd: () => {
        this.panState = 'end';
      }
    });

    this.divElement = React.createRef();

    return this;
  }

  componentDidMount() {
    if (this.divElement.current) {
      const frame = this._getFrameFromElement(this.divElement);
      this.reactSetFrame(frame);
    }
  }

  componentDidUpdate() {
    if (this.divElement.current) {
      const frame = this._getFrameFromElement(this.divElement);
      this.reactSetFrame(frame);
    }
  }

  _getFrameFromElement(divElement: HTMLDivElement): IRect {
    const height = divElement.clientHeight;
    const width = divElement.clientWidth;
    const x = divElement.clientLeft;
    const y = divElement.clientTop;
    return { height, width, x, y };
  }

  reactSetFrame(frame: IRect) {
    this.reactRelayoutCenterDeltaFromOrigin = { x: this.origin.x - this.center.y, y: this.origin.y - this.center.y };

    const xCenter = frame.x + frame.height / 2;
    const yCenter = frame.y + frame.width / 2;

    this.origin = { x: xCenter, y: yCenter };
    this.originSet = true;

    if (!this.initialPositionSet) {
      this.initialPositionSet = true;
      if (this.initialPosition.x == 0.0 && this.initialPosition.y == 0.0) {
        this.center = { x: this.origin.x + this.initialPosition.x, y: this.origin.y + this.initialPosition.y };
      }

      this.initializeAnimator();
    }
  }

  setCenter(center: IPoint) {
    if (this.initialPositionSet && this.reactRelayoutHappening) {
      center = { x: this.origin.x - this.reactRelayoutCenterDeltaFromOrigin.x, y: this.origin.y - this.reactRelayoutCenterDeltaFromOrigin.y };
    }

    if (this.originSet) {
      if (this.horizontalOnly) center.y = this.origin.y;
      if (this.verticalOnly) center.x = this.origin.x;

      if (this.boundaries) {
        if (center.x - this.origin.x < this.boundaries.left) center.x = this.boundaries.left + this.origin.x;
        if (center.x - this.origin.x > this.boundaries.right) center.x = this.boundaries.right + this.origin.x;
        if (center.y - this.origin.y < this.boundaries.top) center.y = this.boundaries.top + this.origin.y;
        if (center.y - this.origin.y > this.boundaries.bottom) center.y = this.boundaries.bottom + this.origin.y;
      }
    }

    this.center = center;
    this.reportAnimatedEvent();
    this.reportAlertEvent();
  }

  setDragEnabled(dragEnabled: boolean) {
  }

  initializeAnimator() {
    this.animator = new PhysicsAnimator();

    if (this.springPoints) {
      for (const point of this.springPoints) {
        this.addConstantSpringBehavior(point);
      }
    }

    if (this.gravityPoints) {
      for (const point of this.gravityPoints) {
        this.addConstantGravityBehavior(point);
      }
    }

    if (this.frictionAreas) {
      for (const point of this.frictionAreas) {
        this.addConstantFrictionBehavior(point);
      }
    }
  }

  physicsAnimatorDidPause(animator: PhysicsAnimator) {
    if (this.onSnap) {
      const snapPoint = InteractablePoint.findClosestPoint(this.snapPoints, this.center, this.origin);
      if (snapPoint) {
        this.onSnap({
          index: this.snapPoints.indexOf(snapPoint),
          id: snapPoint.id,
        });
      }
    }

    if (this.onStop) {
      const deltaFromOrigin = InteractablePoint.deltaBetweenPoint(this.center, this.origin);
      this.onStop(deltaFromOrigin);
    }
  }

  reportAnimatedEvent() {
    if (this.reportOnAnimatedEvents && this.originSet) {
      const deltaFromOrigin = InteractablePoint.deltaBetweenPoint(this.center, this.origin);
      if (this.lastEmittedEventName !== "onAnimatedEvent") {
        this.coalescingKey++;
        this.lastEmittedEventName = "onAnimatedEvent";
      }

      // TODO: Event here?
      const event = {

      }
    }
  }

  reportAlertEvent() {
    if (this.onAlert && this.alertAreas && this.originSet) {
      const alert = {};
      for (const area of this.alertAreas) {
        if (area.influenceArea && area.id) {
          if (area.influenceArea.pointInside(this.center, this.origin)) {
            if (!this.insideAlertAreas.has(area.id)) {
              alert[area.id] = 'enter';
              this.insideAlertAreas.add(area.id);
            }
          } else {
            if (this.insideAlertAreas.has(area.id)) {
              alert[area.id] = 'leave';
              this.insideAlertAreas.delete(area.id);
            }
          }
        }
      }

      if (Object.keys(alert).length > 0) {
        this.onAlert(alert);
      }
    }
  }

  reportDragEvent(state: string, targetSnapPointId: string = '') {
    if (this.onDrag) {
      const deltaFromOrigin = InteractablePoint.deltaBetweenPoint(this.center, this.origin);
      this.onDrag({
        state,
        targetSnapPointId,
        x: deltaFromOrigin.x,
        y: deltaFromOrigin.y,
      });
    }
  }

  handlePan(event: GestureResponderEvent) {

    if (this.panState === 'start') {
      this.dragStartCenter = this.center;
      this.setTempBehaviorsForDragStart();
      this.reportDragEvent('start');
    }

    this.dragBehavior.anchorPoint = { x: this.dragStartCenter.x + event.nativeEvent.locationX, y: this.dragStartCenter.y + event.nativeEvent.locationY };
    this.animator.ensureRunning();

    if (this.panState === 'end') {
      const point = this.setTempBehaviorsForDragEnd();
      const targetSnapPointId = point && point.id ? point.id : '';
      if (targetSnapPointId == '' || targetSnapPointId == null) {
        this.reportDragEvent('end');
      } else {
        this.reportDragEvent('end', targetSnapPointId);
      }
    }
  }

  setTempBehaviorsForDragStart() {
    this.animator.removeTempBehaviors();
    this.dragBehavior = this.addTempDragBehavior(this.dragWithSpring);
  }

  setTempBehaviorsForDragEnd(): InteractablePoint {
    this.animator.removeTempBehaviors();
    this.dragBehavior = null;

    const velocity = this.animator.getTargetVelocity(this);
    if (this.horizontalOnly) velocity.y = 0;
    if (this.verticalOnly) velocity.x = 0;
    const toss = this.dragToss;
    const projectedCenter = { x: this.center.x + toss * velocity.x, y: this.center.y + toss * velocity.y };
    const snapPoint = InteractablePoint.findClosestPoint(this.snapPoints, projectedCenter, this.origin);

    if (snapPoint) {
      this.addTempSnapToPointBehavior(snapPoint);
      if (this.onSnapStart) {
        this.onSnapStart({
          index: this.snapPoints.indexOf(snapPoint),
          id: snapPoint.id,
        });
      }
    }

    this.addTempBounceBehaviorWithBoundaries(this.boundaries);
    return snapPoint;
  }

  addTempSnapToPointBehavior(snapPoint: InteractablePoint) {
    const snapBehavior = new PhysicsSpringBehavior();
    snapBehavior.initWithTarget(this, snapPoint.positionWithOrigin(this.origin));
    snapBehavior.tension = snapPoint.tension;
    this.animator.addTempBehavior(snapBehavior);

    let damping = 0.7;
    if (snapPoint.damping > 0.0) damping = snapPoint.damping;
    const frictionBehavior = new PhysicsFrictionBehavior();
    frictionBehavior.initWithTarget(this);
    frictionBehavior.friction = damping;
    this.animator.addTempBehavior(frictionBehavior);
  }

  addTempBounceBehaviorWithBoundaries(boundaries: InteractableArea) {
    if (boundaries && boundaries.bounce > 0.0) {
      const minPoint = { x: -Number.MAX_SAFE_INTEGER, y: -Number.MAX_SAFE_INTEGER };
      if (boundaries.left != -Number.MAX_SAFE_INTEGER) minPoint.x = this.origin.x + boundaries.left;
      if (boundaries.top != -Number.MAX_SAFE_INTEGER) minPoint.y = this.origin.y + boundaries.top;
      const maxPoint = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
      if (boundaries.right != Number.MAX_SAFE_INTEGER) maxPoint.x = this.origin.x + boundaries.right;
      if (boundaries.bottom != Number.MAX_SAFE_INTEGER) maxPoint.y = this.origin.y = boundaries.bottom;
      const bounceBehavior = new PhysicsBounceBehavior();
      bounceBehavior.initWithTarget(this, minPoint, maxPoint);
      bounceBehavior.bounce = boundaries.bounce;
      bounceBehavior.haptics = boundaries.haptics;
      this.animator.addTempBehavior(bounceBehavior);
    }
  }

  addTempDragBehavior(spring: InteractableSpring): PhysicsBehavior {
    let result;
    if (!spring || spring.tension == Number.MAX_SAFE_INTEGER) {
      const anchorBehavior = new PhysicsAnchorBehavior();
      anchorBehavior.initWithTarget(this, this.center);
      result = anchorBehavior;
      this.animator.addTempBehavior(anchorBehavior);
    } else {
      const springBehavior = new PhysicsSpringBehavior();
      springBehavior.tension = spring.tension;
      result = springBehavior;
      this.animator.addTempBehavior(springBehavior);
    }

    if (spring && spring.damping > 0.0) {
      const frictionBehavior = new PhysicsFrictionBehavior();
      frictionBehavior.friction = spring.damping;
      this.animator.addTempBehavior(frictionBehavior);
    }

    return result;
  }

  addConstantSpringBehavior(point: InteractablePoint) {
    const anchor = this.origin;
    if (point.x != Number.MAX_SAFE_INTEGER) anchor.x = this.origin.x + point.x;
    if (point.y != Number.MAX_SAFE_INTEGER) anchor.y = this.origin.y + point.y;

    const springBehavior = new PhysicsSpringBehavior();
    springBehavior.initWithTarget(this, anchor);
    springBehavior.tension = point.tension;
    springBehavior.haptics = point.haptics;
    springBehavior.influence = this.influenceAreaFromPoint(point);
    this.animator.addBehavior(springBehavior);

    if (point.damping > 0.0) {
      const frictionBehavior = new PhysicsFrictionBehavior();
      frictionBehavior.initWithTarget(this);
      frictionBehavior.friction = point.damping;
      if (springBehavior.influence) frictionBehavior.influence = springBehavior.influence;
      this.animator.addBehavior(frictionBehavior);
    }
  }

  addConstantGravityBehavior(point: InteractablePoint) {
    const anchor = this.origin;
    if (point.x != Number.MAX_SAFE_INTEGER) anchor.x = this.origin.x + point.x;
    if (point.y != Number.MAX_SAFE_INTEGER) anchor.y = this.origin.y + point.y;

    const gravityBehavior = new PhysicsGravityWellBehavior();
    gravityBehavior.initWithTarget(this, anchor);
    gravityBehavior.strength = point.strength;
    gravityBehavior.falloff = point.falloff;
    gravityBehavior.influence = this.influenceAreaFromPoint(point);
    this.animator.addBehavior(gravityBehavior);

    if (point.damping > 0.0) {
      const frictionBehavior = new PhysicsFrictionBehavior();
      frictionBehavior.initWithTarget(this);
      frictionBehavior.friction = point.damping;
      if (gravityBehavior.strength > 0.0) frictionBehavior.haptics = point.haptics;
      if (gravityBehavior.influence) {
        frictionBehavior.influence = gravityBehavior.influence;
      } else {
        frictionBehavior.influence = this.influenceAreaWithRadius(1.4 * point.falloff, anchor);
      }
      this.animator.addBehavior(frictionBehavior);
    }
  }

  addConstantFrictionBehavior(point: InteractablePoint) {
    if (point.damping > 0.0) {
      const frictionBehavior = new PhysicsFrictionBehavior();
      frictionBehavior.initWithTarget(this);
      frictionBehavior.friction = point.damping;
      frictionBehavior.haptics = point.haptics;
      frictionBehavior.influence = this.influenceAreaFromPoint(point);
      this.animator.addBehavior(frictionBehavior);
    }
  }

  influenceAreaFromPoint(point: InteractablePoint): PhysicsArea {
    if (!point.influenceArea) return null;
    const minPoint = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
    const maxPoint = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
    if (point.influenceArea.left != -Number.MAX_SAFE_INTEGER) minPoint.x = this.origin.x + point.influenceArea.left;
    if (point.influenceArea.right != Number.MAX_SAFE_INTEGER) maxPoint.x = this.origin.x + point.influenceArea.right;
    if (point.influenceArea.top != -Number.MAX_SAFE_INTEGER) minPoint.y = this.origin.y + point.influenceArea.top;
    if (point.influenceArea.bottom != Number.MAX_SAFE_INTEGER) maxPoint.y = this.origin.y + point.influenceArea.bottom;
    const physicsArea = new PhysicsArea();
    physicsArea.initWithMinPoint(minPoint, maxPoint);
    return physicsArea;
  }

  influenceAreaWithRadius(radius: number, anchor: IPoint): PhysicsArea {
    if (radius <= 0.0) return null;
    const minPoint = { x: anchor.x - radius, y: anchor.y - radius };
    const maxPoint = { x: anchor.x + radius, y: anchor.y + radius };
    const physicsArea = new PhysicsArea();
    physicsArea.initWithMinPoint(minPoint, maxPoint);
    return physicsArea;
  }

  setVelocity(velocityPoint: IPoint) {
    if (this.dragBehavior) return;
    this.animator.ensureRunning();
    this.animator.setTarget(this, velocityPoint);
    this.setTempBehaviorsForDragEnd();
  }

  snapTo(snapToParams: { index: number }) {
    const { index } = snapToParams;
    if (this.snapPoints && index >= 0 && index < this.snapPoints.length) {
      this.animator.removeTempBehaviors();
      this.dragBehavior = null;

      const snapPoint = this.snapPoints[index];
      if (snapPoint) {
        this.addTempSnapToPointBehavior(snapPoint);
        if (this.onSnapStart) {
          this.onSnapStart({ index, id: snapPoint.id });
        }
      }

      this.addTempBounceBehaviorWithBoundaries(this.boundaries);
      this.animator.ensureRunning();
    }
  }

  changePosition(point: IPoint) {
    if (this.dragBehavior) return;
    const pt = { x: point.x, y: point.y };
    pt.x += this.origin.x;
    pt.y += this.origin.y;
    this.center = pt;
    this.setTempBehaviorsForDragEnd();
    this.animator.ensureRunning();
  }

  bringToFront(parameters: any) {

  }

  render() {

    const { children } = this.props;

    return (
      <View
        {...this.pan.panHandlers}
        ref={this.divElement}
      >
        {children}
      </View>
    );
  }

}