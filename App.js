/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ useEffect,useState,useRef } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationService from './NavigationService';
import { NavigationContainer,NavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from '@navigation/index';
import { Provider } from 'react-redux'
import store from '@store/configureStore';
import SplashScreen from "react-native-lottie-splash-screen";
import makeApolloClient from '@utils/api/apollo'; 

import { 
  ApolloProvider,
} from "@apollo/client";


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
  
  const [client, setClient] = useState(null);

  const fetchSession = async () => {
    const client = makeApolloClient('1289449djdhjchfbhfbfhbdjdi8494802027');
    console.log('client',client);
    setClient(client);
  }


  useEffect(() => {
    console.log('SplashScreen',SplashScreen);
    SplashScreen.hide(); // here
    fetchSession();
  }, []);


  const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.white,
   };
  return (
   
    <SafeAreaProvider style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'white-content' : 'dark-content'} />
       <ApolloProvider client={client}>
        <Provider store={store}>
        <NavigationContainer theme={MyTheme} independent={true}>
          <AppNavigation/>
        </NavigationContainer>
        </Provider>
       </ApolloProvider>
     </SafeAreaProvider>
    
  );
}
