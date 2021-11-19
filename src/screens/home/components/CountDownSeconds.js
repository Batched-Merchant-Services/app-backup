import React, { useRef, useEffect, useState, Fragment } from "react";
import { Button } from "react-native";
import BackgroundTimer from 'react-native-background-timer';
import {
  Text,
  View
} from '@components';
import { TouchableOpacity } from "react-native-gesture-handler";
//import CountDown from 'react-native-countdown-component';

const CountDownTimer = ({startTime,valueInfo,...props}) => {

  const [secondsLeft, setSecondsLeft] = useState(1800);
  const [timerOn, setTimerOn] = useState(false);


  useEffect(() => {
    if (timerOn || startTime) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
      // setTimerOn(false)
      // setSecondsLeft(10);
    };
  }, [timerOn,startTime]);
  

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1
        else return 0
      })
    }, 1000)
  }

  useEffect(() => {
    if (secondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
      setSecondsLeft(1800)
      setTimerOn(false)
      valueInfo(false)
    }
  }, [secondsLeft])


  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)
    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      displayHours,
      displayMins,
      displaySecs,
    }
  }



  return (
    <View>
      <Text h12 semibold>
        {clockify().displayHours}:{clockify().displayMins}:
        {clockify().displaySecs}
      </Text>
    </View>
  );

}

export default CountDownTimer;