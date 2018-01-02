package com.wix.interactable.physics;

import android.graphics.Point;
import android.graphics.PointF;

/**
 * Created by zachik on 12/02/2017.
 */

public class PhysicsArea {
     PointF minPoint;
    PointF maxPoint;

    public PhysicsArea(PointF minPoint, PointF maxPoint) {
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
    }
}
