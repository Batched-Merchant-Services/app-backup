import React, { useRef, useEffect, useState, Fragment } from "react";
import {
  Text,
  View,
  ImageResize
} from '@components';
import { ImageBackground } from "react-native";
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowButtonStart(inProcess || appResources?.changeStatus !== 0 ? true : false)
    });
    return unsubscribe;

  }, [])


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


  const hours = String(Math.floor(countDown / 60 / 60)).padStart(2, 0);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  const percent = counterPercent.toFixed(2)

  console.log('appResources?.changeStatus',appResources?.changeStatus)
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
            <LottieView source={require('../../../assets/animationsLottie/distributionEnable.json')} autoPlay loop style={{ justifyContent: "center", alignItems: 'center' }}>
              <ImageBackground source={firstLayer} resizeMode="contain" style={Styles.image}>
                <ImageBackground source={secondLayer} resizeMode="contain" style={Styles.imageSecond}>
                  <TouchableOpacity onPress={() => setRunTimer(true)}>
                    <View centerV style={Styles.containerTime}>
                      <Text h15 white semibold>Start</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </ImageBackground>
            </LottieView>
          </FadeInView>
        )}
        {!showButtonStart && (
          <FadeInView style={{ flex: 1 }}>
            <LottieView source={require('../../../assets/animationsLottie/distributionDisable.json')} autoPlay loop style={{ justifyContent: "center", alignItems: 'center' }}>
              <ImageBackground source={firstLayerInactive} resizeMode="contain" style={Styles.image}>
                <ImageBackground source={secondLayerInactive} resizeMode="contain" style={Styles.imageSecond}>
                  <View centerH>
                    <Text h18 white semibold>{percent}</Text>
                    <Text h18 blue02>%</Text>
                  </View>
                </ImageBackground>
              </ImageBackground>

            </LottieView>
          </FadeInView>
        )}
      </View>

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