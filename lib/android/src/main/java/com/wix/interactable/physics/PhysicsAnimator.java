package com.wix.interactable.physics;

import android.graphics.PointF;
import android.util.Log;
import android.view.Choreographer;
import android.view.View;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Created by rotemm on 09/02/2017.
 */

public class PhysicsAnimator implements Choreographer.FrameCallback {

    private static int ANIMATOR_PAUSE_CONSECUTIVE_FRAMES = 10;
    private static float ANIMATOR_PAUSE_ZERO_VELOCITY = 1.0f;

    @Override
    public void doFrame(long frameTimeNanos) {
//        Log.d("InteractableView","doFrame frameTimeNanos = " + frameTimeNanos + " last = " + lastFrameTS);
        if (lastFrameTS != 0) {
            float delta = (float) ((frameTimeNanos - lastFrameTS) * 1e-9);
//            Log.d("InteractableView","doFrame delta = " + delta);
            animateFrameWithDeltaTime(delta);
        }
        lastFrameTS = frameTimeNanos;
        if (isRunning) {
            this.choreographer.postFrameCallback(this);
        }
        if (animatorListener != null) {
            animatorListener.onAnimationFrame();
        }
    }

    public interface PhysicsAnimatorListener {
        void onAnimatorPause();
        void onAnimationFrame();
    }

    public void setListener(PhysicsAnimatorListener listener) {
        this.animatorListener = listener;
    }

    private PhysicsAnimatorListener animatorListener;

    Choreographer choreographer;

    ArrayList<PhysicsBehavior> behaviors;
    HashMap<View,PhysicsObject> targetsToObjects;
    int consecutiveFramesWithNoMovement;
    float screenScale;
    long lastFrameTS = 0;
    boolean isRunning = false;

    public void setDragging(boolean dragging) {
        isDragging = dragging;
    }

    boolean isDragging = false;

    public PhysicsAnimator(View referenceView) {
        this.behaviors = new ArrayList<>();
        this.targetsToObjects = new HashMap();
        this.screenScale = referenceView.getContext().getResources().getDisplayMetrics().density;
        this.choreographer = Choreographer.getInstance();
    }

    public void addBehavior(PhysicsBehavior behavior) {
        int idx = 0;
        while (behaviors.size() > idx && behaviors.get(idx).priority < behavior.priority) {
            ++idx;
        }
        behaviors.add(idx,behavior);

        ensureTargetObjectExists(behavior.target);
        ensureRunning();
    }

    public void removeBehavior(PhysicsBehavior behavior) {
        Iterator<PhysicsBehavior> iterator = behaviors.iterator();

        while (iterator.hasNext()) {
            if (iterator.next() == behavior) {
                iterator.remove();
                break;
            }
        }
    }

    public void addTempBehavior(PhysicsBehavior behavior) {
        behavior.isTemp = true;
        addBehavior(behavior);
    }


    public void removeAllBehaviors() {
        behaviors.clear();
        targetsToObjects.clear();
    }

    public void removeTempBehaviors() {
        Iterator<PhysicsBehavior> iterator = behaviors.iterator();

        while (iterator.hasNext()) {
            if (iterator.next().isTemp) {
                iterator.remove();
            }
        }
//        targetsToObjects.clear();
    }

    private PhysicsObject ensureTargetObjectExists(View target) {
        PhysicsObject physicsObject = targetsToObjects.get(target);
        if (physicsObject == null) {
            physicsObject = new PhysicsObject();
            targetsToObjects.put(target,physicsObject);
        }
        return physicsObject;
    }
    
    public void setTargetVelocity(View target, PointF velocity) {
        PhysicsObject physicsObject = ensureTargetObjectExists(target);
        physicsObject.velocity = velocity;
        ensureRunning();
    }

    private void ensureRunning(){
        if (!isRunning) {
            isRunning = true;
            lastFrameTS = 0;
            this.consecutiveFramesWithNoMovement = 0;
            this.choreographer.postFrameCallback(this);
        }
    }

    public PointF getTargetVelocity(View target) {
        PhysicsObject physicsObject = targetsToObjects.get(target);
        if (physicsObject != null) {
            return physicsObject.velocity;
        }
        return new PointF(0,0);
    }

    public void stopRunning() {
        removeTempBehaviors();
        isRunning = false;

        this.choreographer.removeFrameCallback(this);
    }

    public void animateFrameWithDeltaTime(float deltaTime) {
        for (PhysicsBehavior behavior : behaviors) {
            PhysicsObject physicsObject = targetsToObjects.get(behavior.target);
            if (physicsObject != null) {
                behavior.executeFrameWithDeltaTime(deltaTime,physicsObject);
//                Log.d("InteractableView"," animateFrameWithDeltaTime doing behavior " + " vx = " + physicsObject.velocity.x);
            }
        }

        boolean hadMovement = false;
        for (View v : targetsToObjects.keySet()) {
            PhysicsObject physicsObject = targetsToObjects.get(v);
//            Log.d("InteractableView"," animateFrameWithDeltaTime " + deltaTime + " vx = " + physicsObject.velocity.x);
            float dx = 0f;
            if (Math.abs(physicsObject.velocity.x) > ANIMATOR_PAUSE_ZERO_VELOCITY) {
                dx = deltaTime * physicsObject.velocity.x;
                hadMovement = true;
            }
            float dy = 0f;
            if (Math.abs(physicsObject.velocity.y) > ANIMATOR_PAUSE_ZERO_VELOCITY) {
                dy = deltaTime * physicsObject.velocity.y;
                hadMovement = true;
            }

//            Log.d("InteractableView"," animateFrameWithDeltaTime " + deltaTime + " dx = " + dx);

            v.animate().translationXBy(dx).translationYBy(dy).setDuration(0).start();
        }

        if (hadMovement) this.consecutiveFramesWithNoMovement = 0;
        else this.consecutiveFramesWithNoMovement++;
        if (this.consecutiveFramesWithNoMovement >= ANIMATOR_PAUSE_CONSECUTIVE_FRAMES && !isDragging)
        {
            stopRunning();
            if (animatorListener != null) {
                animatorListener.onAnimatorPause();
            }
        }
    }


}
