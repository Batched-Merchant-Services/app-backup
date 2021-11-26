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

const CountDownDateGreen = ({ navigation, changeStateColor,show, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appResources = redux?.app;
  const rewardsData = redux?.rewards;
  const [statusStart, setStatusStart] = useState(false);
  const [dateLeft, setDateLeft] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [checkDateStart, setCheckDateStart] = useState(false);
  const endDate = rewardsData?.configRewards?.endDate
  const inProcess = rewardsData?.inProcess;


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     
      if (inProcess) {
        dispatch(changeStatusTimers(2, 'green'));
      } else {
        getTransformDateEnd();
      }
    });
    return unsubscribe;

  }, [])



  useEffect(() => {
    let timerId;
    console.log('show green',show)
    if (timerStart || show) {
      setDateLeft(0);
      getTransformDateEnd();
      console.log('timerStart',timerStart,show);
      timerId = setInterval(() => {
        setDateLeft((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [timerStart,show]);



  function getTransformDateEnd() {
    console.log('end')
    var now = new Date(); 
    var end = getLocalDateFromUTC(endDate)
    console.log('now', now, end)
    var diffr = moment.duration(moment(end).diff(moment(now)));
    var days = parseInt(diffr.asDays())
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var Timer = days + hours * 60 * 60 + minutes * 60 + seconds;
    setDateLeft(Timer);
    setTimerStart(true);
    setStatusStart(true);
  }



  useEffect(() => {
    if (dateLeft < 0 && timerStart) {
      dispatch(changeStatusTimers(0,'blueDark'));
      changeStateColor('blueDark');
      setTimerStart(false);
    }
  }, [dateLeft, timerStart]);






  // function checkTwo(value) {

  //   var dateOne = 'Thu Nov 25 2021 11:28:10 GMT-0600 (Central Standard Time)'  //Year, Month, Date  
  //   var dateTwo = 'Thu Nov 25 2021 11:29:10 GMT-0600 (Central Standard Time)'
  //   var enddd = 'Fri Nov 26 2021 04:00:00 GMT-0600 (Central Standard Time)'


  //   if (appResources?.changeStatus === 0) {
  //     getTransformDateStart(dateTwo)
  //   }else if (appResources?.changeStatus === 1) {
  //     getTransformDateEnd(enddd)
  //   }
  // }




  // function getTransformDateStart(date) {
  //   console.log('start')
  //   changeStateColor('blueDark')
  //   //var now = new Date(); 
  //   var now = 'Thu Nov 25 2021 11:28:20 GMT-0600 (Central Standard Time)'
  //   //var start = date;
  //   var start = 'Thu Nov 25 2021 11:29:00 GMT-0600 (Central Standard Time)'
  //   console.log('now', now, start)
  //   var diffr = moment.duration(moment(start).diff(moment(now)));
  //   var days = parseInt(diffr.asDays())
  //   var hours = parseInt(diffr.asHours());
  //   var minutes = parseInt(diffr.minutes());
  //   var seconds = parseInt(diffr.seconds());
  //   var Timer = days + hours * 60 * 60 + minutes * 60 + seconds;
  //   setDateLeft(Timer)
  //   setTimerStart(true);
  //   setStatusStart(true);

  // }






  // function checkStatusDate() {
  //   console.log('checkstart')
  //   // var dateOne = new Date(); //Year, Month, Date  
  //   // var dateTwo = getLocalDateFromUTC(props.startDate);   
  //   var dateOne = 'Thu Nov 25 2021 11:28:20 GMT-0600 (Central Standard Time)'  //Year, Month, Date  
  //   var dateTwo = 'Thu Nov 25 2021 16:32:00 GMT-0600 (Central Standard Time)'
  //   var enddd = 'Fri Nov 26 2021 04:00:00 GMT-0600 (Central Standard Time)'
  //   //var dateTwo = new Date('2011,00,15'); //Year, Month, Date  
  //   console.log('dateOne < dateTwo', dateOne < dateTwo)
  //   if (appResources?.changeStatus !== 2) {
  //     if (dateOne < dateTwo) {
  //       dispatch(changeStatusTimers(0, 'blueDark'));
  //       changeStateColor('blueDark')
  //       getTransformDateNow(dateTwo)
  //       setCheckDateStart(false)
  //     } else {
  //       dispatch(changeStatusTimers(1, 'blueLight'));
  //       getTransformDateNow(enddd)
  //       changeStateColor('blueLight')
  //       setCheckDateStart(true)
  //     }
  //   }
  // }

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
      displaySecs,
    }
  }

  return (
    <View >
      <Text h12 semibold>
        {clockify().displayDays}D {clockify().displayHours}H {clockify().displayMins}M{" "}
        {clockify().displaySecs}S
      </Text>
    </View>
  );
}

export default CountDownDateGreen;