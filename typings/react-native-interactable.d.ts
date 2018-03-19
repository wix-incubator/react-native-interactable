declare module "react-native-interactable" {
  import {Animated, ViewProperties, ViewStyle} from "react-native";

  namespace Interactable {
    interface SnapPoint {
      x?: number;
      y?: number;
      damping?: number;
      tension?: number;
      id?: string;
    }

    interface InfluenceArea {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    }

    interface SpringPoint {
      x?: number;
      y?: number;
      damping?: number;
      tension?: number;
      influenceArea?: IInfluenceArea;
      haptics?: boolean;
    }

    interface GravityPoints {
      x?: number;
      y?: number;
      strength?: number;
      falloff?: number;
      damping?: number;
      influenceArea?: IInfluenceArea;
      haptics?: boolean;
    }

    interface FrictionArea {
      damping?: number;
      influenceArea?: IInfluenceArea;
      haptics?: boolean;
    }

    interface AlertArea {
      id: string;
      influenceArea: IInfluenceArea;
    }

    interface Boundaries {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
      bounce?: number;
      haptics?: boolean;
    }

    interface DragWithSpring {
      tension?: number;
      damping?: number;
    }

    interface InitialPosition {
      x?: number;
      y?: number;
    }

    interface NativeSnapEvent {
      index: number;
      id: string;
    }

    interface SnapEvent {
      nativeEvent: INativeSnapEvent;
    }

    interface NativeStopEvent {
      x: number;
      y: number;
    }

    interface StopEvent {
      nativeEvent: INativeStopEvent;
    }

    type NativeDragEventStartStateType = "start";
    type NativeDragEventEndStateType = "end";
    type NativeDragEventState =
      | NativeDragEventStartStateType
      | NativeDragEventEndStateType;

    interface NativeDragEvent {
      state: NativeDragEventState;
      x: number;
      y: number;
      targetSnapPointId?: number;
    }

    interface DragEvent {
      nativeEvent: INativeDragEvent;
    }

    type NativeAlertEventEnterValueType = "enter";
    type NativeAlertEventLeaveValueType = "leave";
    type NativeAlertEventValue =
      | NativeAlertEventEnterValueType
      | NativeAlertEventLeaveValueType;

    interface NativeAlertEvent {
      id: string;
      value: NativeAlertEventValue;
    }

    interface AlertEvent {
      nativeEvent: INativeAlertEvent;
    }

    interface InteractableView extends ViewProperties {
      snapPoints?: ISnapPoint[];
      springPoints?: ISpringPoint[];
      gravityPoints?: IGravityPoints[];
      frictionAreas?: IFrictionArea[];
      alertAreas?: IAlertArea[];
      horizontalOnly?: boolean;
      verticalOnly?: boolean;
      boundaries?: IBoundaries;
      onSnap?: (event: ISnapEvent) => void;
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

    interface Interactable {
      View: new () => React.Component<IInteractableView, {}>;
    }
  }

  const Interactable: Interactable.IInteractable;

  export default Interactable;
}
