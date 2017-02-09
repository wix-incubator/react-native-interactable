package com.wix.interactable;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Choreographer;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;

public class MainActivity extends AppCompatActivity implements GestureDetector.OnGestureListener,
        Choreographer.FrameCallback{
    private float mLastX = 0f;
    private float mLastY = 0f;

    private GestureDetector mGestureDetector;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final View target = findViewById(R.id.helloTxt);

        mGestureDetector = new GestureDetector(this,this);

        target.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                mGestureDetector.onTouchEvent(motionEvent);
                float curX = motionEvent.getRawX();
                float curY = motionEvent.getRawY();
                switch (motionEvent.getAction()) {
                    case MotionEvent.ACTION_DOWN :
                        Log.d("MainActivity","ACTION_DOWN x = " + curX + " y = " + curY);

                        mLastX = curX;
                        mLastY = curY;
                        break;
                    case MotionEvent.ACTION_MOVE:
                        target.animate().translationX(motionEvent.getRawX() - mLastX)
                                .translationY(motionEvent.getRawY() - mLastY)
                                .setDuration(0).start();
                        break;
                    case MotionEvent.ACTION_UP:
//                        target.animate().translationX(0)
//                                .translationY(0).setDuration(400).start();
                        break;


                }

                return true;
            }
        });


    }

    @Override
    public boolean onDown(MotionEvent motionEvent) {
        return false;
    }

    @Override
    public void onShowPress(MotionEvent motionEvent) {

    }

    @Override
    public boolean onSingleTapUp(MotionEvent motionEvent) {
        return false;
    }

    @Override
    public boolean onScroll(MotionEvent motionEvent, MotionEvent motionEvent1, float v, float v1) {
        return false;
    }

    @Override
    public void onLongPress(MotionEvent motionEvent) {

    }

    @Override
    public boolean onFling(MotionEvent motionEvent, MotionEvent motionEvent1, float v, float v1) {
        Log.d("MainActivity","onFLing vx = " + v + " vy = " + v1);
        return false;
    }

    @Override
    public void doFrame(long l) {
        Log.d("MainActivity","doFrame! t = " + l);

    }
}
