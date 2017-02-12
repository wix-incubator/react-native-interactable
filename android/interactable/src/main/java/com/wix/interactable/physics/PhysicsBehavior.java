package com.wix.interactable.physics;

import android.graphics.Point;
import android.graphics.PointF;
import android.view.View;

/**
 * Created by rotemm on 09/02/2017.
 */

public abstract class PhysicsBehavior {
    View target;

    PointF anchorPoint;

    private PhysicsArea influence;

    public PhysicsBehavior(View target) {
        this.target = target;
    }
    public PhysicsBehavior(View target,PointF anchorPoint) {
        this(target);
        this.anchorPoint = anchorPoint;
    }


    public abstract void executeFrameWithDeltaTime(float timeInterval,PhysicsObject physicsObject);

    public boolean isWithinInfluence() {
        if (target.getTranslationX() < influence.minPoint.x) return false;
        if (target.getTranslationX() > influence.maxPoint.x) return false;

        if (target.getTranslationY() < influence.minPoint.y) return false;
        if (target.getTranslationY() > influence.maxPoint.y) return false;
        return true;
    }
}
