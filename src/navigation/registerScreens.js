import * as React from 'react';
import { Dimensions } from 'react-native'
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
import ConfirmSms from '@screens/myBatched/ConfirmSms';
import ConfirmationTransfer from '@screens/myBatched/ConfirmationTransfer';
import HomeProfile from '@screens/myProfile/HomeProfile';
import PersonalInformation from '@screens/myProfile/PersonalInformation';
import ContactInformation from '@screens/myProfile/ContactInformation';
import BankInformation from '@screens/myProfile/BankInformation';
import ProfilePicture from '@screens/myProfile/ProfilePicture';
import VerificationInformation from '@screens/myProfile/VerificationInformation';

import HomeContact from '@screens/contact/HomeContact';
import ConfirmationContact from '@screens/contact/ConfirmationContact';
import LogOut from '@screens/logout';

import Auth2fa from '@screens/auth2fa';
import TwoFactorInstructions from '@screens/auth2fa/TwoFactorInstructions';
import TwoFactorActivation from '@screens/auth2fa/TwoFactorActivation';
import TwoFactorCodeActivation from '@screens/auth2fa/TwoFactorCodeActivation';
import TwoFactorConfirmationActivation from '@screens/auth2fa/TwoFactorConfirmationActivation';
import Auth2faSms from '@screens/auth2fa/auth2faSms';
import ActivationSms from '@screens/auth2fa/auth2faSms/ActivationSms';
import Auth2faEmail from '@screens/auth2fa/auth2faEmail';
import ActivationEmail from '@screens/auth2fa/auth2faEmail/ActivationEmail';
import Auth2faApp from '@screens/auth2fa/auth2faApp';
import ConfirmationAuth from '@screens/auth2fa/ConfirmationAuth';
import TwoFactorOptions from '@screens/auth2fa/TwoFactorOptions';
import EnterOldCode from '@screens/auth2fa/changeToNewDevice/EnterOldCode';
import SupportAuthentication from '@screens/auth2fa/SupportAuthentication';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreen = () => {
  //aqui pondremos las que contienen un menu deslizable
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />} drawerStyle={{ width: "100%" }}>
      <Drawer.Screen name="Dashboard" options={{
        headerShown: false,
      }} component={Dashboard} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="ActivationConfirmation" component={ActivationConfirmation} screenOptions={{ headerShown: false }} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="HomeMyBatched" component={HomeMyBatched} screenOptions={{ headerShown: false }} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="HomeProfile" component={HomeProfile} screenOptions={{ headerShown: false }} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="HomeContact" component={HomeContact} screenOptions={{ headerShown: false }} />
    </Drawer.Navigator>

  );
}

const signOutScreens = () => {
  //aqui pondremos las que contienen un menu 
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="CodeSms" component={CodeSms} />
      <Stack.Screen name="ConfirmSms" component={ConfirmSms} />
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
    <Stack.Navigator initialRouteName="BankInformation" screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="ConfirmationTransfer" component={ConfirmationTransfer} />
      <Stack.Screen name="TransferOption" component={TransferOption} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
      <Stack.Screen name="ContactInformation" component={ContactInformation} />
      <Stack.Screen name="BankInformation" component={BankInformation} />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
      <Stack.Screen name="VerificationInformation" component={VerificationInformation} />
      <Stack.Screen name="ConfirmationContact" component={ConfirmationContact} />
      <Stack.Screen name="LogOut" component={LogOut} />
      <Stack.Screen name="Auth2fa" component={Auth2fa} />
      <Stack.Screen name="TwoFactorInstructions" component={TwoFactorInstructions} />
      <Stack.Screen name="TwoFactorActivation" component={TwoFactorActivation} />
      <Stack.Screen name="TwoFactorCodeActivation" component={TwoFactorCodeActivation} />
      <Stack.Screen name="TwoFactorConfirmationActivation" component={TwoFactorConfirmationActivation} />
      <Stack.Screen name="TwoFactorOptions" component={TwoFactorOptions} />
      <Stack.Screen name="Auth2faSms" component={Auth2faSms} />
      <Stack.Screen name="ActivationSms" component={ActivationSms} />
      <Stack.Screen name="Auth2faEmail" component={Auth2faEmail} />
      <Stack.Screen name="ActivationEmail" component={ActivationEmail} />
      <Stack.Screen name="Auth2faApp" component={Auth2faApp} />
      <Stack.Screen name="ConfirmationAuth" component={ConfirmationAuth} />
      <Stack.Screen name="EnterOldCode" component={EnterOldCode} />
      <Stack.Screen name="SupportAuthentication" component={SupportAuthentication} />
    </Stack.Navigator>
  );
}

export { signInScreens, signOutScreens, DrawerScreen };
