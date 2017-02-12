package com.wix.interactable;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.widget.FrameLayout;

public class InteractableView extends FrameLayout {
    public InteractableView(Context context) {
        super(context);
    }

    public InteractableView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public InteractableView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public InteractableView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }


}
