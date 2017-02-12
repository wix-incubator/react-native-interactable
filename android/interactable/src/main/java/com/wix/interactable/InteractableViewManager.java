package com.wix.interactable;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class InteractableViewManager extends SimpleViewManager<InteractableView> {

    public static final String REACT_CLASS = "InteractableViewManager";

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
    public void setSnapTo(InteractableView view, @Nullable ReadableNativeArray snapTo) {

    }

    @ReactProp(name = "limitX")
    public void setLimitX(InteractableView view, @Nullable InteractableLimit limitX) {

    }

    @ReactProp(name = "limitY")
    public void setLimitY(InteractableView view, @Nullable InteractableLimit limitY) {

    }

    @ReactProp(name = "initialPosition")
    public void setInitialPosition(InteractableView view, @Nullable float[] setInitialPosition) {

    }

    //TODO - `onSnap`  and `onAnimatedEvent` through EventEmitter
}

