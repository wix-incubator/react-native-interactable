package com.wix.interactable.physics;

import android.graphics.Point;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsArea {
     Point minPoint;
     Point maxPoint;

    public PhysicsArea(Point minPoint, Point maxPoint) {
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
    }
}
