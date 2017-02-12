package com.wix.interactable;

public class InteractableLimit {
    private float min;
    private float max;
    private float bounce;

    public InteractableLimit(float min, float max, float bounce) {
        this.min = min;
        this.max = max;
        this.bounce = bounce;
    }

    public double getMin() {
        return min;
    }

    public double getMax() {
        return max;
    }

    public double getBounce() {
        return bounce;
    }
}
