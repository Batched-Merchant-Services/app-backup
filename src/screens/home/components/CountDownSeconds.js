import React, { useRef, useEffect, useState, Fragment } from "react";
import {
  Text,
  View,
  ImageResize
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from '../styles';
import i18n from '@utils/i18n';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import ovalGreen from '@assets/icons/ovalGreen.png';
import ovalRed from '@assets/icons/ovalRed.png';
import { scale, verticalScale } from "react-native-size-matters";
import FadeInView from "./FadeInView";
import { changeStatusTimers } from "@store/actions/app.actions";
import { changeStatusTimerSecond } from "../../../store/actions/app.actions";

const CountDownSeconds = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appResources = redux?.app;
  const brandTheme = appResources?.Theme?.colors;
  const [counterPercent, setCounterPercent] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [showButtonStart, setShowButtonStart] = useState(appResources?.changeStatus === 0 || appResources?.changeSeconds === 1? false : true);
 


  useEffect(() => {
    let timerId;
    if (runTimer) {
      setCountDown(60 * 1);
      setCounterPercent(0);
      setShowButtonStart(false);
      timerId = setInterval(() => {
        setCounterPercent((counterPercent) => counterPercent + 1 * 100 / 60);
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [runTimer]);


  useEffect(() => {
    if (countDown < 0 && runTimer) {
      dispatch(changeStatusTimerSecond(1));
      setRunTimer(false);
      setCounterPercent(0)
      setCountDown(0);
      setShowButtonStart(false);
      navigation.navigate("ActivationConfirmation");
    }
  }, [countDown, runTimer]);


  const hours = String(Math.floor(countDown / 60 / 60)).padStart(2, 0);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  const percent = counterPercent.toFixed(2)

  return (
    <View flex-1 height-280>
      <View flex-1>
        <View style={Styles.box}>
          <ImageResize
            source={showButtonStart && counterPercent !== 0?ovalRed:ovalGreen}
            height={verticalScale(270)}
            width={scale(270)}
          />
        </View>
        {showButtonStart && (
          <FadeInView style={{flex:1}}>
            <LottieView source={require('../../../assets/animationsLottie/distributionEnable.json')} autoPlay loop style={{ justifyContent: "center", alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setRunTimer(true)}>
                <View  centerV style={Styles.containerTime}>
                  <Text h20 white >Start</Text>
                </View>
              </TouchableOpacity>
            </LottieView>
          </FadeInView> 
        )}
        {!showButtonStart && (
          <FadeInView style={{flex:1}}>
            <LottieView source={require('../../../assets/animationsLottie/distributionDisable.json')} autoPlay loop style={{ justifyContent: "center", alignItems: 'center' }}>
              <View centerH>
                <Text h18 white>{percent}</Text>
                <Text h18 blue02>%</Text>
              </View>
            </LottieView>
            </FadeInView>
        )}
      </View>

      {/* <ImageBackground source={CircleTimer} resizeMode="cover" style={Styles.image}>
      {showButtonStart && (
        <TouchableOpacity onPress={() => setRunTimer(true)}>
          <View error centerV marginT-20 style={Styles.containerTime}>
            <Text h20 white bold>Start</Text>
          </View>
        </TouchableOpacity>
      )}
      {!showButtonStart && (
        <View blue03 centerV marginT-20 style={Styles.containerTime}>
          <Text h24 white>{percent}</Text>
          <Text h20 blue02>%</Text>
        </View>
      )}
    </ImageBackground> */}
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