package com.wix.interactable.physics;

import android.graphics.PointF;
import android.view.View;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsGravityWellBehavior extends PhysicsBehavior {

    public void setStrength(float strength) {
        this.strength = strength;
    }

    public void setFalloff(float falloff) {
        this.falloff = falloff;
    }

    private float strength = 400f;
    private float falloff = 40f;

    public PhysicsGravityWellBehavior(View target, PointF anchorPoint) {
        super(target, anchorPoint);
    }

    @Override
    public void executeFrameWithDeltaTime(float deltaTime, PhysicsObject physicsObject) {
        if (!isWithinInfluence()) {
            return;
        }

        float dx = this.target.getTranslationX() - this.anchorPoint.x;
        float dy = this.target.getTranslationY() - this.anchorPoint.y;
        double dr = Math.sqrt(dx*dx + dy*dy);
        if (dr == 0.0) return;

        double a = (-this.strength * dr * Math.exp(-0.5f * (dr * dr) / (this.falloff * this.falloff))) / physicsObject.mass;

        double ax = dx / dr * a;
        float vx = (float) (physicsObject.velocity.x + deltaTime * ax);


        double ay = dy / dr * a;
        float vy = (float) (physicsObject.velocity.y + deltaTime * ay);

//        Log.d("InteractableView"," PhysicsGravityWellBehavior executeFrameWithDeltaTime: " + deltaTime
//                + " vx = " + vx + " cur vx = " + physicsObject.velocity.x);

        physicsObject.velocity = new PointF(vx, vy);
    }
}
