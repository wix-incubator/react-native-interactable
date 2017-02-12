package com.wix.interactable;

import android.graphics.PointF;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.wix.interactable.RNConvert.RNConvert;

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
        view.setSprings(RNConvert.interactablePoints(snapTo));
    }

    @ReactProp(name = "springs")
    public void setSprings(InteractableView view, @Nullable ReadableArray springs) {
        view.setSprings(RNConvert.interactablePoints(springs));
    }

    @ReactProp(name = "gravity")
    public void setGravity(InteractableView view, @Nullable ReadableArray gravity) {
        view.setSprings(RNConvert.interactablePoints(gravity));
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
        view.setInitialPosition(new PointF(setInitialPosition.getInt("x"), setInitialPosition.getInt("y")));

    }

    //TODO - `onSnap`  and `onAnimatedEvent` through EventEmitter
}

