package com.wix.interactable.physics;

import android.graphics.Point;
import android.graphics.PointF;

/**
 * Created by rotemm on 09/02/2017.
 */

public class PhysicsObject {

    PointF velocity;
    float mass;

    public PhysicsObject() {
        this.velocity = new PointF(0,0);
        this.mass = 1.0f;
    }

    public PhysicsObject(PointF velocity, float mass) {
        this.velocity = velocity;
        this.mass = mass;
    }
}
