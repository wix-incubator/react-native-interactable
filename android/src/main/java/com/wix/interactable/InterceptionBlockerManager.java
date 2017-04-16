package com.wix.interactable;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by zachik on 28/03/2017.
 */

public class InterceptionBlockerManager extends ViewGroupManager<InterceptionBlocker> {

    @Override
    public String getName() {
        return "InterceptionBlocker";
    }

    @Override
    protected InterceptionBlocker createViewInstance(ThemedReactContext reactContext) {
        return new InterceptionBlocker(reactContext);
    }

    @ReactProp(name = "blockAllTouch")
    public void setBlockAllTouch(InterceptionBlocker view, @Nullable boolean blockAllTouch) {
        view.setBlockAllTouch(blockAllTouch);
    }

    @ReactProp(name = "blockVerticalSwipe")
    public void setBlockVerticalSwipe(InterceptionBlocker view, @Nullable boolean blockVerticalSwipe) {
        view.setBlockVerticalSwipe(blockVerticalSwipe);
    }

    @ReactProp(name = "blockHorizontalSwipe")
    public void setBlockHorizontalSwipe(InterceptionBlocker view, @Nullable boolean blockHorizontalSwipe) {
        view.setBlockHorizontalSwipe(blockHorizontalSwipe);
    }
}
