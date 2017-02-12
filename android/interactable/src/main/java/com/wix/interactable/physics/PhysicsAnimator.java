package com.wix.interactable.physics;

import android.view.Choreographer;
import android.view.View;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by rotemm on 09/02/2017.
 */

public class PhysicsAnimator {

    private static int ANIMATOR_PAUSE_CONSECUTIVE_FRAMES = 10;
    private static float ANIMATOR_PAUSE_ZERO_VELOCITY = 1.0f;

    public interface PhysicsAnimatorDelegate {
        void onAnimatorPause();
    }

    public void setDelegate(PhysicsAnimatorDelegate mDelegate) {
        this.mDelegate = mDelegate;
    }

    private PhysicsAnimatorDelegate mDelegate;

    Choreographer chronographer;
    int lastFrameTime;
    ArrayList<PhysicsBehavior> behaviors;
    HashMap<View,PhysicsObject> targetsToObjects;
    int consecutiveFramesWithNoMovement;
    float screenScale;

    public PhysicsAnimator(View referenceView) {
        this.behaviors = new ArrayList<>();
        this.targetsToObjects = new HashMap();
        this.screenScale = referenceView.getContext().getResources().getDisplayMetrics().density;
        this.chronographer = Choreographer.getInstance();
    }

    public void addBehavior(PhysicsBehavior behavior) {
        behaviors.add(behavior);

        ensureTargetObjectExists(behavior.target);
    }

    public void removeAllBehaviors() {
        behaviors.clear();
    }

    private PhysicsObject ensureTargetObjectExists(View target) {
        PhysicsObject physicsObject = targetsToObjects.get(target);
        if (physicsObject == null) {
            physicsObject = new PhysicsObject();
            targetsToObjects.put(target,physicsObject);
        }
        return physicsObject;
    }

    public void animateFrameWithDeltaTime(long deltaTime) {
        for (PhysicsBehavior behavior : behaviors) {
            PhysicsObject physicsObject = targetsToObjects.get(behavior.target);
            if (physicsObject != null) {
                behavior.executeFrameWithDeltaTime(deltaTime,physicsObject);
            }
        }

        boolean hadMovement = false;
        for (View v : targetsToObjects.keySet()) {
            PhysicsObject physicsObject = targetsToObjects.get(v);

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

            v.animate().translationXBy(dx);
            v.animate().translationYBy(dy);
        }

        if (hadMovement) this.consecutiveFramesWithNoMovement = 0;
        else this.consecutiveFramesWithNoMovement++;
        if (this.consecutiveFramesWithNoMovement >= ANIMATOR_PAUSE_CONSECUTIVE_FRAMES)
        {

        }
    }


}
