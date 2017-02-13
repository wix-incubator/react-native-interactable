package com.wix.interactable.RNConvert;

import android.graphics.PointF;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.wix.interactable.InteractableDrag;
import com.wix.interactable.InteractableLimit;
import com.wix.interactable.InteractablePoint;

import java.util.ArrayList;

/**
 * Created by rotemm on 12/02/2017.
 */

public class RNConvert {

    public static InteractableLimit interactableLimit(ReadableMap params) {
        float min = params.hasKey("min") ? PixelUtil.toPixelFromDIP((float) params.getDouble("min")) : Float.MIN_VALUE;
        float max = params.hasKey("max") ? PixelUtil.toPixelFromDIP((float) params.getDouble("max")) : Float.MAX_VALUE;
        float bounce = params.hasKey("bounce") ? (float) params.getDouble("bounce") : 0f;

        return new InteractableLimit(min, max, bounce);
    }

    public static InteractablePoint interactablePoint(ReadableMap params) {
        String id = params.hasKey("id") ? params.getString("id") : null;
        float x = params.hasKey("x") ? PixelUtil.toPixelFromDIP(params.getDouble("x")) : Float.MAX_VALUE;
        float y = params.hasKey("y") ? PixelUtil.toPixelFromDIP(params.getDouble("y")) : Float.MAX_VALUE;
        float damping = params.hasKey("damping") ? (float) params.getDouble("damping") : 0f;
        float tension = params.hasKey("tension") ? (float) params.getDouble("tension") : 300f;
        float strength = params.hasKey("strength") ? (float) params.getDouble("strength") : 400f;
        float falloff = params.hasKey("falloff") ? (float) params.getDouble("falloff") : 40f;
        InteractableLimit limitX = params.hasKey("limitX") ? interactableLimit(params.getMap("limitX")) : null;
        InteractableLimit limitY = params.hasKey("limitY") ? interactableLimit(params.getMap("limitY")) : null;

        return new InteractablePoint(id, x, y, damping, tension, strength, falloff, limitX, limitY);
    }

    public static InteractableDrag interactableDrag(ReadableMap params) {
        float toss = params.hasKey("toss") ? (float) params.getDouble("toss") : 0.1f;
        float tension = params.hasKey("tension") ? (float) params.getDouble("tension") : Float.MAX_VALUE;
        float damping = params.hasKey("damping") ? (float) params.getDouble("damping") : 0f;

        return new InteractableDrag(toss, tension, damping);
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
        int x = (int) PixelUtil.toPixelFromDIP(params.hasKey("x") ? params.getInt("x") : 0);
        int y = (int) PixelUtil.toPixelFromDIP(params.hasKey("y") ? params.getInt("y") : 0);

        return new PointF(x, y);
    }
}
