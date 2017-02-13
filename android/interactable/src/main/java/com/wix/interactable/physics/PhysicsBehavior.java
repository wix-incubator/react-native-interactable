package com.wix.interactable.physics;

import android.content.Context;
import android.graphics.Point;
import android.graphics.PointF;
import android.os.Vibrator;
import android.util.Log;
import android.view.View;

/**
 * Created by rotemm on 09/02/2017.
 */

public abstract class PhysicsBehavior {
    View target;

    public void setAnchorPoint(PointF anchorPoint) {
        this.anchorPoint = anchorPoint;
    }

    PointF anchorPoint;

    public void setInfluence(PhysicsArea influence) {
        this.influence = influence;
    }

    private PhysicsArea influence;

    boolean isTemp = false;
    boolean haptic = false;

    public PhysicsBehavior(View target) {
        this.target = target;
    }
    public PhysicsBehavior(View target,PointF anchorPoint) {
        this(target);
        this.anchorPoint = anchorPoint;
    }


    public abstract void executeFrameWithDeltaTime(float timeInterval,PhysicsObject physicsObject);

    public boolean isWithinInfluence() {
        if (influence == null) {
            return true;
        }
        if (target.getTranslationX() < influence.minPoint.x) return false;
        if (target.getTranslationX() > influence.maxPoint.x) return false;

        if (target.getTranslationY() < influence.minPoint.y) return false;
        if (target.getTranslationY() > influence.maxPoint.y) return false;
        return true;
    }

    protected void doHaptic() {
        Log.d("InteractableView","doHaptic ");
        Vibrator v = (Vibrator) target.getContext().getSystemService(Context.VIBRATOR_SERVICE);

// Vibrate for 300 milliseconds
        v.vibrate(300);
    }
}
