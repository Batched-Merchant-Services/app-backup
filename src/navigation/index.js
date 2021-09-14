import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '@screens/signIn/Login';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
 return (
  <NavigationContainer>
   <Stack.Navigator>
     <Stack.Screen name='Login' component={Login} />
   </Stack.Navigator>
   </NavigationContainer>
 );
}

export default AppNavigator;