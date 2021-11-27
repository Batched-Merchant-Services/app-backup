import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from 'react';
import moment from 'moment';
import { AsyncStorage } from 'react-native';


const SessionTimeout = () => {
  const [events, setEvents] = useState(['click', 'load', 'scroll']);
  const [second, setSecond] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  let timeStamp;
  let warningInactiveInterval = useRef();
  let startTimerInterval = useRef();

  // start inactive check
  let timeChecker = () => {
  
    startTimerInterval.current = setTimeout(async() => {
      let storedTimeStamp = await AsyncStorage.getItem('lastTimeStamp');
      console.log('storedTimeStamp',storedTimeStamp)
      warningInactive(storedTimeStamp);
    }, 4000);
  };

  // warning timer
  let warningInactive = (timeString) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(async() => {
      const maxTime = 2;
      const popTime = 1;

      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const leftSecond = 60 - diff.seconds();

      if (minPast === popTime) {
        setSecond(leftSecond);
        setOpen(true);
      }

      if (minPast === maxTime) {
        clearInterval(warningInactiveInterval.current);
        setOpen(false);
        await AsyncStorage.removeItem('lastTimeStamp');
        //logout();
      }
    }, 1000);
  };

  // reset interval timer
  let resetTimer = useCallback(async() => {
    console.log('event')
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);

    if (isAuthenticated) {
      timeStamp = moment();
      await AsyncStorage.setItem('lastTimeStamp', timeStamp);
    } else {
      clearInterval(warningInactiveInterval.current);
      await AsyncStorage.removeItem('lastTimeStamp');
    }
    timeChecker();
    setOpen(false);
  }, [isAuthenticated]);

  // handle close popup
  const handleClose = () => {
    setOpen(false);

    resetTimer();
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    timeChecker();

    return () => {
      clearTimeout(startTimerInterval.current);
      //   resetTimer();
    };
  }, [resetTimer, events, timeChecker]);

  console.log(second);

  if (!isOpen) {
    return null;
  }

  // change fragment to modal and handleclose func to close
  return <Fragment />;
};

export default SessionTimeout;