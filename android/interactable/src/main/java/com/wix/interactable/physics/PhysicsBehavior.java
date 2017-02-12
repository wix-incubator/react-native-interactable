package com.wix.interactable.physics;

import android.view.View;

/**
 * Created by rotemm on 09/02/2017.
 */

public abstract class PhysicsBehavior {
    View target;

    private PhysicsArea influence;

    public void initWithTarget(View target) {
        this.target = target;
    }

    public abstract void executeFrameWithDeltaTime(long timeInterval,PhysicsObject physicsObject);

    public boolean isWithinInfluence() {
        if (target.getLeft() < influence.minPoint.x) return false;
        if (target.getRight() > influence.maxPoint.x) return false;

        if (target.getTop() < influence.minPoint.y) return false;
        if (target.getBottom() > influence.maxPoint.y) return false;
        return true;
    }
}
