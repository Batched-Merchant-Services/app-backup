import React, { useEffect,useState } from 'react';
import {  Animated, TouchableOpacity } from 'react-native'
import { Text, View, Divider, ImageResize } from '@components';
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';
import IconWarning from '@assets/iconSVG/IconWarning';
import close from '@assets/icons/white-x.png';
import IconSuccess from '../../assets/iconSVG/IconSuccess';

const SnackBar = ({
  message,
  success,
  error,
  warning,
  timeout,
  visible,
  handleClose={},
  style = {}
}) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const [values, setValues] = useState(visible);
  const SHOW = useSelector(state => state?.app?.toggleSnackbar);
  const MESSAGE = useSelector((state) => state?.app?.snackbarMessage);
  const animated = new Animated.Value(0);
  const duration = 1000;
 

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



  useEffect(() => {
    setValues(visible)
  }, [visible]);

  useEffect(() => {
    if (values) {
      setValues(true);
    } else {
      setValues(false);
    }
  }, [values]);


  const errorColor = brandTheme?.error ?? Colors.error;

  const warningColor = brandTheme?.warning ?? Colors.warning;

  const successColor = brandTheme?.success ?? Colors.success;


  let backgroundSnack; 
  switch (true) {
    case error:
      backgroundSnack = errorColor;
      break;
    case warning:
      backgroundSnack = warningColor;
      break;
    case success:
      backgroundSnack = successColor;
      break;
    default:
      backgroundSnack = errorColor;
  }

  if (visible) {
    return (
      <Animated.View style={[{transform: [
        {
          translateY: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [1000, 0]
          })
        }
      ]}]}>
      <View centerH>
        <View
          style={[styles.offlineContainer, { backgroundColor: backgroundSnack}]}
        >
          <View row>
            <View centerH centerV paddingL-15 >
              {error || warning&&(
                <IconWarning width={scale(15)} height={verticalScale(15)} fill={brandTheme?.white ?? Colors?.white} fillSecondary={brandTheme?.warning ?? Colors?.warning} />
              )}
              {success &&(
                <IconSuccess width={scale(15)} height={verticalScale(15)} fill={brandTheme?.white ?? Colors?.white} fillSecondary={brandTheme?.warning ?? Colors?.success} />
              )}
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
              <TouchableOpacity onPress={fadeOut}>
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
          <View style={{ borderBottomRightRadius: 5,backgroundColor: success || warning ? Colors.warning : Colors.error }} flex-1 height-4   />
        </View>
      </View>
      </Animated.View>
    )

  }
  return null

};

export default SnackBar;
