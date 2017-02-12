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

    Choreographer chronographer;
    int lastFrameTime;
    ArrayList<PhysicsBehavior> behaviors;
    HashMap targetsToObjects;
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
    }

    public void removeAllBehaviors() {
        behaviors.clear();
    }

    public void animateFrameWithDeltaTime(float deltaTime) {
        for (PhysicsBehavior behavior : behaviors) {
//            behavior.
        }
    }
}
