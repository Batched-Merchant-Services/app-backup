/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState, useRef } from 'react';
 import {
   StatusBar,
   useColorScheme,
   AppState
 } from 'react-native';

 import NavigationService from './NavigationService';
 import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import AppNavigation from '@navigation/index';
 import { Provider } from 'react-redux'
 import { I18nextProvider } from 'react-i18next';
 // import store from '@store';
 import SplashScreen from "react-native-lottie-splash-screen";
 import { client } from '@utils/api/apollo';
 import { ApolloProvider } from '@apollo/react-hooks'
 import { theme } from './theme';
 import store from '@store';
 import UserInactivity from 'react-native-user-inactivity';
 import { validateSession } from './src/store/actions/auth.actions';
 import { userInactivity } from './src/store/actions/app.actions';
 import i18n from '@utils/i18n';
 import Colors from '@styles/Colors';
 //const store = configureStore()
 
 const MyTheme = {
   dark: false,
   colors: {
    ...Colors,
     primary: 'rgb(255, 45, 85)',
     background: 'rgb(242, 242, 242)',
     card: 'rgb(255, 255, 255)',
     text: 'rgb(28, 28, 30)',
     border: 'rgb(199, 199, 204)',
     notification: 'rgb(255, 69, 58)',
   },
 };
 
 export default function App() {
   const [isReady, setIsReady] = useState(false);
   const [storePromise, setStorePromise] = useState(null);
   const [secondsLeft, setSecondsLeft] = useState(60 * 4.5);
   const [timerOn, setTimerOn] = useState(false);
   const [active, setActive] = useState(false);
   const [isLoginId, setIsLoginId] = useState(false);
  
 
 
   useEffect(async () => {
     const configStore = await store;
     setIsReady(true);
     setTimerOn(true);
     setStorePromise(configStore)
     SplashScreen.hide(); // here
   }, []);
   
 

   const handleAppStateChange = async(nextAppState) =>{
     if (nextAppState.match(/inactive|background/)) {
       setActive(false)
     }else if(nextAppState === 'active' ){
       setActive(true)
     }
   };
 


  useEffect(() => {
    AppState.addEventListener('change',handleAppStateChange);
    let timerId;
    if (timerOn) {
      timerId = setInterval(() => {
        setSecondsLeft((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [timerOn]);


  useEffect(() => {
    if (active && secondsLeft === 0){
      console.log('active && secondsLeft === 0',active && secondsLeft === 0)
      onReset();
    }
  }, [secondsLeft])


  const onReset = async() => {
    const configStore = await store;
    const userActive = storePromise?.getState()?.app?.statusUserActive;
    if (userActive) {
      configStore?.dispatch(validateSession())
      setSecondsLeft(60 * 4.5)
    }
  }

  useEffect(() => {
    const userActive = storePromise?.getState()?.app?.statusUserActive;
    console.log('userActive',userActive)
    if (userActive) {
      setTimerOn(true);
      setSecondsLeft(60 * 4.5)
    }
  }, [storePromise?.getState()?.app?.statusUserActive])


  const onAction = async(active) => {
    const configStore = await store;
    const userActive = storePromise?.getState()?.app?.statusUserActive;
    setActive(active);
    if (!active && userActive) {
      setTimerOn(false);
      NavigationService.navigate('SignOut',{
        screen: 'Login'
      });
      configStore?.dispatch(userInactivity(false));
    }else {
      setTimerOn(true);
      setSecondsLeft(60 * 4.5)
    }
   }  
 
 
   //console.log('secondsLeft',secondsLeft,isLoginId)
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.red : Colors.white,
   };
   
 
 
   if (isReady) {
     
     return (
       
         <SafeAreaProvider style={backgroundStyle}>
           <StatusBar barStyle={isDarkMode ? 'white-content' : 'dark-content'} />
           <I18nextProvider i18n={i18n} initialLanguage="en">
            <ApolloProvider client={client} store={storePromise}>
              <Provider store={storePromise} theme={theme}>
              <UserInactivity
                isActive={active}
                timeForInactivity={270000}
                onAction={onAction}
              >
                <NavigationContainer theme={MyTheme} independent={true} ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef)}}>
                  <AppNavigation />
                </NavigationContainer>
                </UserInactivity>
              </Provider>
            </ApolloProvider>
           </I18nextProvider>
         </SafeAreaProvider>
      
     );
   }
   return null;
 
 }