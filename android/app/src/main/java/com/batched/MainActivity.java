package com.batched;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  
  protected String getMainComponentName() {
    SplashScreen.show(this, R.id.lottie); // here
    SplashScreen.setAnimationFinished(true);
    return "Batched";
  }
}
