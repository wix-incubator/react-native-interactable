package com.wix.interactable;

public class InteractableLimit {
    private double min;
    private double max;
    private double bounce;

    public InteractableLimit(double min, double max, double bounce) {
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
