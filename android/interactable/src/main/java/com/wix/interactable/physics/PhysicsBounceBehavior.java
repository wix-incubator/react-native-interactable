package com.wix.interactable.physics;

import android.graphics.PointF;
import android.view.View;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsBounceBehavior extends PhysicsBehavior {

    private PointF minPoint;
    private PointF maxPoint;
    private float bounce = 0.5f;

    public PhysicsBounceBehavior(View target,PointF minPoint,PointF maxPoint) {
        super(target);
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
    }

    @Override
    public void executeFrameWithDeltaTime(float timeInterval, PhysicsObject physicsObject) {
        if (this.minPoint.x == this.target.getTranslationX() && physicsObject.velocity.x < 0.0)
        {
            float vx = -physicsObject.velocity.x * this.bounce;
            float vy = physicsObject.velocity.y;
            physicsObject.velocity = new PointF(vx, vy);
        }
        if (this.minPoint.y == this.target.getTranslationY() && physicsObject.velocity.y < 0.0)
        {
            float vx = physicsObject.velocity.x;
            float vy = -physicsObject.velocity.y * this.bounce;
            physicsObject.velocity = new PointF(vx, vy);
        }
        if (this.maxPoint.x == this.target.getTranslationX() && physicsObject.velocity.x > 0.0)
        {
            float vx = -physicsObject.velocity.x * this.bounce;
            float vy = physicsObject.velocity.y;
            physicsObject.velocity = new PointF(vx, vy);
        }
        if (this.maxPoint.y == this.target.getTranslationY() && physicsObject.velocity.y > 0.0)
        {
            float vx = physicsObject.velocity.x;
            float vy = -physicsObject.velocity.y * this.bounce;
            physicsObject.velocity = new PointF(vx, vy);
        }

    }


}
