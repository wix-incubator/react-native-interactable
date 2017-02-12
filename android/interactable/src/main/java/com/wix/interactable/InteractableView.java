package com.wix.interactable;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.widget.FrameLayout;

import com.wix.interactable.physics.PhysicsAnimator;
import com.wix.interactable.physics.PhysicsBehavior;

public class InteractableView extends FrameLayout implements PhysicsAnimator.PhysicsAnimatorDelegate {

    private PhysicsAnimator mAnimator;
    private PhysicsBehavior mDragBehavior;

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


    @Override
    public void onAnimatorPause() {

    }

    private void initAnimator() {
        mAnimator = new PhysicsAnimator(this);
        mAnimator.setDelegate(this);
    }

    private PhysicsBehavior addTempDragBehavior(InteractableDrag drag) {
        PhysicsBehavior res = null;

        if (drag == null || drag.tension == Float.MAX_VALUE) {

        }

        return res;
    }
}
