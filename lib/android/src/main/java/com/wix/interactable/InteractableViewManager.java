package com.wix.interactable;

import android.support.annotation.Nullable;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.wix.interactable.RNConvert.RNConvert;

import java.util.Map;

public class InteractableViewManager extends ViewGroupManager<InteractableView> {

    public static final String REACT_CLASS = "InteractableView";
    public static final int COMMAND_SET_VELOCITY = 1;
    public static final int COMMAND_SNAP_TO = 2;
    public static final int COMMAND_CHANGE_POSITION = 3;
    public static final int COMMAND_BRING_TO_FRONT = 4;


    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected InteractableView createViewInstance(ThemedReactContext reactContext) {
        return new InteractableView(reactContext);
    }

    @Override
    public Map<String,Integer> getCommandsMap() {
        return MapBuilder.of(
                "setVelocity", COMMAND_SET_VELOCITY,
                "snapTo", COMMAND_SNAP_TO,
                "changePosition", COMMAND_CHANGE_POSITION,
                "bringToFront", COMMAND_BRING_TO_FRONT
                );
    }

    @Override
    public void receiveCommand(
            InteractableView view,
            int commandType,
            @Nullable ReadableArray args) {
        Assertions.assertNotNull(view);
        Assertions.assertNotNull(args);
        switch (commandType) {
            case COMMAND_SET_VELOCITY: {
                view.setVelocity(RNConvert.pointF(args.getMap(0)));
                return;
            }
            case COMMAND_SNAP_TO: {
                int snapPoint = args.getMap(0).getInt("index");
                view.snapTo(snapPoint);
                return;
            }
            case COMMAND_CHANGE_POSITION: {
                view.changePosition(RNConvert.pointF(args.getMap(0)));
                return;
            }
            case COMMAND_BRING_TO_FRONT: {
                view.bringToFront();
                return;
            }
            default:
                throw new IllegalArgumentException(String.format(
                        "Unsupported command %d received by %s.",
                        commandType,
                        getClass().getSimpleName()));
        }
    }

    @ReactProp(name = "verticalOnly")
    public void setVerticalOnly(InteractableView view, @Nullable boolean verticalOnly) {
        view.setVerticalOnly(verticalOnly);
    }

    @ReactProp(name = "startOnFront")
    public void setStartOnFront(InteractableView view, @Nullable boolean startOnFront) {
        view.bringToFront();
    }

    @ReactProp(name = "horizontalOnly")
    public void setHorizontalOnly(InteractableView view, @Nullable boolean horizontalOnly) {
        view.setHorizontalOnly(horizontalOnly);
    }

    @ReactProp(name = "dragEnabled")
    public void setDragEnabled(InteractableView view, @Nullable boolean dragEnabled) {
        view.setDragEnabled(dragEnabled);
    }

    @ReactProp(name = "snapPoints")
    public void setSnapTo(InteractableView view, @Nullable ReadableArray snapPoints) {
        view.setSnapPoints(RNConvert.interactablePoints(snapPoints));
    }

    @ReactProp(name = "springPoints")
    public void setSprings(InteractableView view, @Nullable ReadableArray springs) {
        view.setSpringsPoints(RNConvert.interactablePoints(springs));
    }

    @ReactProp(name = "gravityPoints")
    public void setGravity(InteractableView view, @Nullable ReadableArray gravityPoints) {
        view.setGravityPoints(RNConvert.interactablePoints(gravityPoints));
    }

    @ReactProp(name = "frictionAreas")
    public void setFriction(InteractableView view, @Nullable ReadableArray frictionAreas) {
        view.setFrictionAreas(RNConvert.interactablePoints(frictionAreas));
    }

    @ReactProp(name = "alertAreas")
    public void setAlertAreas(InteractableView view, @Nullable ReadableArray alertAreas) {
        view.setAlertAreas(RNConvert.interactablePoints(alertAreas));
    }

    @ReactProp(name = "dragWithSpring")
    public void setDrag(InteractableView view, @Nullable ReadableMap dragWithSpring) {
        view.setDragWithSpring(RNConvert.interactableDrag(dragWithSpring));
    }

    @ReactProp(name = "dragToss")
    public void setDragToss(InteractableView view, @Nullable float dragToss) {
        view.setDragToss(dragToss);
    }

    @ReactProp(name = "reportOnAnimatedEvents")
    public void setReportOnAnimatedEvents(InteractableView view, @Nullable boolean reportOnAnimatedEvents) {
        view.setReportOnAnimatedEvents(reportOnAnimatedEvents);
    }

    @ReactProp(name = "boundaries")
    public void setBoundaries(InteractableView view, @Nullable ReadableMap boundaries) {
        view.setBoundaries(RNConvert.interactableLimit(boundaries));
    }

    @ReactProp(name = "initialPosition")
    public void setInitialPosition(InteractableView view, @Nullable ReadableMap setInitialPosition) {
        view.setInitialPosition(RNConvert.pointF(setInitialPosition));

    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, InteractableView view) {
        view.setEventListener(new InteractionEventEmitter(view, reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher()));
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onSnap", MapBuilder.of("registrationName", "onSnap"))
                .put("onSnapStart", MapBuilder.of("registrationName", "onSnapStart"))
                .put("onAlert", MapBuilder.of("registrationName", "onAlert"))
                .put("onAnimatedEvent", MapBuilder.of("registrationName", "onAnimatedEvent"))
                .put("onDrag", MapBuilder.of("registrationName", "onDrag"))
                .put("onStop", MapBuilder.of("registrationName", "onStop"))
                .build();
    }

    private static class InteractionEventEmitter implements InteractableView.InteractionListener {
        private final InteractableView interactableView;
        private final EventDispatcher eventDispatcher;

        public InteractionEventEmitter(InteractableView view, EventDispatcher eventDispatcher) {
            this.interactableView = view;
            this.eventDispatcher = eventDispatcher;
        }

        @Override
        public void onSnap(int indexOfSnapPoint, String snapPointId) {
            eventDispatcher.dispatchEvent(new Events.OnSnapEvent(interactableView.getId(), indexOfSnapPoint, snapPointId));
        }

        @Override
        public void onSnapStart(int indexOfSnapPoint, String snapPointId) {
            eventDispatcher.dispatchEvent(new Events.OnSnapStartEvent(interactableView.getId(), indexOfSnapPoint, snapPointId));
        }

        @Override
        public void onAlert(String alertAreaId, String alertType) {
            eventDispatcher.dispatchEvent(new Events.OnAlertEvent(interactableView.getId(), alertAreaId, alertType));
        }

        @Override
        public void onAnimatedEvent(float x, float y) {
            eventDispatcher.dispatchEvent(new Events.OnAnimatedEvent(interactableView.getId(), x, y));
        }

        @Override
        public void onDrag(String state, float x, float y, String targetSnapPointId) {
            eventDispatcher.dispatchEvent(new Events.onDrag(interactableView.getId(),state, x, y, targetSnapPointId));
        }

        @Override
        public void onStop(float x, float y) {
            eventDispatcher.dispatchEvent(new Events.onStop(interactableView.getId(), x, y));
        }
    }
}
