package com.wix.interactable.physics;

import android.graphics.PointF;
import android.util.Log;
import android.view.View;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsBounceBehavior extends PhysicsBehavior {

    public interface BounceListener {
        void onBounceLimitTop(float vy);
    }

    public void setBounceListener(BounceListener listener) {
        this.listener = listener;
    }

    private BounceListener listener;

    private PointF minPoint;
    private PointF maxPoint;
    private float bounce = 0.5f;

    public PhysicsBounceBehavior(View target, PointF minPoint, PointF maxPoint,float bounce, boolean haptics) {
        super(target, haptics);
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
        this.bounce = bounce;
        this.priority = 3;
    }

    @Override
    public void executeFrameWithDeltaTime(float timeInterval, PhysicsObject physicsObject) {
        Log.d("InteractableView"," PhysicsBounceBehavior executeFrameWithDeltaTime: " + timeInterval + " minY = " + minPoint.y);
        applyLimits();
        if (this.minPoint.x == this.target.getTranslationX() && physicsObject.velocity.x < 0.0)
        {
            float vx = -physicsObject.velocity.x * this.bounce;
            float vy = physicsObject.velocity.y;
            physicsObject.velocity = new PointF(vx, vy);
            doHaptic();
        }
        if (this.minPoint.y == this.target.getTranslationY() && physicsObject.velocity.y < 0.0)
        {
            Log.d("InteractableView"," PhysicsBounceBehavior applying top limit ");
            if (listener != null) {
                listener.onBounceLimitTop(physicsObject.velocity.y);
            }
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

    private void applyLimits() {
        if (this.minPoint.x > this.target.getTranslationX()) {
            this.target.setTranslationX(this.minPoint.x);
        }
        if (this.minPoint.y > this.target.getTranslationY()) {
            this.target.setTranslationY(this.minPoint.y);
        }
        if (this.maxPoint.x < this.target.getTranslationX()) {
            this.target.setTranslationX(this.maxPoint.x);
        }
        if (this.maxPoint.y < this.target.getTranslationY()) {
            this.target.setTranslationY(this.maxPoint.y);
        }
    }


}
