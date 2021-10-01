import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./DrawerAware";
import Login from '@screens/signIn/Login';
import Register from '@screens/signUp/Register';
import ConfirmationCodeSms  from '@screens/signUp/ConfirmationCodeSms';
import TermsAndConditions  from '@screens/signUp/TermsAndConditions';
import SecretAnswer from '@screens/signUp/SecretAnswer';

import Dashboard  from '@screens/home/Dashboard';
import ReferralCode  from '@screens/licenses/ReferralCode';
import GetLicenses  from '@screens/licenses/GetLicenses';
import SelectTypeLicense  from '@screens/licenses/SelectTypeLicense';
import TransferCryptoCurrency  from '@screens/licenses/TransferCryptoCurrency';
import QrCodeTransaction  from '@screens/licenses/QrCodeTransaction';
import ConfirmationLicenses  from '@screens/licenses/ConfirmationLicenses';


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
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard"  options={{
            headerShown: false,
            icon: 'tachometer-alt',
            category: 'dashboard',
          }} component={Dashboard} />
      {/* <Drawer.Screen name="ReferralCode"  options={{
        headerShown: false,
      }} component={ReferralCode} />
      <Drawer.Screen name="GetLicenses"  options={{
        headerShown: false,
      }} component={GetLicenses} />
      <Drawer.Screen name="SelectLicense"  options={{
        headerShown: false,
      }} component={SelectTypeLicense} /> */}
    </Drawer.Navigator>
  );
}

const signOutScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ConfirmationSms" component={ConfirmationCodeSms} />
      <Stack.Screen name="TermConditions" component={TermsAndConditions} />
      <Stack.Screen name="SecretAnswer" component={SecretAnswer} />
      <Stack.Screen name="ReferralCode" component={ReferralCode} />
      <Stack.Screen name="GetLicenses" component={GetLicenses} />
      <Stack.Screen name="SelectLicense" component={SelectTypeLicense} />
      <Stack.Screen name="TransferCryptoCurrency" component={TransferCryptoCurrency} />
      <Stack.Screen name="QrCodeTransaction" component={QrCodeTransaction} />
      <Stack.Screen name="ConfirmationLicenses" component={ConfirmationLicenses} />
      
      
    </Stack.Navigator>
  );
}

export { signInScreens, signOutScreens };
