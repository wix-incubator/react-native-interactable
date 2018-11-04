declare module 'react-native-interactable' {

  import {Animated, ViewProperties, ViewStyle} from 'react-native';

  namespace Interactable {
    interface ISnapPoint {
      x?: number;
      y?: number;
      damping?: number;
      tension?: number;
      id?: string;
    }

    interface IInfluenceArea {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    }

    interface ISpringPoint {
      x?: number;
      y?: number;
      damping?: number;
      tension?: number;
      influenceArea?: IInfluenceArea;
      haptics?: boolean;
    }

    interface IGravityPoints {
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

    interface IAlertArea {
      id: string;
      influenceArea: IInfluenceArea;
    }

    interface IBoundaries {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
      bounce?: number;
      haptics?: boolean;
    }

    interface IDragWithSpring {
      tension?: number;
      damping?: number;
    }

    interface IInitialPosition {
      x?: number;
      y?: number;
    }

    interface INativeSnapEvent {
      index: number;
      id: string;
    }

    interface ISnapEvent {
      nativeEvent: INativeSnapEvent;
    }

    interface INativeStopEvent {
      x: number;
      y: number;
    }

    interface IStopEvent {
      nativeEvent: INativeStopEvent;
    }

    type NativeDragEventStartStateType = 'start';
    type NativeDragEventEndStateType = 'end';
    type NativeDragEventState = NativeDragEventStartStateType | NativeDragEventEndStateType;

    interface INativeDragEvent {
      state: NativeDragEventState;
      x: number;
      y: number;
    }

    interface IDragEvent {
      nativeEvent: INativeDragEvent;
    }

    type NativeAlertEventEnterValueType = 'enter';
    type NativeAlertEventLeaveValueType = 'leave';
    type NativeAlertEventValue = NativeAlertEventEnterValueType | NativeAlertEventLeaveValueType;

    interface INativeAlertEvent { [id: string]: NativeAlertEventValue }

    interface IAlertEvent {
      nativeEvent: INativeAlertEvent;
    }

    interface IInteractableView extends ViewProperties {
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

    interface IInteractable {
      View: new () => React.Component<IInteractableView, {}>;
    }
  }

  const Interactable: Interactable.IInteractable;

  export = Interactable;
}
