import React, { useRef, useEffect, useState, Fragment } from "react";
import { Button } from "react-native";
import BackgroundTimer from 'react-native-background-timer';
import {
  Text,
  View
} from '@components';
import { TouchableOpacity } from "react-native-gesture-handler";
//import CountDown from 'react-native-countdown-component';

const CountDownSeconds = ({startTime,valueInfo,...props}) => {
  const [counterPercent, setCounterPercent] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);

  useEffect(() => {
     setRunTimer(true);
  }, [startTime]);



  useEffect(() => {
    let timerId;
    if (runTimer) {
      setCountDown(60 * 30);
      setCounterPercent(0);
      timerId = setInterval(() => {
        setCounterPercent((counterPercent) =>counterPercent+1*100/1800 );
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [runTimer]);


  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCounterPercent(0)
      setCountDown(0);
    }
  }, [countDown, runTimer]);


  const hours = String(Math.floor(countDown / 60 / 60)).padStart(2, 0);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  const percent = counterPercent.toFixed(2)
  valueInfo(percent);

  return (
    <View>
      <Text h16 semibold center>
       {hours}:{minutes}:{seconds}
      </Text>
    </View>
  );

}

export default CountDownSeconds;