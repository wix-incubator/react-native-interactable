package com.wix.interactable.physics;

import android.graphics.Point;

/**
 * Created by rotemm on 09/02/2017.
 */

public class PhysicsObject {

    Point velocity;
    float mass;

    public PhysicsObject() {
        this.velocity = new Point(0,0);
        this.mass = 1.0f;
    }

    public PhysicsObject(Point velocity, float mass) {
        this.velocity = velocity;
        this.mass = mass;
    }
}
