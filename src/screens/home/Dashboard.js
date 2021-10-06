import React, { useEffect,useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import Menu from '@assets/icons/hamburgerMenu.png';
import Wallet from '@assets/icons/blue-wallet.png';

import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const redux = useSelector(state => state);

  useEffect(() => {
    console.log('redux', redux)
  }, [])




  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: colors.white,
    flex: 1
  };
  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={Menu} childrenRight={Wallet} menu navigation={navigation}>
      <View blue03 width-320 height-65 centerH centerV>
        <Text h12 white>Validation of reward points will be available in:</Text>
        <Text h20 semibold>30D 12H 47M 18S</Text>
      </View>
      <Divider height-10 />
      <Text h14 blue02 center>Validating reward points today</Text>
      <Text h20 white semibold center>00,000</Text>
      <Divider height-10 />
      <View row>
        <View flex-1>
          <Text h12 blue02 right>Licences In Network</Text>
          <Text h16 white right>00</Text>
        </View>
        <Divider width-10 />
        <View flex-1>
          <Text h12 blue02 left>Licences In Network</Text>
          <Text h16 white left>00</Text>
        </View>
      </View>
      <Divider height-10 />
      <Text h14 blue02 center>Distibution cycle</Text>
      <Text h16 white center>00:00:00</Text>
      <Divider height-10 />
      <View height-240 width-320>

      </View>
      <View flex-1 row>
        <View flex-1>
          <Text h12 blue02 right>Distributed per day</Text>
          <Text h16 white right>00</Text>
        </View>
        <Divider width-10 />
        <View flex-1>
          <Text h12 blue02 center>Points per licence</Text>
          <Text h16 white center>00</Text>
        </View>
        <View flex-1>
          <Text h12 blue02 left>Available this month</Text>
          <Text h16 white left>00</Text>
        </View>
      </View>
      <Divider height-15 />
      <ButtonRounded
        size='lg'
        green
      >
        <Text h14 green>
          Licenses activation
        </Text>
      </ButtonRounded>
      
    </BackgroundWrapper>


  );
}


export default Dashboard;