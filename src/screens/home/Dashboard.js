import React, { useEffect } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  LinksTerms,
  ButtonRounded,
  FloatingInput,
  StepIndicator,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '@assets/brandBatched/logo.svg';
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
    <BackgroundWrapper>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Text>Hello, I am your Dashboard!</Text>
      <ButtonRounded
        onPress={() => navigation.openDrawer()}
        disabled={false}
        dark
        size='sm'
      >
        <Text h14 semibold blue02>
          Open drawer
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>


  );
}


export default Dashboard;