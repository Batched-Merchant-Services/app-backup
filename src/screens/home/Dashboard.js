import React, { useEffect, useState } from 'react';
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
import CircleTimer from '@assets/home/CircleTimer.png';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Styles from './styles';

import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const redux = useSelector(state => state);
  const [statusParticipate, setStatusParticipate] = useState(true);
  const [statusStayOnline, setStatusStayOnline] = useState(true);

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
      {statusParticipate && (
        <>
        <View style={Styles.borderBlue}>
          <View style={Styles.borderGreen}>
            <ButtonRounded>
              <Text h14 white center medium>
                Participate in today’s distribution cycle
              </Text>
            </ButtonRounded>
          </View>
        </View>
        <Divider height-10 />
        </>
      )}

      {statusStayOnline && (
        <>
          <ButtonRounded>
            <Text h14 white center medium>
             Stay online to participate for 18:32
            </Text>
          </ButtonRounded>
          <View height-5 blue02>
            <View style={{width:'40%'}} height-5 white/>
          </View>
          <Divider height-10 />
        </>
      )}
      <View blue03 height-45 centerH centerV>
        <Text h12 white>Validation of reward points will be available in:</Text>
        <Text h18 semibold>30D 12H 47M 18S</Text>
      </View>
      <Divider height-10 />
      <Text h14 blue02 center>Validating reward points today</Text>
      <Text h18 white semibold center>00,000</Text>
      <Divider height-10 />
      <View row>
        <View flex-1>
          <Text h12 blue02 right>Licences In Network</Text>
          <Text h16 white right semibold>00</Text>
        </View>
        <Divider width-10 />
        <View flex-1>
          <Text h12 blue02 left>Licences In Network</Text>
          <Text h16 white left semibold>00</Text>
        </View>
      </View>
      <View flex-1 height-220>
        <ImageBackground source={CircleTimer} resizeMode="cover" style={Styles.image}>
          <View blue03 centerV marginT-20 style={Styles.containerTime}>
            <Text h30 white>00</Text>
            <Text h20 blue02>%</Text>
          </View>
        </ImageBackground>
      </View>
      <Text h14 blue02 center>Distibution cycle</Text>
      <Text h16 white center semibold>00:00:00</Text>
      <Divider height-20 />
      <View flex-1 row>
        <View flex-1>
          <Text h12 blue02 right>Distributed per day</Text>
          <Text h16 white right semibold>00</Text>
        </View>
        <Divider width-10 />
        <View flex-1>
          <Text h12 blue02 center>Points per licence</Text>
          <Text h16 white center semibold>00</Text>
        </View>
        <View flex-1>
          <Text h12 blue02 left>Available this month</Text>
          <Text h16 white left semibold>00</Text>
        </View>
      </View>
      <Divider height-15 />
      <ButtonRounded
        green
        onPress={() => navigation.navigate("ActivationConfirmation")}
        disabled={false}
        
      >
        <Text h14 green>
          Licenses activation
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>


  );
}


export default Dashboard;