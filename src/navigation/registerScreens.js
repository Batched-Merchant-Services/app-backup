import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./DrawerAware";
import Login from '@screens/signIn/Login';
import Register from '@screens/signUp/Register';
import CodeSms  from '@screens/signUp/CodeSms';
import TermsAndConditions  from '@screens/signUp/TermsAndConditions';
import SecretAnswer from '@screens/signUp/SecretAnswer';
import Dashboard  from '@screens/home/Dashboard';
import ReferralCode  from '@screens/licenses/ReferralCode';
import GetLicenses  from '@screens/licenses/GetLicenses';
import SelectTypeLicense  from '@screens/licenses/SelectTypeLicense';
import TransferCryptoCurrency  from '@screens/licenses/TransferCryptoCurrency';
import QrCodeTransaction  from '@screens/licenses/QrCodeTransaction';
import ConfirmationLicenses  from '@screens/licenses/ConfirmationLicenses';
import LoginCode  from '@screens/signUp/LoginCode';
import RegisterProfileBasic  from '@screens/signUp/RegisterProfileBasic';
import CreateNewPassword  from '@screens/signUp/CreateNewPassword';
import AccountConfirmation  from '@screens/signUp/AccountConfirmation';
import NewPin  from '@screens/pin/NewPin';
import PinConfirmation  from '@screens/pin/PinConfirmation';



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
    <Stack.Navigator initialRouteName="AccountConfirmation" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="CodeSms" component={CodeSms} />
      <Stack.Screen name="TermConditions" component={TermsAndConditions} />
      <Stack.Screen name="SecretAnswer" component={SecretAnswer} />
      <Stack.Screen name="ReferralCode" component={ReferralCode} />
      <Stack.Screen name="GetLicenses" component={GetLicenses} />
      <Stack.Screen name="SelectLicense" component={SelectTypeLicense} />
      <Stack.Screen name="TransferCryptoCurrency" component={TransferCryptoCurrency} />
      <Stack.Screen name="QrCodeTransaction" component={QrCodeTransaction} />
      <Stack.Screen name="ConfirmationLicenses" component={ConfirmationLicenses} />
      <Stack.Screen name="LoginCode" component={LoginCode} />
      <Stack.Screen name="RegisterProfileBasic" component={RegisterProfileBasic} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="NewPin" component={NewPin} />
      <Stack.Screen name="PinConfirmation" component={PinConfirmation} />
      <Stack.Screen name="AccountConfirmation" component={AccountConfirmation} />
      
      
      
      
    </Stack.Navigator>
  );
}

export { signInScreens, signOutScreens };
