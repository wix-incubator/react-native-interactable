package com.wix.interactable;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.PointF;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.ViewGroup;

import com.wix.interactable.physics.PhysicsAnchorBehavior;
import com.wix.interactable.physics.PhysicsAnimator;
import com.wix.interactable.physics.PhysicsArea;
import com.wix.interactable.physics.PhysicsBehavior;
import com.wix.interactable.physics.PhysicsBounceBehavior;
import com.wix.interactable.physics.PhysicsFrictionBehavior;
import com.wix.interactable.physics.PhysicsGravityWellBehavior;
import com.wix.interactable.physics.PhysicsSpringBehavior;

import java.util.ArrayList;

public class InteractableView extends ViewGroup implements PhysicsAnimator.PhysicsAnimatorListener {

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

    private InteractionListener listener;


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
        initializeAnimator();
    }

    public void setEventListener(InteractionListener listener) {
        this.listener = listener;
    }

    @Override
    public void onAnimatorPause() {

    }

    @Override
    public void onAnimationFrame() {
        listener.onAnimatedEvent(getTranslationX(), getTranslationY());
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
        if (drag != null && drag.damping > 0.0)
        {
            PhysicsFrictionBehavior frictionBehavior = new PhysicsFrictionBehavior(this,drag.damping);
            this.animator.addTempBehavior(frictionBehavior);
        }

        return res;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        Log.d("InteractableView","onInterceptTouchEvent action = " + ev.getAction());
        return true;
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

//        Log.d("InteractableView","onTouchEvent action = " + event.getAction());
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                this.dragStartLocation = new PointF(event.getX(),event.getY());
                this.dragBehavior = addTempDragBehavior(this.drag);

                break;

            case MotionEvent.ACTION_MOVE:
                float newX = getTranslationX() + event.getX() - dragStartLocation.x;
                float newY = getTranslationY() + event.getY() - dragStartLocation.y;
                if (horizontalOnly) {
                    newY = 0;
                }
                if (verticalOnly) {
                    newX = 0;
                }

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
        listener.onSnap(snapTo.indexOf(snapPoint), snapPoint.id);
        addTempSnapToPointBehavior(snapPoint);
        addTempBounceBehavior(this.limitX, this.limitY);

    }

    private void addTempSnapToPointBehavior(InteractablePoint snapPoint) {
        if (snapPoint == null) {
            return;
        }
        PhysicsSpringBehavior snapBehavior = new PhysicsSpringBehavior(this,snapPoint.positionWithOrigin());
        snapBehavior.tension = snapPoint.tension;

        this.animator.addTempBehavior(snapBehavior);

        float damping = 0.7f;
        if (snapPoint.damping > 0.0) damping = snapPoint.damping;
        PhysicsFrictionBehavior frictionBehavior = new PhysicsFrictionBehavior(this,damping);
        this.animator.addTempBehavior(frictionBehavior);
        //TODO - continue here!

    }

    private void addTempBounceBehavior(InteractableLimit limitX,InteractableLimit limitY) {
        Log.d("InteractableView","addTempBounceBehavior limitX = " + limitX);
        if (limitX != null && limitX.getBounce() > 0.0)
        {
            PointF minPoint = new PointF(-Float.MAX_VALUE,-Float.MAX_VALUE);
            if (limitX.getMin() != -Float.MAX_VALUE)
                minPoint.x = limitX.getMin();
            PointF maxPoint = new PointF(Float.MAX_VALUE, Float.MAX_VALUE);
            if (limitX.getMax() != Float.MAX_VALUE)
                maxPoint.x = limitX.getMax();
            PhysicsBounceBehavior bounceBehavior = new PhysicsBounceBehavior(this,minPoint,
                    maxPoint,limitX.getBounce());
//            bounceBehavior.haptics = limitX.haptics;
            this.animator.addTempBehavior(bounceBehavior);
        }
        if (limitY != null && limitY.getBounce() > 0.0)
        {
            PointF minPoint = new PointF(-Float.MAX_VALUE,-Float.MAX_VALUE);
            if (limitY.getMin() != -Float.MAX_VALUE)
                minPoint.y = limitY.getMin();
            PointF maxPoint = new PointF(Float.MAX_VALUE, Float.MAX_VALUE);
            if (limitY.getMax() != Float.MAX_VALUE)
                maxPoint.y = limitY.getMax();
            PhysicsBounceBehavior bounceBehavior = new PhysicsBounceBehavior(this,minPoint,
                    maxPoint,limitY.getBounce());
//            bounceBehavior.haptics = limitX.haptics;
            this.animator.addTempBehavior(bounceBehavior);
        }

    }

    private void addConstantSpringBehavior(InteractablePoint point) {
        PointF anchor = new PointF(0,0);
        if (point.x != Float.MAX_VALUE) anchor.x = point.x;
        if (point.y != Float.MAX_VALUE) anchor.y = point.y;

        PhysicsSpringBehavior springBehavior = new PhysicsSpringBehavior(this,anchor);
        springBehavior.tension = point.tension;
        springBehavior.setInfluence(influenceAreaFromPoint(point));

        this.animator.addBehavior(springBehavior);

        if (point.damping > 0.0) {
            PhysicsFrictionBehavior frictionBehavior = new PhysicsFrictionBehavior(this,point.damping);
            frictionBehavior.setInfluence(influenceAreaFromPoint(point));

            this.animator.addBehavior(frictionBehavior);
        }
    }

    private void addConstantGravityBehavior(InteractablePoint point) {
        PointF anchor = new PointF(0,0);
        if (point.x != Float.MAX_VALUE) anchor.x = point.x;
        if (point.y != Float.MAX_VALUE) anchor.y = point.y;

        PhysicsGravityWellBehavior gravityBehavior = new PhysicsGravityWellBehavior(this,anchor);
        gravityBehavior.setStrength(point.strength );
        gravityBehavior.setFalloff(point.falloff );
        PhysicsArea influenceArea = influenceAreaFromPoint(point);
        gravityBehavior.setInfluence(influenceArea);

        this.animator.addBehavior(gravityBehavior);

        if (point.damping > 0.0) {
            PhysicsFrictionBehavior frictionBehavior = new PhysicsFrictionBehavior(this,point.damping);

            if (influenceArea == null) {
                frictionBehavior.setInfluence(influenceAreaWithRadius(1.4f * point.falloff,anchor));
            }
            else {
                frictionBehavior.setInfluence(influenceArea);
            }
            this.animator.addBehavior(frictionBehavior);
        }
    }

    private void addConstantFrictionBehavior(InteractablePoint point) {
        PhysicsFrictionBehavior frictionBehavior = new PhysicsFrictionBehavior(this,point.damping);
        frictionBehavior.setInfluence(influenceAreaFromPoint(point));
        this.animator.addBehavior(frictionBehavior);
    }

    private PhysicsArea influenceAreaFromPoint(InteractablePoint point)
    {
        if (point.limitX == null && point.limitY == null) return null;
        
        PointF minPoint = new PointF(-Float.MAX_VALUE, -Float.MAX_VALUE);
        PointF maxPoint = new PointF(Float.MAX_VALUE, Float.MAX_VALUE);
        if (point.limitX != null && point.limitX.getMin() != -Float.MAX_VALUE) minPoint.x = point.limitX.getMin();
        if (point.limitX != null && point.limitX.getMax() != Float.MAX_VALUE) maxPoint.x = point.limitX.getMax();
        if (point.limitY != null && point.limitY.getMin() != -Float.MAX_VALUE) minPoint.y =  point.limitY.getMin();
        if (point.limitY != null && point.limitY.getMax() != Float.MAX_VALUE) maxPoint.y = point.limitY.getMax();
        return new PhysicsArea(minPoint,maxPoint);
    }

    private PhysicsArea influenceAreaWithRadius(float radius,PointF anchor) {
        if (radius <= 0.0) return null;
        PointF minPoint = new PointF(anchor.x - radius, anchor.y - radius);
        PointF maxPoint = new PointF(anchor.y + radius, anchor.y + radius);
        return new PhysicsArea(minPoint,maxPoint);
    }

    public void setVerticalOnly(boolean verticalOnly) {
        this.verticalOnly = verticalOnly;
    }

    public void setHorizontalOnly(boolean horizontalOnly) {
        this.horizontalOnly = horizontalOnly;
    }

    public void setInitialPosition(PointF initialPosition) {
        this.initialPosition = initialPosition;
        setTranslationX(initialPosition.x);
        setTranslationY(initialPosition.y);
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

    public void setSprings(ArrayList<InteractablePoint> springs) {
        this.springs = springs;
        for (InteractablePoint point : springs) {
            addConstantSpringBehavior(point);
        }
    }

    public void setGravity(ArrayList<InteractablePoint> gravity) {
        this.gravity = gravity;
        for (InteractablePoint point : gravity) {
            addConstantGravityBehavior(point);
        }
    }

    public interface InteractionListener {
        void onSnap(int indexOfSnapPoint, String snapPointId);
        void onAnimatedEvent(float x, float y);
    }
}
