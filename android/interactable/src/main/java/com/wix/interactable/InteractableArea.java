package com.wix.interactable;
import android.graphics.PointF;

public class InteractableArea {
    private float top;
    private float left;
    private float bottom;
    private float right;
    private float bounce;
    private boolean haptics;

    public InteractableArea(float top, float left, float bottom, float right, float bounce, boolean haptics) {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
        this.bounce = bounce;
        this.haptics = haptics;
    }

    public boolean pointInside(PointF point) {
        float cx = point.x;
        float cy = point.y;

        if (cx < this.left) return false;
        if (cx > this.right) return false;

        if (cy < this.top) return false;
        if (cy > this.bottom) return false;

        return true;
    }

    public boolean pointInsideWithOrigin(PointF point, PointF origin) {
        return this.pointInside(new PointF(point.x - origin.x, point.y - origin.y));
    }


    public float getTop() {
        return top;
    }

    public float getLeft() {
        return left;
    }

    public float getBottom() {
        return bottom;
    }

    public float getRight() {
        return right;
    }

    public float getBounce() {
        return bounce;
    }

    public boolean isHaptic() {
        return haptics;
    }
}
