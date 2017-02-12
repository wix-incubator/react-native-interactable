package com.wix.interactable;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.PointF;
import android.os.Build;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.FrameLayout;

import com.wix.interactable.physics.PhysicsAnchorBehavior;
import com.wix.interactable.physics.PhysicsAnimator;
import com.wix.interactable.physics.PhysicsBehavior;
import com.wix.interactable.physics.PhysicsSpringBehavior;

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

    private PointF getTransPoint() {
        return new PointF(getTranslationX(),getTranslationY());
    }

    private PhysicsBehavior addTempDragBehavior(InteractableDrag drag) {
        PhysicsBehavior res = null;

        if (drag == null || drag.tension == Float.MAX_VALUE) {
            PhysicsAnchorBehavior anchorBehavior = new PhysicsAnchorBehavior(this,getTransPoint());
            res = anchorBehavior;
            this.mAnimator.addBehavior(anchorBehavior);
        }
        else {
            PhysicsSpringBehavior springBehavior = new PhysicsSpringBehavior(this,getTransPoint());
            res = springBehavior;
            this.mAnimator.addBehavior(springBehavior);
        }

        return res;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN :
                break;

        }

        return super.onTouchEvent(event);
    }
}
