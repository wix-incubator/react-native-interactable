package com.wix.interactable.physics;

import android.graphics.Point;
import android.graphics.PointF;
import android.util.Log;
import android.view.View;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsSpringBehavior extends PhysicsBehavior {
    public float tension = 300f;
    public PhysicsSpringBehavior(View target, PointF anchorPoint) {
        super(target, anchorPoint);
    }

    @Override
    public void executeFrameWithDeltaTime(float deltaTime, PhysicsObject physicsObject) {
        if (!isWithinInfluence()) {
            return;
        }

        float dx = this.target.getTranslationX() - this.anchorPoint.x;
        float ax = (-this.tension * dx) / physicsObject.mass;
        float vx = physicsObject.velocity.x + deltaTime * ax;

        float dy = this.target.getTranslationY() - this.anchorPoint.y;
        float ay = (-this.tension * dy) / physicsObject.mass;
        float vy = physicsObject.velocity.y + deltaTime * ay;

//        Log.d("InteractableView"," PhysicsSpringBehavior executeFrameWithDeltaTime cur Vx = " + physicsObject.velocity.x + " vx = " + vx);

        physicsObject.velocity = new PointF(vx, vy);
    }
}
