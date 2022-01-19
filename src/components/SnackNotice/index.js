import React, { useEffect } from 'react';
import { Text, View, Divider, ImageResize } from '@components';
import {  Animated, TouchableOpacity } from 'react-native'
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import Colors from '@styles/Colors';
import { toggleSnackbarClose, toggleSnackbarOpen } from '@store/actions/app.actions';
import { scale, verticalScale } from 'react-native-size-matters';
import IconWarning from '@assets/iconSVG/IconWarning';

import close from '@assets/icons/white-x.png';

const SnackNotice = ({
  message,
  timeout,
  visible,
  style = {}
}) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const SHOW = useSelector(state => state?.app?.toggleSnackbar);
  const MESSAGE = useSelector((state) => state?.app?.snackbarMessage);
  const animated = new Animated.Value(0);
  const duration = 1000;

  const TIME = (timeout - 500) / 1000 + "s";

  function fadeOut () { 
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true
    }).start();
    setTimeout(() => { 
      handleClose()
    }, 800);
  };

  useEffect(() => {
      Animated.timing(animated, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true
      }).start();
  }, [animated]);



  let TIMER;
  function handleTimeout() {
    TIMER = setTimeout(() => {
      dispatch(toggleSnackbarClose());
    }, timeout);
  }

  function handleClose() {
    dispatch(toggleSnackbarClose());
    fadeOut();
  }

  //   useEffect(() => {
  //     if (visible) {
  //       dispatch(toggleSnackbarOpen(message));
  //     } else {
  //       dispatch(toggleSnackbarClose());
  //     }

  //   }, []);


  if (SHOW) {
    return (
      <Animated.View style={[{
        transform: [
          {
            translateY: animated.interpolate({
              inputRange: [0, 1],
              outputRange: [1000, 0]
            })
          }
        ]
      }]}>
        <View centerH>
          <View
            style={[styles.offlineContainer, { backgroundColor: Colors.error }]}
          >
            <View row>
              <View centerH centerV paddingL-15 >
                <IconWarning width={scale(12)} height={verticalScale(12)} fill={brandTheme?.white ?? Colors?.white} fillSecondary={brandTheme?.warning ?? Colors?.warning} />
              </View>
              <View flex-1 paddingL-15 centerV>
                <Text h12>
                  {message ? message?.toString() : MESSAGE?.toString()}
                </Text>
              </View>
              <Divider width-20 />
              <View
                style={{ alignItems: 'flex-end' }}
                centerV
                paddingR-15
              >
                <TouchableOpacity onPress={handleClose}>
                  <ImageResize
                    source={close}
                    height={verticalScale(10)}
                    width={scale(10)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View row style={{ width: '100%' }}>
            <View style={{ borderBottomLeftRadius: 5 }} flex-1 height-4 white />
            <View style={{ borderBottomRightRadius: 5 }} flex-1 height-4 error />
          </View>
        </View>
      </Animated.View>
    )

  }
  return null

};

export default SnackNotice;
