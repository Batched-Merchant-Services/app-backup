import React, { useEffect } from 'react';
import { Text, View, Divider, ImageResize, ButtonRounded } from '@components';
import { Animated, TouchableOpacity } from 'react-native'
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import Colors from '@styles/Colors';
import { toggleSnackbarClose, toggleSnackbarOpen } from '@store/actions/app.actions';
import { scale, verticalScale } from 'react-native-size-matters';
import IconWarning from '@assets/iconSVG/IconWarning';
import close from '@assets/icons/white-x.png';
import IconSuccess from '../../assets/iconSVG/IconSuccess';

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
  const TYPE = useSelector((state) => state?.app?.typeSnack);
  const animated = new Animated.Value(0);
  const duration = 1000;

  const TIME = (timeout - 500) / 1000 + "s";

  const fadeOut = () => {
    console.log('fadeout')
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
  }, [SHOW]);



  let TIMER;
  function handleTimeout() {
    TIMER = setTimeout(() => {
      dispatch(toggleSnackbarClose());
    }, timeout);
  }

  function handleClose() {
    console.log('close')
    dispatch(toggleSnackbarClose());
  }

  //   useEffect(() => {
  //     if (visible) {
  //       dispatch(toggleSnackbarOpen(message));
  //     } else {
  //       dispatch(toggleSnackbarClose());
  //     }

  //   }, []);



  const errorColor = brandTheme?.error ?? Colors.error;

  const warningColor = brandTheme?.warning ?? Colors.warning;

  const successColor = brandTheme?.success ?? Colors.success;


  let backgroundSnack;
  switch (TYPE) {
    case 'error':
      backgroundSnack = errorColor;
      break;
    case 'warning':
      backgroundSnack = warningColor;
      break;
    case 'success':
      backgroundSnack = successColor;
      break;
    default:
      backgroundSnack = errorColor;
  }

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
      }, { position: 'absolute', bottom: 0, width: '100%' }]}>
        <View centerH height-50 flex-1 style={{ backgroundColor: backgroundSnack, borderRadius: 5 }}>
          <View row flex-1 >
            <View centerH centerV paddingL-15 >
              {TYPE === 'error' || TYPE === 'warning' && (
                <IconWarning width={scale(15)} height={verticalScale(15)} fill={brandTheme?.white ?? Colors?.white} fillSecondary={brandTheme?.warning ?? Colors?.warning} />
              )}
              {TYPE === 'success' && (
                <IconSuccess width={scale(15)} height={verticalScale(15)} fill={brandTheme?.white ?? Colors?.white} fillSecondary={brandTheme?.warning ?? Colors?.success} />
              )}
            </View>
            <View flex-1 paddingL-15 centerV>
              <Text h12>
                {message ? message?.toString() : MESSAGE?.toString()}
              </Text>
            </View>
            <Divider width-20 />
            <View flex-1
              style={{ alignItems: 'flex-end' }}
              centerV
            >
              <TouchableOpacity onPress={fadeOut} style={styles.close}>
                <ImageResize
                  source={close}
                  height={verticalScale(10)}
                  width={scale(10)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View row style={{ width: '100%' }}>
            <View style={{ borderBottomLeftRadius: 5 }} flex-1 height-4 white />
            <View style={{ borderBottomRightRadius: 5, backgroundColor: TYPE === 'success' || TYPE === 'warning' ? Colors.warning : Colors.error }} flex-1 height-4 error />
          </View>
        </View>
      </Animated.View>
    )
  }
  return null

};

export default SnackNotice;
