/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from '@navigation/index';
import { Provider } from 'react-redux'
import store from '@store/configureStore';
 
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
  const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.white,
   };
  return (
    
    <SafeAreaProvider style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'white-content' : 'dark-content'} />
       <Provider store={store}>
       <NavigationContainer theme={MyTheme}>
        <AppNavigation/>
       </NavigationContainer>
       </Provider>
     </SafeAreaProvider>
    
  );
}
