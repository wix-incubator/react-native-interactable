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

import java.util.ArrayList;

public class InteractableView extends FrameLayout implements PhysicsAnimator.PhysicsAnimatorDelegate {

    private boolean originSet;
    private PointF origin;
    private PhysicsAnimator animator;
    private PhysicsBehavior dragBehavior;

    private PointF dragStartCenter;
    private PointF dragStartLocation;
    private boolean initialPositionSet;

    private boolean verticalOnly;
    private boolean horizontalOnly;
    private PointF initialPosition;

    private InteractableLimit limitX;
    private InteractableLimit limitY;
    private InteractableDrag drag;
    private ArrayList<InteractablePoint> snapTo;
    private ArrayList<InteractablePoint> springs;
    private ArrayList<InteractablePoint> gravity;


    public InteractableView(Context context) {
        super(context);
        init();
    }

    public InteractableView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public InteractableView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public InteractableView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init();
    }

    private void init() {
        originSet = false;
        initialPositionSet = false;

    }

    @Override
    public void onAnimatorPause() {

    }

    private void initializeAnimator() {
        animator = new PhysicsAnimator(this);
        animator.setDelegate(this);
    }

    private PointF getTransPoint() {
        return new PointF(getTranslationX(),getTranslationY());
    }

    private PhysicsBehavior addTempDragBehavior(InteractableDrag drag) {
        PhysicsBehavior res = null;

        if (drag == null || drag.tension == Float.MAX_VALUE) {
            PhysicsAnchorBehavior anchorBehavior = new PhysicsAnchorBehavior(this,getTransPoint());
            res = anchorBehavior;
            this.animator.addBehavior(anchorBehavior);
        }
        else {
            PhysicsSpringBehavior springBehavior = new PhysicsSpringBehavior(this,getTransPoint());
            res = springBehavior;
            this.animator.addBehavior(springBehavior);
        }

        return res;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                break;

        }

        return super.onTouchEvent(event);
    }

    public void setVerticalOnly(boolean verticalOnly) {
        this.verticalOnly = verticalOnly;
    }

    public void setHorizontalOnly(boolean horizontalOnly) {
        this.horizontalOnly = horizontalOnly;
    }

    public void setInitialPosition(PointF initialPosition) {
        this.initialPosition = initialPosition;
    }

    public void setLimitX(InteractableLimit limitX) {
        this.limitX = limitX;
    }

    public void setLimitY(InteractableLimit limitY) {
        this.limitY = limitY;
    }

    public void setDrag(InteractableDrag drag) {
        this.drag = drag;
    }
    
    public void setSnapTo(ArrayList snapTo) {
        this.snapTo = snapTo;
    }

    public void setSprings(ArrayList springs) {
        this.springs = springs;
    }

    public void setGravity(ArrayList gravity) {
        this.gravity = gravity;
    }
}
