
import React from "react";
import {Animated} from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignAllScreens,DrawerScreen } from './registerScreens';
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
  <Stack.Navigator initialRouteName="SignAllScreens" screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="SignAllScreens" component={SignAllScreens} />
      <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigation;