import React, { useRef, useEffect, useState, Fragment } from "react";
import {
  Text,
  View,
  Divider,
  ImageResize
} from '@components';
import { ImageBackground, Animated, Easing } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from '../styles';
import i18n from '@utils/i18n';
import LottieView from 'lottie-react-native';
import { scale, verticalScale } from "react-native-size-matters";
import FadeInView from "./FadeInView";
import { changeStatusTimers } from "@store/actions/app.actions";
import { getTotalLicensesInNetwork } from '@store/actions/licenses.actions';


import ovalBlueInactive from '@assets/home/ovalBlueInactive.png';
import ovalBlue from '@assets/home/ovalBlue.png';
import firstLayer from '@assets/home/firstLayer.png';
import secondLayer from '@assets/home/secondLayer.png';
import firstLayerInactive from '@assets/home/firstLayerInactive.png';
import secondLayerInactive from '@assets/home/secondLayerInactive.png';
import arrow from '@assets/home/white-arrow.png';
import { setValidateRewardsProcess } from "@store/actions/rewards.actions";

const CountDownSeconds = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appResources = redux?.app;
  const rewardsData = redux?.rewards;
  const brandTheme = appResources?.Theme?.colors;
  const [counterPercent, setCounterPercent] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [showButtonStart, setShowButtonStart] = useState(false);
  const inProcess = rewardsData?.inProcess;
  let rotateValueHolder = new Animated.Value(0);




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowButtonStart(appResources?.changeStatus !== 0 ? inProcess ? true : false : false)
    });
    return unsubscribe;

  }, [navigation])

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });




  useEffect(() => {
    let timerId;
    if (runTimer) {
      setCountDown(60 * 30);
      setCounterPercent(0);
      setShowButtonStart(false);
      dispatch(getTotalLicensesInNetwork());
      dispatch(setValidateRewardsProcess({ isStart: true }));
      timerId = setInterval(() => {
        setCounterPercent((counterPercent) => counterPercent + 1 * 100 / 1800);
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [runTimer]);


  useEffect(() => {
    if (countDown < 0 && runTimer) {
      dispatch(changeStatusTimers(2, 'green'));
      setRunTimer(false);
      setCounterPercent(0);
      dispatch(setValidateRewardsProcess({ isStart: false }));
      setCountDown(0);
      setShowButtonStart(false);
      navigation.navigate("ActivationConfirmation");
    }
  }, [countDown, runTimer]);

  function handlePressStart() {
    setRunTimer(true);
  }

  const hours = String(Math.floor(countDown / 60 / 60)).padStart(2, 0);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  const percent = counterPercent.toFixed(2)

  return (
    <View flex-1 height-280>
      <View flex-1>
        <View style={Styles.box}>
          {appResources?.changeStatus === 0 && (
            <ImageResize
              source={ovalBlueInactive}
              height={verticalScale(270)}
              width={scale(270)}
            />
          )}
          {appResources?.changeStatus !== 0 && (
            <ImageResize
              source={ovalBlue}
              height={verticalScale(270)}
              width={scale(270)}
            />
          )}

        </View>
        {showButtonStart && (
          <FadeInView style={{ flex: 1 }}>
            <View style={Styles.imageContainer}>
              <ImageBackground source={firstLayer} resizeMode="contain" style={Styles.image}>
                <Animated.Image
                  style={[Styles.containerArrow, { transform: [{ rotate: RotateData }] }]}
                  source={arrow}
                />
                <ImageBackground source={secondLayer} resizeMode="contain" style={Styles.imageSecond}>
                  <TouchableOpacity onPress={() => handlePressStart()}>
                    <View marginT-40 style={Styles.containerTime}>
                      <Text h15 white semibold>{i18n.t('home.buttonStart')}</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </ImageBackground>
            </View>
            <LottieView source={require('../../../assets/animationsLottie/distributionEnable.json')} autoPlay loop style={{ position: 'absolute', top: 0 }} />
          </FadeInView>
        )}
        {!showButtonStart && (
          <FadeInView style={{ flex: 1 }}>
            <LottieView source={require('../../../assets/animationsLottie/distributionDisable.json')} autoPlay loop style={{ position: 'absolute', top: 0, justifyContent: "center", alignItems: 'center' }} />
            <View style={Styles.imageContainer}>
              <ImageBackground source={firstLayerInactive} resizeMode="contain" style={Styles.image}>
                <Animated.Image
                  style={[Styles.containerArrow, { transform: [{ rotate: RotateData }] }]}
                  source={arrow}
                />
                <ImageBackground source={secondLayerInactive} resizeMode="contain" style={Styles.imageSecond}>
                  <View flex-1 marginT-22>
                    <Text h18 white semibold>{percent}</Text>
                  </View>
                </ImageBackground>
              </ImageBackground>
            </View>
          </FadeInView>
        )}
      </View>
      <Divider height-20 />
      <View centerH>
        <Text h14 blue02 center>{i18n.t('home.textDistributionCycle')}</Text>
        <Text h16 semibold center>
          {hours}:{minutes}:{seconds}
        </Text>
      </View>
    </View>
  );

}

export default CountDownSeconds;