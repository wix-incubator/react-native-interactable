package com.wix.interactable.physics;

import android.graphics.PointF;
import android.util.Log;
import android.view.View;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsFrictionBehavior extends PhysicsBehavior {

    private float friction;
    public PhysicsFrictionBehavior(View target,float friction) {
        super(target);
        this.friction = friction;
    }

    @Override
    public void executeFrameWithDeltaTime(float deltaTime, PhysicsObject physicsObject) {
        if (!isWithinInfluence()) {
            return;
        }

        float vx = (float) (Math.pow(this.friction, 60.0 * deltaTime) * physicsObject.velocity.x);
        float vy = (float) (Math.pow(this.friction, 60.0 * deltaTime) * physicsObject.velocity.y);

        Log.d("InteractableView"," PhysicsFrictionBehavior executeFrameWithDeltaTime: " + deltaTime
                + " vx = " + vx + " cur vx = " + physicsObject.velocity.x);

        physicsObject.velocity = new PointF(vx,vy);
    }
}
