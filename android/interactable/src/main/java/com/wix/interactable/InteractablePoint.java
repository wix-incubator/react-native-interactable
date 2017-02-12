package com.wix.interactable;

import android.graphics.Point;

/**
 * Created by zachik on 12/02/2017.
 */

public class InteractablePoint {
    private float x;
    private float y;
    private float damping;
    private float tension;
    private InteractableLimit limitX;
    private InteractableLimit limitY;

    public Point positionWithOrigin(Point origin) {
        Point res = origin;
        if (this.x != Float.MAX_VALUE) res.x += this.x;
        if (this.y != Float.MAX_VALUE) res.y += this.y;
        return res;
    }

    public double distanceFromPoint(Point point,Point origin) {
        float dx = Float.MAX_VALUE;
        float dy = Float.MAX_VALUE;
        if (this.x != Float.MAX_VALUE) dx = point.x - (origin.x + this.x);
        if (this.y != Float.MAX_VALUE) dy = point.y - (origin.y + this.y);
        if (dx == Float.MAX_VALUE && dy == Float.MAX_VALUE) return Float.MAX_VALUE;
        if (dx == Float.MAX_VALUE) return Math.abs(dy);
        if (dy == Float.MAX_VALUE) return Math.abs(dx);
        return Math.sqrt(dx*dx + dy*dy);
    }

    public static Point deltaBetweenPointAndOrigin(Point point,Point origin) {
        return new Point(point.x - origin.x, point.y - origin.y);
    }


}
