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
  Text,
  PanResponder
} from 'react-native';
import {
  View
} from '@components';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationService from './NavigationService';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from '@navigation/index';
import { AppState } from 'react-native';
import { Provider } from 'react-redux'
// import store from '@store';
import SplashScreen from "react-native-lottie-splash-screen";
import { client } from '@utils/api/apollo';
import { ApolloProvider } from '@apollo/react-hooks'
import { theme } from './theme';
import configureStore from '@store/configureStore';
import SessionTimeout from './SessionTimeout';

const store = configureStore()

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
  const [storePromise, setStorePromise] = useState({});
  const timerId = useRef(false)
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(3600);


  useEffect(() => {
    resetInactivityTimeout()
  }, [])

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        // console.log('user starts touch');
        resetInactivityTimeout()
      },
    })
  ).current

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current)
    timerId.current = setTimeout(() => {
      // action after user has been detected idle
    }, timeForInactivityInSecond * 1000)
  }


  useEffect(async () => {

    const configStore = await configureStore()
    setIsReady(true);
    setStorePromise(configStore)
    SplashScreen.hide(); // here

  }, []);


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  if (isReady) {
    return (
        <SafeAreaProvider style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'white-content' : 'dark-content'} />
          <ApolloProvider client={client} store={storePromise}>
            <Provider store={storePromise} theme={theme}>
            <View style={{ flex: 1 }} {...panResponder.panHandlers}>
              <NavigationContainer theme={MyTheme} independent={true}>
                <AppNavigation />
              </NavigationContainer>
              </View>
            </Provider>
          </ApolloProvider>
          <SessionTimeout />
        </SafeAreaProvider>
     
    );
  }
  return null;

}