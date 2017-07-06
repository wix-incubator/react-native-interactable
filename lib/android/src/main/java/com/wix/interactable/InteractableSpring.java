package com.wix.interactable;

/**
 * Created by zachik on 12/02/2017.
 */

public class InteractableSpring {
    float toss;
    float tension;
    float damping;


    public InteractableSpring(float toss, float tension, float damping) {
        this.toss = toss;
        this.tension = tension;
        this.damping = damping;
    }
}
