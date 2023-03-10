//
//  Dynamic.swift
//  Batched
//
//  Created by macbookPro-15 on 9/17/21.
//
import UIKit
import Foundation
import Lottie

@objc class Dynamic: NSObject {


  @objc func createAnimationView(rootView: UIView, lottieName: String) -> AnimationView {
    
    let animationView = AnimationView(name: lottieName)
    animationView.frame = rootView.frame
    animationView.center = rootView.center
    animationView.contentMode = .scaleAspectFill
    return animationView;
  }

  @objc func play(animationView: AnimationView) {
    animationView.play(
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}
