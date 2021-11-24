import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

const FadeInView = ({ children, duration = 4000, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration
    }).start();
  };
  
  useEffect(() => {
    fadeIn();
  }, [ opacity ]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;