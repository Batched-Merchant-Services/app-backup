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
import IconAuthEmail from '@assets/iconSVG/IconAuth2fa/IconAuthEmail';

const Auth2faApp = ({ navigation, route, navigation: { goBack } }) => {
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
      <Text h16 regular blue02>Autenticación de dos factores</Text>
      <Divider height-10 />
      <Text h10 white regular>Use an Authenticator App as your Two-Factor Authentication (2FA). When you sign in you’ll be required to use the security code provided by your Authenticator App.</Text>
      <Divider height-20 />
      
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('ActivationEmail')}
        >
          <Text h13 semibold white center>
            Activar autenticación vía App
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}
export default Auth2faApp;