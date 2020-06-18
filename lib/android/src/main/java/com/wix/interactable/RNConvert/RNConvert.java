package com.wix.interactable.RNConvert;

import android.graphics.PointF;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.wix.interactable.InteractableArea;
import com.wix.interactable.InteractablePoint;
import com.wix.interactable.InteractableSpring;

import java.util.ArrayList;

/**
 * Created by rotemm on 12/02/2017.
 */

public class RNConvert {

    public static InteractableArea interactableLimit(ReadableMap params) {
        float top = params.hasKey("top") ? PixelUtil.toPixelFromDIP((float) params.getDouble("top")) : -Float.MAX_VALUE;
        float left = params.hasKey("left") ? PixelUtil.toPixelFromDIP((float) params.getDouble("left")) : -Float.MAX_VALUE;
        float bottom = params.hasKey("bottom") ? PixelUtil.toPixelFromDIP((float) params.getDouble("bottom")) : Float.MAX_VALUE;
        float right = params.hasKey("right") ? PixelUtil.toPixelFromDIP((float) params.getDouble("right")) : Float.MAX_VALUE;
        float bounce = params.hasKey("bounce") ? (float) params.getDouble("bounce") : 0f;
        boolean haptics = params.hasKey("haptics") ? params.getBoolean("haptics") : false;

        return new InteractableArea(top, left, bottom, right, bounce, haptics);
    }

    public static InteractablePoint interactablePoint(ReadableMap params) {
        String id = params.hasKey("id") ? params.getString("id") : null;
        float x = params.hasKey("x") ? PixelUtil.toPixelFromDIP(params.getDouble("x")) : Float.MAX_VALUE;
        float y = params.hasKey("y") ? PixelUtil.toPixelFromDIP(params.getDouble("y")) : Float.MAX_VALUE;
        float damping = params.hasKey("damping") ? (float) params.getDouble("damping") : 0f;
        float tension = params.hasKey("tension") ? (float) params.getDouble("tension") : 300f;
        float strength = params.hasKey("strength") ? (float) params.getDouble("strength") : 400f;
        float falloff = params.hasKey("falloff") ? PixelUtil.toPixelFromDIP( params.getDouble("falloff")) : 40f;
        InteractableArea influenceArea = params.hasKey("influenceArea") ? interactableLimit(params.getMap("influenceArea")) : null;

        return new InteractablePoint(id, x, y, damping, tension, strength, falloff, influenceArea);
    }

    public static InteractableSpring interactableDrag(ReadableMap params) {
        float tension = params.hasKey("tension") ? (float) params.getDouble("tension") : Float.MAX_VALUE;
        float damping = params.hasKey("damping") ? (float) params.getDouble("damping") : 0f;

        return new InteractableSpring(tension, damping);
    }

    public static ArrayList<InteractablePoint> interactablePoints(ReadableArray points) {
        ArrayList interactablePoints = new ArrayList(points.size());
        for (int i = 0 ; i < points.size() ; i++) {
            ReadableMap rawSpring = points.getMap(i);
            interactablePoints.add(RNConvert.interactablePoint(rawSpring));
        }

        return interactablePoints;
    }

    public static PointF pointF(ReadableMap params) {
        float x = PixelUtil.toPixelFromDIP(params.hasKey("x") ? params.getDouble("x") : 0);
        float y = PixelUtil.toPixelFromDIP(params.hasKey("y") ? params.getDouble("y") : 0);

        return new PointF(x, y);
    }
}
