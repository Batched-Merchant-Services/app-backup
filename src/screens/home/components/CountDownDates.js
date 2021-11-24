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

const CountDownDates = ({changeStateBuy,...props}) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appResources = redux?.app;
  const [startDate, setStarDate] = useState(props.startDate);
  const [endDate, setEnDate] = useState(props.endDate);
  const [dateLeft, setDateLeft] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [checkDateStart, setCheckDateStart] = useState(false);

  useEffect(() => {
    var dateOne = new Date(); //Year, Month, Date  
    var dateTwo = getLocalDateFromUTC(props.startDate);   
    //var dateTwo = new Date('2011,00,15'); //Year, Month, Date  
    console.log('dateOne < dateTwo',dateOne < dateTwo)  
    if (dateOne < dateTwo) {   
      console.log('true')   
      dispatch(changeStatusTimers(0));
      getTransformDateNow(props.startDate)
      setCheckDateStart(false)
    }else {   
      console.log('false')  
      dispatch(changeStatusTimers(1));
      getTransformDateNow(props.endDate)
      setCheckDateStart(true)
    }    
  }, [checkDateStart])



  useEffect(() => {
    if (appResources?.changeStatus === 0) {
      getTransformDateNow(startDate);
    } else if (appResources?.changeStatus === 1) {
      getTransformDateNow(endDate);
    }
    
    if (timerStart) startStatus();
    else BackgroundTimer.stopBackgroundTimer();
    // return () => {
    //   BackgroundTimer.stopBackgroundTimer();
    // };
   
  }, [timerStart]);

  const startStatus = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      console.log('star timer dates')
      setDateLeft(secs => {
        if (secs > 0) return secs - 1
        else return 0
      })
    }, 1000)
  }

  function getTransformDateNow(date){
    var now = new Date(); 
    var start = getLocalDateFromUTC(date); 
    console.log('now',now,start)
    var diffr = moment.duration(moment(start).diff(moment(now)));
    var days = parseInt(diffr.asDays())
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var Timer = days + hours * 60 * 60 + minutes * 60 + seconds;
    console.log('checkDateStart1',(Timer !== 0 && !checkDateStart))
    // if (Timer !== 0 && !checkDateStart){
    //   dispatch(changeStatusTimers(0));
    // }else  {
    //   dispatch(changeStatusTimers(1));
    //   setStarDate(props.endDate)
    //   //BackgroundTimer.stopBackgroundTimer();
    // }
    setDateLeft(Timer) 
    setTimerStart(true);
  }
   

  useEffect(() => {
    if (dateLeft === 0) {
      BackgroundTimer.stopBackgroundTimer(); 
    }
  }, [dateLeft])

  const clockify = () => {
    var days = Math.floor(dateLeft / (3600*24));
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

export default CountDownDates;