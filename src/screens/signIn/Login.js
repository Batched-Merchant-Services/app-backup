import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar,useColorScheme,TextInput } from 'react-native';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale,verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import Colors from '@styles/Colors'
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './styles'

import Logo from '@assets/brandBatched/logo.png';
const Login = ({ navigation }) => {
  const email = useValidatedInput('email', '');
  const password = useValidatedInput('password', '');

  const isDarkMode = useColorScheme() === 'dark';

  const { data, error, loading } = useQuery(FETCH_TODOS);
  //console.log('data', data, error, loading)

  if (error) {
    console.error(error);
  }

  // if (loading) {
  //   console.log('loading');
  // }

  const backgroundStyle = {
    flex: 1
  };



  return (

    <BackgroundWrapper>
        <ImageResize
            source={Logo}
            height={verticalScale(24)}
            width={scale(169)}
          />
        <FloatingInput
            {...email}
            label={'phone'}
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
          />
          <FloatingInput
            {...password}
            label={'password'}
            autoCapitalize={'none'}
            secureTextEntry
          />
          
          <ButtonRounded
            onPress={() => navigation.navigate("Register")}
            disabled={false}
            size='lg'
          >
            <Text h14 semibold>
              Login
            </Text>
          </ButtonRounded>
    </BackgroundWrapper>


  );
}

export default Login;