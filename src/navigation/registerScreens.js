import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./DrawerAware";
import Login from '@screens/signIn/Login';
import Register from '@screens/signUp/Register';
import Dashboard  from '@screens/home/Dashboard';
import ConfirmationCodeSms  from '@screens/signUp/ConfirmationCodeSms';

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const signInScreens = () => {
  return (
    <Drawer.Navigator
       drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard"  options={{
            headerShown: false,
            icon: 'tachometer-alt',
            category: 'dashboard',
          }} component={Dashboard} />
    </Drawer.Navigator>
  );
}

const signOutScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="confirmationSms" component={ConfirmationCodeSms} />
    </Stack.Navigator>
  );
}

export { signInScreens, signOutScreens };
