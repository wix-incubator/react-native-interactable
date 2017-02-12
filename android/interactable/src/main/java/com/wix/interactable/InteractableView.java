package com.wix.interactable;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.PointF;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.widget.FrameLayout;

import com.wix.interactable.physics.PhysicsAnchorBehavior;
import com.wix.interactable.physics.PhysicsAnimator;
import com.wix.interactable.physics.PhysicsBehavior;
import com.wix.interactable.physics.PhysicsSpringBehavior;

import java.util.ArrayList;

public class InteractableView extends FrameLayout implements PhysicsAnimator.PhysicsAnimatorListener {

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
        Log.d("InteractableView","init!!!");
        originSet = false;
        initialPositionSet = false;
        initializeAnimator();

    }

    @Override
    public void onAnimatorPause() {

    }

    private void initializeAnimator() {
        animator = new PhysicsAnimator(this);
        animator.setListener(this);
    }

    private PointF getCurrentPosition() {
        return new PointF(getTranslationX(),getTranslationY());
    }

    private PhysicsBehavior addTempDragBehavior(InteractableDrag drag) {
        PhysicsBehavior res = null;

        if (drag == null || drag.tension == Float.MAX_VALUE) {
            PhysicsAnchorBehavior anchorBehavior = new PhysicsAnchorBehavior(this, getCurrentPosition());
            res = anchorBehavior;
            this.animator.addTempBehavior(anchorBehavior);
        }
        else {
            PhysicsSpringBehavior springBehavior = new PhysicsSpringBehavior(this, getCurrentPosition());
            res = springBehavior;
            this.animator.addTempBehavior(springBehavior);
        }

        return res;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        Log.d("InteractableView","onInterceptTouchEvent action = " + ev.getAction());
        return true;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

        Log.d("InteractableView","onTouchEvent action = " + event.getAction());
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                this.dragStartLocation = new PointF(event.getX(),event.getY());
                this.dragBehavior = addTempDragBehavior(this.drag);

                break;

            case MotionEvent.ACTION_MOVE:
                float newX = getTranslationX() + event.getX() - dragStartLocation.x;
                float newY = getTranslationY() + event.getY() - dragStartLocation.y;
                this.dragBehavior.setAnchorPoint(new PointF(newX,newY));

                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                handleEndOfDrag();
                break;

        }

        return true;
    }

    private void handleEndOfDrag() {
        this.animator.removeTempBehaviors();

        PointF velocity = this.animator.getTargetVelocity(this);
        if (this.horizontalOnly) velocity.y = 0;
        if (this.verticalOnly) velocity.x = 0;
        float toss = 0.1f;
        if (this.drag != null) toss = this.drag.toss;

        PointF projectedCenter = new PointF(getTranslationX() + toss*velocity.x,
                                            getTranslationY() + toss*velocity.y);

        InteractablePoint snapPoint = InteractablePoint.findClosestPoint(snapTo,projectedCenter);

    }

    private void addTempSnapToPointBehavior(InteractablePoint snapPoint) {
        PhysicsSpringBehavior snapBehavior = new PhysicsSpringBehavior(this,snapPoint.positionWithOrigin());
        snapBehavior.tension = snapPoint.tension;
        //TODO - continue here!

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
