declare module 'react-native-interactable' {
  import { Animated, ViewProperties, ViewStyle } from 'react-native';

  export interface ISnapPoint {
    x?: number;
    y?: number;
    damping?: number;
    tension?: number;
    id?: string;
  }

  export interface IInfluenceArea {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  }

  export interface ISpringPoint {
    x?: number;
    y?: number;
    damping?: number;
    tension?: number;
    influenceArea?: IInfluenceArea;
    haptics?: boolean;
  }

  export interface IGravityPoints {
    x?: number;
    y?: number;
    strength?: number;
    falloff?: number;
    damping?: number;
    influenceArea?: IInfluenceArea;
    haptics?: boolean;
  }

  interface IFrictionArea {
    damping?: number;
    influenceArea?: IInfluenceArea;
    haptics?: boolean;
  }

  export interface IAlertArea {
    id: string;
    influenceArea: IInfluenceArea;
  }

  export interface IBoundaries {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    bounce?: number;
    haptics?: boolean;
  }

  export interface IDragWithSpring {
    tension?: number;
    damping?: number;
  }

  export interface IInitialPosition {
    x?: number;
    y?: number;
  }

  export interface INativeSnapEvent {
    index: number;
    id: string;
  }

  export interface ISnapEvent {
    nativeEvent: INativeSnapEvent;
  }

  export interface INativeStopEvent {
    x: number;
    y: number;
  }

  export interface IStopEvent {
    nativeEvent: INativeStopEvent;
  }

  export type NativeDragEventStartStateType = 'start';
  export type NativeDragEventEndStateType = 'end';
  export type NativeDragEventState =
    | NativeDragEventStartStateType
    | NativeDragEventEndStateType;

  export interface INativeDragEvent {
    state: NativeDragEventState;
    x: number;
    y: number;
  }

  export interface IDragEvent {
    nativeEvent: INativeDragEvent;
  }

  export type NativeAlertEventEnterValueType = 'enter';
  export type NativeAlertEventLeaveValueType = 'leave';
  export type NativeAlertEventValue =
    | NativeAlertEventEnterValueType
    | NativeAlertEventLeaveValueType;

  export interface INativeAlertEvent {
    [id: string]: NativeAlertEventValue;
  }

  export interface IAlertEvent {
    nativeEvent: INativeAlertEvent;
  }

  export interface IInteractableView extends ViewProperties {
    snapPoints?: ISnapPoint[];
    springPoints?: ISpringPoint[];
    gravityPoints?: IGravityPoints[];
    frictionAreas?: IFrictionArea[];
    alertAreas?: IAlertArea[];
    horizontalOnly?: boolean;
    verticalOnly?: boolean;
    boundaries?: IBoundaries;
    onSnap?: (event: ISnapEvent) => void;
    onSnapStart?: (event: ISnapEvent) => void;
    onStop?: (event: IStopEvent) => void;
    onDrag?: (event: IDragEvent) => void;
    onAlert?: (event: IAlertEvent) => void;
    dragEnabled?: boolean;
    dragWithSpring?: IDragWithSpring;
    dragToss?: number;
    animatedValueX?: Animated.Value;
    animatedValueY?: Animated.Value;
    animatedNativeDriver?: boolean;
    initialPosition?: IInitialPosition;
    style?: ViewStyle;
  }

  export interface IInteractable {
    View: new () => React.Component<IInteractableView, {}>;
  }

  const Interactable: IInteractable;

  export default Interactable;
}
