package com.wix.interactable;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.PointF;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.ViewGroup;

import com.facebook.react.ReactRootView;
import com.wix.interactable.physics.PhysicsAnchorBehavior;
import com.wix.interactable.physics.PhysicsAnimator;
import com.wix.interactable.physics.PhysicsArea;
import com.wix.interactable.physics.PhysicsBehavior;
import com.wix.interactable.physics.PhysicsBounceBehavior;
import com.wix.interactable.physics.PhysicsFrictionBehavior;
import com.wix.interactable.physics.PhysicsGravityWellBehavior;
import com.wix.interactable.physics.PhysicsSpringBehavior;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import static com.facebook.react.uimanager.TouchTargetHelper.findTargetTagForTouch;


public class InteractableView extends ViewGroup implements PhysicsAnimator.PhysicsAnimatorListener {


    private PhysicsAnimator animator;
    private PhysicsBehavior dragBehavior;

    private PointF dragStartLocation;
    private PointF dragLastLocation;
    private boolean initialPositionSet;

    private boolean verticalOnly;
    private boolean horizontalOnly;
    private boolean dragEnabled;
    private boolean isSwiping;
    private PointF initialPosition;

    private InteractableArea boundaries;
    private PhysicsBounceBehavior oldBoundariesBehavior;

    private InteractableSpring dragWithSpring;
    private float dragToss;
    private PointF velocity;
    private boolean reportOnAnimatedEvents;

    private ArrayList<InteractablePoint> snapPoints = new ArrayList<>();
    private ArrayList<InteractablePoint> springPoints = new ArrayList<>();
    private ArrayList<InteractablePoint> gravityPoints = new ArrayList<>();
    private ArrayList<InteractablePoint> frictionAreas = new ArrayList<>();
    private ArrayList<InteractablePoint> alertAreas = new ArrayList<>();
    private Set<String> insideAlertAreas = new HashSet<>();

    private InteractionListener listener;

    private int mTouchSlop;
    private boolean isChildIsScrollContainer = false;
    private boolean skippedOneInterception;


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
        initialPositionSet = false;
        dragEnabled = true;
        initializeAnimator();
        ViewConfiguration vc = ViewConfiguration.get(getContext());
        mTouchSlop = vc.getScaledTouchSlop();
    }

    public void setEventListener(InteractionListener listener) {
        this.listener = listener;
    }

    @Override
    public void onAnimatorPause() {
        PointF currentPosition = getCurrentPosition();
        listener.onStop(currentPosition.x, currentPosition.y);
    }

    @Override
    public void onAnimationFrame() {
        PointF currentPosition = getCurrentPosition();
        if(reportOnAnimatedEvents) {
            listener.onAnimatedEvent(currentPosition.x, currentPosition.y);
        }
        reportAlertEvent(currentPosition);
    }

    private void reportAlertEvent(PointF position) {
        for (InteractablePoint area : alertAreas) {
            if (area.influenceArea != null && area.id != null) {
                if (area.influenceArea.pointInside(position)) {
                    if (!insideAlertAreas.contains(area.id)) {
                        listener.onAlert(area.id, "enter");
                        insideAlertAreas.add(area.id);
                    }
                } else {
                    if(insideAlertAreas.contains(area.id)) {
                        listener.onAlert(area.id, "leave");
                        insideAlertAreas.remove(area.id);
                    }
                }
            }
        }
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

    private void resetTouchEventFlags() {
        this.isSwiping = false;
        this.isChildIsScrollContainer = false;
        this.skippedOneInterception=false;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {

        final int actionMasked = ev.getAction() & MotionEvent.ACTION_MASK;

        // initiate the dragStartLocation and flags
        if (actionMasked == MotionEvent.ACTION_DOWN) {
            this.dragStartLocation = new PointF(ev.getX(),ev.getY());
            resetTouchEventFlags();

            // detect whether we targeted scrollable child, if so we will not intercapte the touch
            int targetChildTag = findTargetTagForTouch(ev.getX(),ev.getY(),this);
            View targetChild = (View)findViewById(targetChildTag);
            if(targetChild!=null && targetChild.isScrollContainer()){
                isChildIsScrollContainer = true;
            }
        }

        if (actionMasked == MotionEvent.ACTION_MOVE) {

/*         if (isSwiping || ev.getPointerCount() > 1) {
                return false;
            }*/

            float delX = ev.getX() - dragStartLocation.x;
            float delY = ev.getY() - dragStartLocation.y;
            boolean isHSwipe = Math.abs(delX) > mTouchSlop;
            boolean isVSwipe = Math.abs(delY) > mTouchSlop;

            this.isSwiping = this.isSwiping || isHSwipe || isVSwipe;

           if (!isChildIsScrollContainer && dragEnabled && (horizontalOnly && isHSwipe ||
                    verticalOnly && isVSwipe ||
                    !horizontalOnly && !verticalOnly)) {

               // we are giving opportunity intercept the action to the ChildrenViews
               if(!skippedOneInterception){
                   skippedOneInterception=true;
               }
               else{
                   startDrag(ev);
                   return true;
               }
            }
        }
        return super.onInterceptTouchEvent(ev);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

    }


    @Override
    public boolean shouldDelayChildPressedState() {
        return false;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        handleTouch(event);
        getParent().requestDisallowInterceptTouchEvent(true);
        return true;
    }

    private void handleTouch(MotionEvent event) {
        Log.d("InteractableView","handleTouch action = " + event.getAction());
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                // for case when there are non-touchable children views
                if(dragEnabled){
                    startDrag(event);
                }
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
                if(this.dragBehavior!=null){
                    this.dragBehavior.setAnchorPoint(new PointF(newX,newY));
                }
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                handleEndOfDrag();
                break;

        }
        this.dragLastLocation = new PointF(event.getX(),event.getY());
    }

    private ReactRootView getReactRoot() {
        View v = this;
        while (v.getParent() != null) {
            if (v instanceof ReactRootView) {
                Log.d("InteractableView","has root");
                return (ReactRootView) v;
            }
            v = (View) v.getParent();
        }
        Log.d("InteractableView","no root");
        return null;
    }

    private void startDrag(MotionEvent ev) {
        PointF currentPosition = getCurrentPosition();
        listener.onDrag("start",currentPosition.x, currentPosition.y, "");
        this.dragStartLocation = new PointF(ev.getX(),ev.getY());
        this.animator.removeTempBehaviors();
        this.animator.setDragging(true);
        this.dragBehavior = addTempDragBehavior(this.dragWithSpring);
        try {
            getReactRoot().onChildStartedNativeGesture(ev);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void handleEndOfDrag() {
        this.animator.removeTempBehaviors();

        this.animator.setDragging(false);

        PointF velocity = this.animator.getTargetVelocity(this);
        if (this.horizontalOnly) velocity.y = 0;
        if (this.verticalOnly) velocity.x = 0;

        PointF currentPosition = getCurrentPosition();

        float toss = this.dragToss;
        PointF projectedCenter = new PointF(getTranslationX() + toss*velocity.x,
                getTranslationY() + toss*velocity.y);

        InteractablePoint snapPoint = InteractablePoint.findClosestPoint(snapPoints,projectedCenter);
        String targetSnapPointId = "";
        if (snapPoint != null && snapPoint.id != null) {
            targetSnapPointId = snapPoint.id;
        }

        if (this.dragBehavior != null) {
            listener.onDrag("end",currentPosition.x, currentPosition.y, targetSnapPointId);
        }
        this.dragBehavior = null;

        addTempSnapToPointBehavior(snapPoint);
        addTempBounceBehaviorWithBoundaries(this.boundaries);
    }

    private void addTempSnapToPointBehavior(InteractablePoint snapPoint) {
        if (snapPoint == null) {
            return;
        }
        listener.onSnap(snapPoints.indexOf(snapPoint), snapPoint.id);
        listener.onSnapStart(snapPoints.indexOf(snapPoint), snapPoint.id);
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
//        Log.d("InteractableView","addTempBounceBehaviorWithBoundaries influenceArea = " + boundaries);
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
//        Log.d("InteractableView","addTempBounceBehaviorWithBoundaries influenceArea = " + boundaries);
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
            this.oldBoundariesBehavior = bounceBehavior;
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
//        Log.d("InteractableView","influenceAreaWithRadius minPoint = " + minPoint + " maxPoint = " + maxPoint);
        return new PhysicsArea(minPoint,maxPoint);
    }

    public void setVerticalOnly(boolean verticalOnly) {
        this.verticalOnly = verticalOnly;
    }

    public void setHorizontalOnly(boolean horizontalOnly) {
        this.horizontalOnly = horizontalOnly;
    }

    public void setDragEnabled(boolean dragEnabled) {
        this.dragEnabled = dragEnabled;

        if (this.dragBehavior != null && !dragEnabled) {
            handleEndOfDrag();
        }
    }

    public void setInitialPosition(PointF initialPosition) {
        this.initialPosition = initialPosition;
        setTranslationX(initialPosition.x);
        setTranslationY(initialPosition.y);
    }

    public void setBoundaries(InteractableArea boundaries) {
        this.boundaries = boundaries;
        animator.removeBehavior(this.oldBoundariesBehavior);
        addConstantBoundaries(boundaries);
    }


    public void setDragWithSpring(InteractableSpring dragWithSpring) {
        this.dragWithSpring = dragWithSpring;
    }

    public void setDragToss(float dragToss) {
        this.dragToss = dragToss;
    }

    public void setReportOnAnimatedEvents(boolean reportOnAnimatedEvents) {this.reportOnAnimatedEvents = reportOnAnimatedEvents; }

    public void setSnapPoints(ArrayList snapPoints) {
        this.snapPoints = snapPoints;
    }

    public void setAlertAreas(ArrayList<InteractablePoint> alertAreas) {
        this.alertAreas = alertAreas;
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
//            Log.d("InteractableView","setGravityPoints strength = " + point.strength);
//            Log.d("InteractableView","setGravityPoints damping = " + point.damping);

            addConstantGravityBehavior(point);
        }
    }

    public void setFrictionAreas(ArrayList<InteractablePoint> frictionAreas) {
        this.frictionAreas = frictionAreas;
        for (InteractablePoint point : frictionAreas) {
//            Log.d("InteractableView","setFrictionAreas damping = " + point.damping);
            addConstantFrictionBehavior(point);
        }
    }


    public void setVelocity(PointF velocity) {
        if(this.dragBehavior != null) return;
        this.velocity = velocity;
        this.animator.setTargetVelocity(this,this.velocity);
        handleEndOfDrag();
    }

    public void snapTo(int index) {

        if(this.snapPoints != null && index >= 0 && index < this.snapPoints.size())
        {
            this.animator.removeTempBehaviors();
            this.dragBehavior = null;
            InteractablePoint snapPoint = snapPoints.get(index);
            addTempSnapToPointBehavior(snapPoint);
            addTempBounceBehaviorWithBoundaries(this.boundaries);
        }
    }

    public void changePosition(PointF position) {
        if(this.dragBehavior != null) return;
        setTranslationX(position.x);
        setTranslationY(position.y);
        handleEndOfDrag();
    }


    public interface InteractionListener {
        void onSnap(int indexOfSnapPoint, String snapPointId);
        void onSnapStart(int indexOfSnapPoint, String snapPointId);
        void onAlert(String alertAreaId, String alertType);
        void onAnimatedEvent(float x, float y);
        void onDrag(String state, float x, float y, String targetSnapPointId);
        void onStop(float x, float y);
    }
}
