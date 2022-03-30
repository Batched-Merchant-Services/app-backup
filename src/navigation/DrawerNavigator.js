import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '@screens/home/Dashboard';
import ActivationConfirmation from '@screens/home/ActivationConfirmation';
import HomeMyBatched from '@screens/myBatched/HomeMyBatched';
import HomeProfile from '@screens/myProfile/HomeProfile';
import HomeContact from '@screens/contact/HomeContact';
import CustomDrawer from "./DrawerAware";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  console.log('')
 return (
<Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />} drawerStyle={{ width: "100%" }} >
       <Drawer.Screen name="Dashboard" options={{
        headerShown: false,
      }} component={Dashboard} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="HomeMyBatchedB" component={HomeMyBatched} screenOptions={{ headerShown: false }} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="ActivationConfirmation1" component={ActivationConfirmation} screenOptions={{ headerShown: false }} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="HomeProfile" component={HomeProfile} screenOptions={{ headerShown: false }} />
      <Drawer.Screen options={{
        headerShown: false,
      }} name="HomeContact" component={HomeContact} screenOptions={{ headerShown: false }} />
    </Drawer.Navigator>
 );
};
export default DrawerNavigator;