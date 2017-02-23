package com.wix.interactable.physics;

import android.content.Context;
import android.graphics.PointF;
import android.os.Vibrator;
import android.view.View;


/**
 * Created by rotemm on 09/02/2017.
 */

public abstract class PhysicsBehavior {
    private static int DURATION_BETWEEN_HAPTICS = 500;

    View target;
    long lastHapticsAction;

    public void setAnchorPoint(PointF anchorPoint) {
        this.anchorPoint = anchorPoint;
    }
    public void moveAnchorPoint(float dx,float dy) {
        this.anchorPoint.x += dx;
        this.anchorPoint.y += dy;
    }

    PointF anchorPoint;

    public void setInfluence(PhysicsArea influence) {
        this.influence = influence;
    }

    private PhysicsArea influence;

    boolean isTemp = false;
    boolean haptics = false;
    boolean lastIsWithinInfluenceInitialized = false;
    boolean lastIsWithinInfluence = false;

    int priority = 1;

    public PhysicsBehavior(View target, boolean haptics) {
        this.target = target;
        this.haptics = haptics;
    }
    public PhysicsBehavior(View target, PointF anchorPoint) {
        this(target, false);
        this.anchorPoint = anchorPoint;
    }


    public abstract void executeFrameWithDeltaTime(float timeInterval,PhysicsObject physicsObject);

    public boolean isWithinInfluence() {
        boolean res = true;
        if (influence == null) {
            return true;
        }
        if (target.getTranslationX() < influence.minPoint.x) res =  false;
        if (target.getTranslationX() > influence.maxPoint.x) res =  false;

        if (target.getTranslationY() < influence.minPoint.y) res =  false;
        if (target.getTranslationY() > influence.maxPoint.y) res =  false;

        if (lastIsWithinInfluenceInitialized) {
            if (res != lastIsWithinInfluence) {
                doHaptic();
            }

        }
        lastIsWithinInfluenceInitialized = true;
        lastIsWithinInfluence = res;
        return res;
    }

    protected void doHaptic() {

        if ( haptics && (System.currentTimeMillis() - lastHapticsAction > DURATION_BETWEEN_HAPTICS)) {
            Vibrator v = (Vibrator) target.getContext().getSystemService(Context.VIBRATOR_SERVICE);
            v.vibrate(1);
            lastHapticsAction = System.currentTimeMillis();
        }
    }
}
