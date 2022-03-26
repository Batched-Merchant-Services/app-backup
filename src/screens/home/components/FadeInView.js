import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import IconPoints from "../../../assets/iconSVG/IconPoints";

const FadeInView = ({ children, duration = 4000, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true
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