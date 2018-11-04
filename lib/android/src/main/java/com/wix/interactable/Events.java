package com.wix.interactable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by rotemm on 14/02/2017.
 */

public class Events {

    public static class OnSnapEvent extends Event<OnSnapEvent> {

        WritableMap eventData;

        public OnSnapEvent(int viewTag, int indexOfSnapPoint, String snapPointId) {
            super(viewTag);
            eventData = Arguments.createMap();
            eventData.putInt("index",indexOfSnapPoint);
            eventData.putString("id", snapPointId);
        }

        @Override
        public String getEventName() {
            return "onSnap";
        }

        @Override
        public void dispatch(RCTEventEmitter rctEventEmitter) {
            rctEventEmitter.receiveEvent(getViewTag(), getEventName(), eventData);
        }
    }

    public static class OnSnapStartEvent extends Event<OnSnapStartEvent> {

        WritableMap eventData;

        public OnSnapStartEvent(int viewTag, int indexOfSnapPoint, String snapPointId) {
            super(viewTag);
            eventData = Arguments.createMap();
            eventData.putInt("index",indexOfSnapPoint);
            eventData.putString("id", snapPointId);
        }

        @Override
        public String getEventName() {
            return "onSnapStart";
        }

        @Override
        public void dispatch(RCTEventEmitter rctEventEmitter) {
            rctEventEmitter.receiveEvent(getViewTag(), getEventName(), eventData);
        }
    }

    public static class OnAnimatedEvent extends Event<OnAnimatedEvent> {

        WritableMap eventData;

        public OnAnimatedEvent(int viewTag, float x, float y) {
            super(viewTag);
            eventData = Arguments.createMap();
            eventData.putDouble("x", PixelUtil.toDIPFromPixel(x));
            eventData.putDouble("y", PixelUtil.toDIPFromPixel(y));
        }

        @Override
        public String getEventName() {
            return "onAnimatedEvent";
        }

        @Override
        public void dispatch(RCTEventEmitter rctEventEmitter) {
            rctEventEmitter.receiveEvent(getViewTag(), getEventName(), eventData);
        }
    }
    public static class OnAlertEvent extends Event<OnAlertEvent> {

        WritableMap eventData;

        public OnAlertEvent(int viewTag, String alertAreaId, String alertType) {
            super(viewTag);
            eventData = Arguments.createMap();
            eventData.putString(alertAreaId, alertType);
        }

        @Override
        public String getEventName() {
            return "onAlert";
        }

        @Override
        public void dispatch(RCTEventEmitter rctEventEmitter) {
            rctEventEmitter.receiveEvent(getViewTag(), getEventName(), eventData);
        }
    }

    public static class onDrag extends Event<onDrag> {

        WritableMap eventData;

        public onDrag(int viewTag, String state, float x, float y, String targetSnapPointId) {
            super(viewTag);
            eventData = Arguments.createMap();
            eventData.putString("state", state);
            eventData.putDouble("x", PixelUtil.toDIPFromPixel(x));
            eventData.putDouble("y", PixelUtil.toDIPFromPixel(y));
            eventData.putString("targetSnapPointId", targetSnapPointId);
        }

        @Override
        public String getEventName() {
            return "onDrag";
        }

        @Override
        public void dispatch(RCTEventEmitter rctEventEmitter) {
            rctEventEmitter.receiveEvent(getViewTag(), getEventName(), eventData);
        }
    }

    public static class onStop extends Event<onStop> {

        WritableMap eventData;

        public onStop(int viewTag, float x, float y) {
            super(viewTag);
            eventData = Arguments.createMap();
            eventData.putDouble("x", PixelUtil.toDIPFromPixel(x));
            eventData.putDouble("y", PixelUtil.toDIPFromPixel(y));
        }

        @Override
        public String getEventName() { return "onStop"; }

        @Override
        public void dispatch(RCTEventEmitter rctEventEmitter) {
            rctEventEmitter.receiveEvent(getViewTag(), getEventName(), eventData);
        }
    }
}
