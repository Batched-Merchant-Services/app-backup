
import React from "react";
import {Animated} from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { signInScreens, signOutScreens } from './registerScreens';
import CustomDrawer from "./DrawerAware";
const {
  interpolate,
  Extrapolate
} = Animated;

const Drawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


const AppNavigation = () => {
  return (
    <Drawer.Navigator
       drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Sign In"  options={{
            headerShown: false,
            icon: 'tachometer-alt',
            category: 'dashboard',
          }} component={signInScreens} />
      <Drawer.Screen name="Sign Out" options={{
            headerShown: false,
            icon: 'tachometer-alt',
            category: 'dashboard',
          }} component={signOutScreens} />
    </Drawer.Navigator>
  );
}

export default AppNavigation;