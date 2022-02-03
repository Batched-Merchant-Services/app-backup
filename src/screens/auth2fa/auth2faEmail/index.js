import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import Styles from './styles';
import IconAuthEmail from '@assets/iconSVG/IconAuth2fa/IconAuthEmail';

const Auth2faEmail = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerH>
        <IconAuthEmail width={scale(200)} height={verticalScale(210)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <Text h16 regular blue02>Autenticación por Email</Text>
      <Divider height-10 />
      <Text h10 white regular>Use a security code sent to your email address as your Two-Factor Authentication (2FA). The security code will be sent to the address associated with your account. You’ll need to use it in when you sign in.</Text>
      <Divider height-20 />
      
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('ActivationEmail')}
        >
          <Text h13 semibold white center>
            Activar autenticación vía Email
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}
export default Auth2faEmail;