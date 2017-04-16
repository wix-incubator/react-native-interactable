package com.wix.interactable;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.ViewGroup;

/**
 * Created by zachik on 28/03/2017.
 */

public class TouchBlocker extends ViewGroup {
    public final static String TAG = "TouchBlocker";
    private float y1, y2, x1, x2;

    public void setBlockAllTouch(boolean blockAllTouch) {
        this.blockAllTouch = blockAllTouch;
    }

    public void setBlockVerticalSwipe(boolean blockVerticalSwipe) {
        this.blockVerticalSwipe = blockVerticalSwipe;
    }

    public void setBlockHorizontalSwipe(boolean blockHorizontalSwipe) {
        this.blockHorizontalSwipe = blockHorizontalSwipe;
    }

    private boolean blockAllTouch = false;
    private boolean blockVerticalSwipe = false;
    private boolean blockHorizontalSwipe = false;

//    private long scrollLastTS;
//    private float scrollSpeed;
//    private final float scrollDamping = 700f;

    public TouchBlocker(Context context) {
        super(context);
        setTag(TAG);
    }

    public TouchBlocker(Context context, AttributeSet attrs) {
        super(context, attrs);
        setTag(TAG);
    }

    public TouchBlocker(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        setTag(TAG);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        Log.d("InteractableView","TouchBlocker onInterceptTouchEvent action = " + ev.getAction()
        + " scrollY = " + getChildAt(0).getScrollY());
        if (blockAllTouch) {
        		getParent().requestDisallowInterceptTouchEvent(true);

        		return super.onInterceptTouchEvent(ev);
        }

        if (blockVerticalSwipe) {
            switch(ev.getAction()){
                case MotionEvent.ACTION_DOWN:
                    y1 = ev.getY();

                    break;

                case MotionEvent.ACTION_MOVE:
                    y2 = ev.getY();
                    float deltaY = y2 - y1;

                    if (Math.abs(deltaY) > 0) {
          					    getParent().requestDisallowInterceptTouchEvent(true);
                    }

                    break;
            }
        }

        if (blockHorizontalSwipe) {
            switch(ev.getAction()){
                case MotionEvent.ACTION_DOWN:
                    x1 = ev.getX();

                    break;

                case MotionEvent.ACTION_MOVE:
                    x2 = ev.getX();
                    float deltaX = x2 - x1;

                    if (Math.abs(deltaX) > 0) {
              		      getParent().requestDisallowInterceptTouchEvent(true);
                    }

                    break;
            }
        }

        return super.onInterceptTouchEvent(ev);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        Log.d("InteractableView","TouchBlocker onTouchEvent action = " + ev.getAction());

        return super.onTouchEvent(ev);
    }

    public boolean isAtTop() {
        return getChildAt(0).getScrollY() == 0;
    }

//    public void animateScrollFling(float vStart) {
//        scrollLastTS = System.currentTimeMillis();
//        scrollSpeed = vStart;
//        post(scrollRunnable);
//    }
//
//    private Runnable scrollRunnable = new Runnable() {
//        @Override
//        public void run() {
//            long timeNow = System.currentTimeMillis();
//            float deltaTime = (timeNow - scrollLastTS) / 1000f;
//            getChildAt(0).scrollBy(0, (int) (deltaTime * scrollSpeed));
//            scrollSpeed -= scrollDamping * deltaTime;
//
//            scrollLastTS = timeNow;
//            if (scrollSpeed > 0) {
//                post(scrollRunnable);
//            }
//        }
//    };

}
