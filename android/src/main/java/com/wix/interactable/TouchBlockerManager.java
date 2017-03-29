package com.wix.interactable;

import android.view.View;

import com.facebook.react.uimanager.ReactShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManager;
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
}
