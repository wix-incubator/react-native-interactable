package com.wix.interactable;

/**
 * Created by zachik on 12/02/2017.
 */

public class InteractableDrag {
    float toss;
    float tension;
    float damping;


    public InteractableDrag(float toss, float tension, float damping) {
        this.toss = toss;
        this.tension = tension;
        this.damping = damping;
    }
}
