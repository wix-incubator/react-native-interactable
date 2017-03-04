package com.wix.interactable.physics;

import android.graphics.PointF;
import android.util.Log;
import android.view.View;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsAnchorBehavior extends PhysicsBehavior {


    public PhysicsAnchorBehavior(View target,PointF anchorPoint) {
        super(target, anchorPoint);
    }

    @Override
    public void executeFrameWithDeltaTime(float deltaTime, PhysicsObject physicsObject) {
        if (deltaTime == 0.0) return;

//        Log.d("InteractableView"," PhysicsAnchorBehavior executeFrameWithDeltaTime: " + deltaTime);

        float dx = this.anchorPoint.x - this.target.getTranslationX();
        float vx = dx / deltaTime;

        float dy = this.anchorPoint.y - this.target.getTranslationY();
        float vy = dy / deltaTime;

        physicsObject.velocity = new PointF(vx, vy);
    }
}
