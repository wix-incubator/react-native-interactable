package com.wix.interactable.physics;

import android.graphics.PointF;
import android.util.Log;
import android.view.View;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsBounceBehavior extends PhysicsBehavior {

    private PointF minPoint;
    private PointF maxPoint;
    private float bounce = 0.5f;
    private boolean heptics;

    public PhysicsBounceBehavior(View target,PointF minPoint,PointF maxPoint,float bounce, boolean heptics) {
        super(target);
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
        this.bounce = bounce;
        this.heptics = heptics;
    }

    @Override
    public void executeFrameWithDeltaTime(float timeInterval, PhysicsObject physicsObject) {
        Log.d("InteractableView"," PhysicsBounceBehavior executeFrameWithDeltaTime: " + timeInterval + " minX = " + minPoint.x);
        if (this.minPoint.x == this.target.getTranslationX() && physicsObject.velocity.x < 0.0)
        {
            float vx = -physicsObject.velocity.x * this.bounce;
            float vy = physicsObject.velocity.y;
            physicsObject.velocity = new PointF(vx, vy);

            doHaptic();
        }
        if (this.minPoint.y == this.target.getTranslationY() && physicsObject.velocity.y < 0.0)
        {
            float vx = physicsObject.velocity.x;
            float vy = -physicsObject.velocity.y * this.bounce;
            physicsObject.velocity = new PointF(vx, vy);
            doHaptic();
        }
        if (this.maxPoint.x == this.target.getTranslationX() && physicsObject.velocity.x > 0.0)
        {
            float vx = -physicsObject.velocity.x * this.bounce;
            float vy = physicsObject.velocity.y;
            physicsObject.velocity = new PointF(vx, vy);
            doHaptic();
        }
        if (this.maxPoint.y == this.target.getTranslationY() && physicsObject.velocity.y > 0.0)
        {
            float vx = physicsObject.velocity.x;
            float vy = -physicsObject.velocity.y * this.bounce;
            physicsObject.velocity = new PointF(vx, vy);
            doHaptic();
        }

    }


}
