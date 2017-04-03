package com.wix.interactable;

import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.react.uimanager.ReactShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.wix.interactable.TouchBlocker;

/**
 * Created by zachik on 28/03/2017.
 */

public class TouchBlockerManager extends ViewGroupManager<TouchBlocker> {

    @Override
    public String getName() {
        return "TouchBlocker";
    }

    @Override
    protected TouchBlocker createViewInstance(ThemedReactContext reactContext) {
        return new TouchBlocker(reactContext);
    }

    @ReactProp(name = "blockAllTouch")
    public void setBlockAllTouch(TouchBlocker view, @Nullable boolean blockAllTouch) {
        view.setBlockAllTouch(blockAllTouch);
    }

    @ReactProp(name = "blockVerticalSwipe")
    public void setBlockVerticalSwipe(TouchBlocker view, @Nullable boolean blockVerticalSwipe) {
        view.setBlockVerticalSwipe(blockVerticalSwipe);
    }

    @ReactProp(name = "blockHorizontalSwipe")
    public void setBlockHorizontalSwipe(TouchBlocker view, @Nullable boolean blockHorizontalSwipe) {
        view.setBlockHorizontalSwipe(blockHorizontalSwipe);
    }
}
