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
  Text
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationService from './NavigationService';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from '@navigation/index';
import { AppState} from 'react-native';
import { Provider } from 'react-redux'
// import store from '@store';
import SplashScreen from "react-native-lottie-splash-screen";
import { client } from '@utils/api/apollo';
import { ApolloProvider } from '@apollo/react-hooks'
import { theme } from './theme';
import configureStore from '@store/configureStore';

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


  useEffect(async () => {
   
    const  configStore = await configureStore()
    setIsReady(true);
    setStorePromise(configStore)
    SplashScreen.hide(); // here
    AppState.addEventListener('change',this._handleAppStateChange);
    timer.clearTimeout(this,'timePassed');
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
            <NavigationContainer theme={MyTheme} independent={true}>
              <AppNavigation />
            </NavigationContainer>
          </Provider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
  return null;
  
}
