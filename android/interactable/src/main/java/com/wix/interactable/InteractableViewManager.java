package com.wix.interactable;

import android.support.annotation.Nullable;

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

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected InteractableView createViewInstance(ThemedReactContext reactContext) {
        return new InteractableView(reactContext);
    }

    @ReactProp(name = "verticalOnly")
    public void setVerticalOnly(InteractableView view, @Nullable boolean verticalOnly) {
        view.setVerticalOnly(verticalOnly);
    }

    @ReactProp(name = "horizontalOnly")
    public void setHorizontalOnly(InteractableView view, @Nullable boolean horizontalOnly) {
        view.setHorizontalOnly(horizontalOnly);
    }

    @ReactProp(name = "snapTo")
    public void setSnapTo(InteractableView view, @Nullable ReadableArray snapTo) {
        view.setSnapTo(RNConvert.interactablePoints(snapTo));
    }

    @ReactProp(name = "springs")
    public void setSprings(InteractableView view, @Nullable ReadableArray springs) {
        view.setSprings(RNConvert.interactablePoints(springs));
    }

    @ReactProp(name = "gravity")
    public void setGravity(InteractableView view, @Nullable ReadableArray gravity) {
        view.setGravity(RNConvert.interactablePoints(gravity));
    }

    @ReactProp(name = "friction")
    public void setFriction(InteractableView view, @Nullable ReadableArray gravity) {
        view.setFriction(RNConvert.interactablePoints(gravity));
    }

    @ReactProp(name = "drag")
    public void setDrag(InteractableView view, @Nullable ReadableMap drag) {
        view.setDrag(RNConvert.interactableDrag(drag));
    }

    @ReactProp(name = "limitX")
    public void setLimitX(InteractableView view, @Nullable ReadableMap limitX) {
        view.setLimitX(RNConvert.interactableLimit(limitX));
    }

    @ReactProp(name = "limitY")
    public void setLimitY(InteractableView view, @Nullable ReadableMap limitY) {
        view.setLimitY(RNConvert.interactableLimit(limitY));
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
                .put("onAnimatedEvent", MapBuilder.of("registrationName", "onAnimatedEvent"))
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
        public void onAnimatedEvent(float x, float y) {
            eventDispatcher.dispatchEvent(new Events.OnAnimatedEvent(interactableView.getId(), x, y));
        }
    }
}

