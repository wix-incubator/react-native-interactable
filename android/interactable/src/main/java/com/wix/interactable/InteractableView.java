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
    private PointF dragLastLocation;
    private boolean initialPositionSet;

    private boolean verticalOnly;
    private boolean horizontalOnly;
    private PointF initialPosition;

    private InteractableArea boundaries;
    private InteractableSpring dragWithSprings;
    private float dragToss;
    private ArrayList<InteractablePoint> snapPoints = new ArrayList<>();
    private ArrayList<InteractablePoint> springPoints = new ArrayList<>();
    private ArrayList<InteractablePoint> gravityPoints = new ArrayList<>();

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

    private PhysicsBehavior addTempDragBehavior(InteractableSpring drag) {
        PhysicsBehavior res = null;

        if (drag == null || drag.tension == Float.MAX_VALUE) {
            PhysicsAnchorBehavior anchorBehavior = new PhysicsAnchorBehavior(this, getCurrentPosition());
            res = anchorBehavior;
            this.animator.addTempBehavior(anchorBehavior);
        }
        else {
            PhysicsSpringBehavior springBehavior = new PhysicsSpringBehavior(this, getCurrentPosition());
            springBehavior.tension = drag.tension;
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
                this.animator.removeTempBehaviors();
                this.animator.setDragging(true);
                this.dragStartLocation = new PointF(event.getX(),event.getY());
                this.dragBehavior = addTempDragBehavior(this.dragWithSprings);


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
//                float dx = event.getX() - dragLastLocation.x;
//                float dy = event.getY() - dragLastLocation.y;
//                if (horizontalOnly) {
//                    dy = 0;
//                }
//                if (verticalOnly) {
//                    dx = 0;
//                }
//
//                this.dragBehavior.moveAnchorPoint(dx,dy);

                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                handleEndOfDrag();
                break;

        }
        this.dragLastLocation = new PointF(event.getX(),event.getY());

        return true;
    }

    private void handleEndOfDrag() {
        this.animator.removeTempBehaviors();
        this.animator.setDragging(false);

        PointF velocity = this.animator.getTargetVelocity(this);
        if (this.horizontalOnly) velocity.y = 0;
        if (this.verticalOnly) velocity.x = 0;
        float toss = 0.1f;
        if (this.dragWithSprings != null) toss = this.dragWithSprings.toss;

        Log.d("InteractableView","handleEndOfDrag velocity = " + velocity);

        PointF projectedCenter = new PointF(getTranslationX() + toss*velocity.x,
                                            getTranslationY() + toss*velocity.y);

        InteractablePoint snapPoint = InteractablePoint.findClosestPoint(snapPoints,projectedCenter);

        addTempSnapToPointBehavior(snapPoint);
        addTempBounceBehaviorWithBoundaries(this.boundaries);

    }

    private void addTempSnapToPointBehavior(InteractablePoint snapPoint) {
        if (snapPoint == null) {
            return;
        }
        listener.onSnap(snapPoints.indexOf(snapPoint), snapPoint.id);
        PhysicsSpringBehavior snapBehavior = new PhysicsSpringBehavior(this,snapPoint.positionWithOrigin());
        snapBehavior.tension = snapPoint.tension;

        this.animator.addTempBehavior(snapBehavior);

        float damping = 0.7f;
        if (snapPoint.damping > 0.0) damping = snapPoint.damping;
        PhysicsFrictionBehavior frictionBehavior = new PhysicsFrictionBehavior(this,damping);
        this.animator.addTempBehavior(frictionBehavior);
        //TODO - continue here!

    }

    private void addTempBounceBehaviorWithBoundaries(InteractableArea boundaries) {
        Log.d("InteractableView","addTempBounceBehaviorWithBoundaries influenceArea = " + boundaries);
//        if (boundaries != null && boundaries.getBounce() > 0.0)
        if (boundaries != null)
        {
            PointF minPoint = new PointF(-Float.MAX_VALUE,-Float.MAX_VALUE);
            if (boundaries.getLeft() != -Float.MAX_VALUE) minPoint.x = boundaries.getLeft();
            if (boundaries.getTop() != -Float.MAX_VALUE) minPoint.y = boundaries.getTop();

            PointF maxPoint = new PointF(Float.MAX_VALUE, Float.MAX_VALUE);
            if (boundaries.getRight() != Float.MAX_VALUE) maxPoint.x = boundaries.getRight();
            if (boundaries.getBottom() != Float.MAX_VALUE) maxPoint.y = boundaries.getBottom();

            PhysicsBounceBehavior bounceBehavior = new PhysicsBounceBehavior(this,minPoint, maxPoint, boundaries.getBounce(), boundaries.isHaptic());
            this.animator.addTempBehavior(bounceBehavior);
//            this.animator.addBehavior(bounceBehavior);
        }
    }
    private void addConstantBoundaries(InteractableArea boundaries) {
        Log.d("InteractableView","addTempBounceBehaviorWithBoundaries influenceArea = " + boundaries);
//        if (boundaries != null && boundaries.getBounce() > 0.0)
        if (boundaries != null)
        {
            PointF minPoint = new PointF(-Float.MAX_VALUE,-Float.MAX_VALUE);
            if (boundaries.getLeft() != -Float.MAX_VALUE) minPoint.x = boundaries.getLeft();
            if (boundaries.getTop() != -Float.MAX_VALUE) minPoint.y = boundaries.getTop();

            PointF maxPoint = new PointF(Float.MAX_VALUE, Float.MAX_VALUE);
            if (boundaries.getRight() != Float.MAX_VALUE) maxPoint.x = boundaries.getRight();
            if (boundaries.getBottom() != Float.MAX_VALUE) maxPoint.y = boundaries.getBottom();

            PhysicsBounceBehavior bounceBehavior = new PhysicsBounceBehavior(this,minPoint, maxPoint,0, boundaries.isHaptic());

            this.animator.addBehavior(bounceBehavior);
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
        gravityBehavior.setStrength(point.strength);
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
        if (point.influenceArea == null) return null;
        
        PointF minPoint = new PointF(-Float.MAX_VALUE, -Float.MAX_VALUE);
        PointF maxPoint = new PointF(Float.MAX_VALUE, Float.MAX_VALUE);

        if (point.influenceArea.getLeft() != -Float.MAX_VALUE) minPoint.x = point.influenceArea.getLeft();
        if (point.influenceArea.getRight() != Float.MAX_VALUE) maxPoint.x = point.influenceArea.getRight();
        if (point.influenceArea.getTop() != -Float.MAX_VALUE) minPoint.y = point.influenceArea.getTop();
        if (point.influenceArea.getBottom() != Float.MAX_VALUE) maxPoint.y = point.influenceArea.getBottom();

        return new PhysicsArea(minPoint,maxPoint);
    }

    private PhysicsArea influenceAreaWithRadius(float radius,PointF anchor) {
        if (radius <= 0.0) return null;
        PointF minPoint = new PointF(anchor.x - radius, anchor.y - radius);
        PointF maxPoint = new PointF(anchor.x + radius, anchor.y + radius);
        Log.d("InteractableView","influenceAreaWithRadius minPoint = " + minPoint + " maxPoint = " + maxPoint);
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

    public void setBoundaries(InteractableArea boundaries) {
        this.boundaries = boundaries;
        addConstantBoundaries(boundaries);
    }


    public void setDragWithSprings(InteractableSpring dragWithSprings) {
        this.dragWithSprings = dragWithSprings;
    }

    public void setDragToss(float dragToss) {
        this.dragToss = dragToss;
    }
    
    public void setSnapPoints(ArrayList snapPoints) {
        this.snapPoints = snapPoints;
    }

    public void setSpringsPoints(ArrayList<InteractablePoint> springPoints) {
        this.springPoints = springPoints;
        for (InteractablePoint point : springPoints) {
            addConstantSpringBehavior(point);
        }
    }

    public void setGravityPoints(ArrayList<InteractablePoint> gravityPoints) {
        this.gravityPoints = gravityPoints;
        for (InteractablePoint point : gravityPoints) {
            Log.d("InteractableView","setGravityPoints strength = " + point.strength);
            Log.d("InteractableView","setGravityPoints damping = " + point.damping);

            addConstantGravityBehavior(point);
        }
    }

    public void setFrictionAreas(ArrayList<InteractablePoint> frictionAreas) {
        this.gravityPoints = gravityPoints;
        for (InteractablePoint point : frictionAreas) {
            Log.d("InteractableView","setFrictionAreas damping = " + point.damping);
            addConstantFrictionBehavior(point);
        }
    }

    public interface InteractionListener {
        void onSnap(int indexOfSnapPoint, String snapPointId);
        void onAnimatedEvent(float x, float y);
    }
}
