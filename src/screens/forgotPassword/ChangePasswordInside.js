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
import LottieView from 'lottie-react-native';


const ChangePasswordInside = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  function handleChangePass() {
    navigation.navigate('SignOut', {
      screen: 'ConfirmSms',
      params: { page: 'ChangePass' }
    });
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Divider height-15 />
      <View centerH >
      <LottieView source={require('../../assets/animationsLottie/IconSecurityLock.json')} autoPlay loop style={{ width: '90%' }} />
      </View>
      <Divider height-40 />
      <Text h16 regular blue02>{i18n.t('ForgotPassword.textChangePassword')}</Text>
      <Divider height-10 />
      <Text h12 white regular>{i18n.t('ForgotPassword.textChangeYourPasswordPeriodically')}</Text>
      <Divider height-20 />
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={handleChangePass}
        >
          <Text h13 semibold white center>
            {i18n.t('Auth2fa.textActivateEmailAuthentication')}
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}
export default ChangePasswordInside;