import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./DrawerAware";
import Login from '@screens/signIn/Login';
import Register from '@screens/signUp/Register';
import CodeSms from '@screens/signUp/CodeSms';
import TermsAndConditions from '@screens/signUp/TermsAndConditions';
import SecretAnswer from '@screens/signUp/SecretAnswer';
import ReferralCode from '@screens/licenses/ReferralCode';
import GetLicenses from '@screens/licenses/GetLicenses';
import SelectTypeLicense from '@screens/licenses/SelectTypeLicense';
import TransferCryptoCurrency from '@screens/licenses/TransferCryptoCurrency';
import QrCodeTransaction from '@screens/licenses/QrCodeTransaction';
import ConfirmationLicenses from '@screens/licenses/ConfirmationLicenses';
import LoginCode from '@screens/signUp/LoginCode';
import RegisterProfileBasic from '@screens/signUp/RegisterProfileBasic';
import CreateNewPassword from '@screens/signUp/CreateNewPassword';
import AccountConfirmation from '@screens/signUp/AccountConfirmation';
import NewPin from '@screens/pin/NewPin';
import PinConfirmation from '@screens/pin/PinConfirmation';
import NewPassword from '@screens/forgotPassword/NewPassword';
import EmailConfirm from '@screens/forgotPassword/EmailConfirm';
import Confirmation from '@screens/forgotPassword/Confirmation';
//Home
import Dashboard from '@screens/home/Dashboard';
import ActivationConfirmation from '@screens/home/ActivationConfirmation';
import HomeMyBatched from '@screens/myBatched/HomeMyBatched';
import TransferOption from '@screens/myBatched/TransferOption';
import ConfirmationTransfer from '@screens/myBatched/ConfirmationTransfer';





const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreen = () => {
  //aqui pondremos las que contienen un menu deslizable
  return (
    <Drawer.Navigator initialRouteName="HomeMyBatched" drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard" options={{
        headerShown: false,
        icon: 'tachometer-alt',
        category: 'dashboard',
      }} component={Dashboard} />
      <Drawer.Screen options={{
        headerShown: false,
        icon: 'tachometer-alt',
        category: 'dashboard',
      }} name="ActivationConfirmation" component={ActivationConfirmation} screenOptions={{ headerShown: false }} />
      <Drawer.Screen options={{
        headerShown: false,
        icon: 'tachometer-alt',
        category: 'dashboard',
      }} name="HomeMyBatched" component={HomeMyBatched} screenOptions={{ headerShown: false }} />
      {/* <Drawer.Screen options={{
        headerShown: false,
        category: 'dashboard',
      }} name="TransferOption" component={TransferOption} screenOptions={{ headerShown: false }} /> */}
      

    </Drawer.Navigator>

  );
}

const signOutScreens = () => {
   //aqui pondremos las que contienen un menu 
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
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
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="EmailConfirm" component={EmailConfirm} />
      <Stack.Screen name="ConfirmationForgot" component={Confirmation} />
    </Stack.Navigator>
  );
}
const signInScreens = () => {
  //aqui pondremos las que no contienen un menu  pero son de adentro haciendo login
 return (
   <Stack.Navigator initialRouteName="ConfirmationTransfer" screenOptions={{ headerShown: false }}>
     <Stack.Screen name="ConfirmationTransfer" component={ConfirmationTransfer} />
     <Stack.Screen name="TransferOption" component={TransferOption} />
     
   </Stack.Navigator>
 );
}

export { signInScreens, signOutScreens,DrawerScreen };
