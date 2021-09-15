import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '@screens/signIn/Login';
import Register from '@screens/signUp/Register';



const Stack = createNativeStackNavigator();

const signInScreens = () => {
  return (
    <Stack.Navigator  initialRouteName="Register" screenOptions={{ headerShown: false }} >
       <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const signOutScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export { signInScreens, signOutScreens };
