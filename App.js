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
 import {
   Colors
 } from 'react-native/Libraries/NewAppScreen';
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
 import configureStore from '@store/configureStore';
 import store from '@store';
 import SessionTimeout from './SessionTimeout';
 import UserInactivity from 'react-native-user-inactivity';
 import BackgroundTimer from 'react-native-background-timer';
 import { panResponder } from './SessionTimeout'
 import { validateSession } from './src/store/actions/auth.actions';
 import {useNavigationState} from '@react-navigation/native';
 import { userInactivity } from './src/store/actions/app.actions';
 import i18n from '@utils/i18n';

 
 //const store = configureStore()
 
 const MyTheme = {
   dark: false,
   colors: {
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
     const loginId = configStore?.getState()?.auth?.isSession;
     setIsLoginId(loginId);
     const statusUserActive = configStore?.getState()?.app?.statusUserActive;
     console.log('statusUserActive',loginId)
     //console.log('statusUserActive',statusUserActive,loginId)
     //configStore?.dispatch(userInactivity(false))
     setTimerOn(true);
     setIsReady(true);
     setStorePromise(configStore)
     SplashScreen.hide(); // here
 
   }, [timerOn,isLoginId,store]);
   
 
   useEffect(() => {
     AppState.addEventListener('change',handleAppStateChange);
     if (!isLoginId?false:timerOn) startTimer();
     else BackgroundTimer.stopBackgroundTimer();
     return () => {
       BackgroundTimer.stopBackgroundTimer();
     };
   }, [timerOn,isLoginId]);
 
 
   const handleAppStateChange = async(nextAppState) =>{
     if (nextAppState.match(/inactive|background/)) {
       setActive(false)
     }else if(nextAppState === 'active' ){
       setActive(true)
     }
   };
 
   const startTimer = () => {
     BackgroundTimer.runBackgroundTimer(() => {
       setSecondsLeft((secs) => secs - 1);
     }, 1000)
   }
 
 
 
   useEffect(() => {
     //console.log('active',active);
     if (active && secondsLeft === 0){
       console.log('active && secondsLeft === 0',active && secondsLeft === 0)
       onReset();
     }
   }, [secondsLeft])
 
  
 
   const onReset = async() => {
     const configStore = await store
     configStore?.dispatch(validateSession())
     setSecondsLeft(60 * 4.5)
   }
 
   const onStop = () => {
     console.log('onStop')
     NavigationService.navigate('SignOut',{
       screen: 'Login'
     });
     BackgroundTimer.stopBackgroundTimer();
 
   }
 
   const onAction = async(active) => {
     console.log('onAction',active,secondsLeft)
     setActive(active);
     if (!active) {
       onStop();
     }
   }  
 
 
   //console.log('secondsLeft',secondsLeft,isLoginId)
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.white,
   };
   
   console.log('i18n app js',i18n)
 
 
   if (isReady) {
     
     return (
       
         <SafeAreaProvider style={backgroundStyle}>
           <StatusBar barStyle={isDarkMode ? 'white-content' : 'dark-content'} />
           <I18nextProvider i18n={i18n}>
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