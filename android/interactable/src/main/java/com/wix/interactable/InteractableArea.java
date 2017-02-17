package com.wix.interactable;

public class InteractableArea {
    private float top;
    private float left;
    private float bottom;
    private float right;
    private float bounce;
    private boolean heptics;

    public InteractableArea(float top, float left, float bottom, float right, float bounce, boolean heptics) {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
        this.bounce = bounce;
        this.heptics = heptics;
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

    public boolean isHeptic() {
        return heptics;
    }
}
