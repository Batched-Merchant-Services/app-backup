import React, { useRef, useEffect, useState, Fragment } from "react";
import { Button } from "react-native";
import BackgroundTimer from 'react-native-background-timer';
import {
  Text,
  View
} from '@components';
import moment from 'moment';
import { getLocalDateFromUTC } from "../../../utils/formatters";
import { useSelector, useDispatch } from 'react-redux';
//import CountDown from 'react-native-countdown-component';

import { changeStatusTimers } from "@store/actions/app.actions";
import { getRewardsConfig } from "../../../store/actions/rewards.actions";

const CountDownDates = ({ navigation, changeStateColor,showBlue, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appResources = redux?.app;
  const rewardsData = redux?.rewards;
  const [statusStart, setStatusStart] = useState(false);
  const [endDate, setEnDate] = useState(props.endDate);
  const [dateLeft, setDateLeft] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [checkDateStart, setCheckDateStart] = useState(false);
  const startDate = rewardsData?.configRewards?.startDate
  const inProcess = rewardsData?.inProcess;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (inProcess) {
        dispatch(changeStatusTimers(2, 'green'));
      } else {
        getTransformDateStart();
      }
    });
    return unsubscribe;

  }, [])


  useEffect(() => {
    let timerId;
    if (timerStart || showBlue) {
      getTransformDateStart();
      timerId = setInterval(() => {
        setDateLeft((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [timerStart,showBlue]);


  function getTransformDateStart(date) {
    changeStateColor('blueDark')
    var now = new Date(); 
    var start = getLocalDateFromUTC(startDate)
    var diffr = moment.duration(moment(start).diff(moment(now)));
    var days = parseInt(diffr.asDays())
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var Timer = days + hours * 60 * 60 + minutes * 60 + seconds;
    setDateLeft(Number.isNaN(Timer)? 1:Timer)
    setTimerStart(true);
    setStatusStart(true);

  }


  useEffect(() => {
    if (dateLeft < 0 && timerStart) {
      dispatch(changeStatusTimers(1,'blueLight'));
      changeStateColor('blueLight');
      setTimerStart(false);
      setStatusStart(false);
    }
  }, [dateLeft, timerStart]);





  const clockify = () => {
    var days = Math.floor(dateLeft / (3600 * 24));
    let hours = Math.floor(dateLeft / 60 / 60)
    let mins = Math.floor((dateLeft / 60) % 60)
    let seconds = Math.floor(dateLeft % 60)
    let displayDays = days < 10 ? `0${days}` : days
    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      displayDays,
      displayHours,
      displayMins,
      displaySecs
    }
  }
  return (
    <View >
      <Text h12 semibold>
        {timerStart?clockify().displayDays:null}D {timerStart?clockify().displayHours:null}H {timerStart?clockify().displayMins:null}M{" "}
        {timerStart?clockify().displaySecs:null}S
      </Text>
    </View>
  );
}

export default CountDownDates;