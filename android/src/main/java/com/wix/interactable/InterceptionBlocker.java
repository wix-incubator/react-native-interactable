package com.wix.interactable;

import android.content.Context;
import android.graphics.PointF;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.ViewConfiguration;
import android.view.ViewGroup;

/**
 * Created by zachik on 28/03/2017.
 * <p>
 * This class is responsible for delegating touch events to the nested Views inside the InteractableView parent
 */

public class InterceptionBlocker extends ViewGroup {
    public final static String TAG = "InterceptionBlocker";

    /**
     * when blockAllTouch=true, all toucheEvents will be delegated to the target view
     * and will not intercepted by the ParantView.
     */
    private boolean blockAllTouch = false;

    /**
     * when blockVerticalSwipe=true, all vertical swipe toucheEvents will be delegated to the target view
     * and will not intercepted by the ParantView.
     */
    private boolean blockVerticalSwipe = false;

    /**
     * when blockHorizontalSwipe=true, all horizontal swipe toucheEvents will be delegated to the target view
     * and will not intercepted by the ParantView.
     */
    private boolean blockHorizontalSwipe = false;


    private PointF touchStartLocation;
    private int mTouchSlop;


    private void init() {
        ViewConfiguration vc = ViewConfiguration.get(getContext());
        mTouchSlop = vc.getScaledTouchSlop();
        setTag(TAG);
    }

    public InterceptionBlocker(Context context) {
        super(context);
        init();
    }

    public InterceptionBlocker(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public InterceptionBlocker(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

    }

    // properties setters
    public void setBlockVerticalSwipe(boolean blockVerticalSwipe) {
        this.blockVerticalSwipe = blockVerticalSwipe;
    }

    public void setBlockHorizontalSwipe(boolean blockHorizontalSwipe) {
        this.blockHorizontalSwipe = blockHorizontalSwipe;
    }

    public void setBlockAllTouch(boolean blockAllTouch) {
        this.blockAllTouch = blockAllTouch;
    }


    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {

        // will delegate all touches to the nested views
        if (blockAllTouch) {
            getParent().requestDisallowInterceptTouchEvent(true);
            return super.onInterceptTouchEvent(ev);
        }

        switch (ev.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                touchStartLocation = new PointF(ev.getX(), ev.getY());
                break;
            case MotionEvent.ACTION_MOVE:
                // delegate verticals swipes to the nested views
                if (blockVerticalSwipe) {
                    float deltaY = ev.getY() - touchStartLocation.y;
                    if (Math.abs(deltaY) > mTouchSlop) {
                        getParent().requestDisallowInterceptTouchEvent(true);
                    }
                    break;
                }
                // delegate horizontal swipes to the nested views
                if (blockHorizontalSwipe) {
                    float deltaX = ev.getX() - touchStartLocation.x;
                    if (Math.abs(deltaX) > mTouchSlop) {
                        getParent().requestDisallowInterceptTouchEvent(true);
                    }
                    break;
                }
        }
        return super.onInterceptTouchEvent(ev);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        return super.onTouchEvent(ev);
    }






  /*
    private long scrollLastTS;
    private float scrollSpeed;
    private final float scrollDamping = 700f;

    public boolean isAtTop() {
        return getChildAt(0).getScrollY() == 0;
    }


    public void animateScrollFling(float vStart) {
        scrollLastTS = System.currentTimeMillis();
        scrollSpeed = vStart;
        post(scrollRunnable);
    }

    private Runnable scrollRunnable = new Runnable() {
        @Override
        public void run() {
            long timeNow = System.currentTimeMillis();
            float deltaTime = (timeNow - scrollLastTS) / 1000f;
            getChildAt(0).scrollBy(0, (int) (deltaTime * scrollSpeed));
            scrollSpeed -= scrollDamping * deltaTime;

            scrollLastTS = timeNow;
            if (scrollSpeed > 0) {
                post(scrollRunnable);
            }
       }
    };*/

}
