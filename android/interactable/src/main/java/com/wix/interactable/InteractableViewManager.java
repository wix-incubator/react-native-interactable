package com.wix.interactable;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

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

    }

    @ReactProp(name = "horizontalOnly")
    public void setHorizontalOnly(InteractableView view, @Nullable boolean horizontalOnly) {

    }

    @ReactProp(name = "snapTo")
    public void setSnapTo(InteractableView view, @Nullable ReadableArray snapTo) {

    }

    @ReactProp(name = "limitX")
    public void setLimitX(InteractableView view, @Nullable ReadableArray limitX) {
//        double min = limitX.getDouble(0);
//        double max = limitX.getDouble(1);
//        double bounce = limitX.getDouble(2);
//        new InteractableLimit(min, max, bounce);
    }

    @ReactProp(name = "limitY")
    public void setLimitY(InteractableView view, @Nullable ReadableArray limitY) {

    }

    @ReactProp(name = "initialPosition")
    public void setInitialPosition(InteractableView view, @Nullable ReadableMap setInitialPosition) {
        view.setAlpha(1);
    }

    //TODO - `onSnap`  and `onAnimatedEvent` through EventEmitter
}

