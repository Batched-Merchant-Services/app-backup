
import React from "react";
import {Animated} from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signInScreens, signOutScreens } from './registerScreens';
import CustomDrawer from "./DrawerAware";
const {
  interpolate,
  Extrapolate
} = Animated;

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


const AppNavigation = () => {
  return (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="Login" component={signOutScreens} />
      <Stack.Screen name="Dashboard" component={signInScreens} />
    </Stack.Navigator>
  );
}

export default AppNavigation;