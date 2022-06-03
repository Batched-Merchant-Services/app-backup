import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconAuthSms from '@assets/iconSVG/IconAuth2fa/IconAuthSms';
import LottieView from 'lottie-react-native';

const Auth2faSms = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);



  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
     <Divider height-15/>
      <View centerH>
        <LottieView source={require('../../../assets/animationsLottie/IconAuthSms.json')} autoPlay loop style={{ width: '90%' }} />
        {/* <IconAuthSms width={scale(200)} height={verticalScale(210)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} /> */}
      </View>
      <Divider height-20 />
      <Text h16 regular blue02>{i18n.t('Auth2fa.textSMSAuthentication')}</Text>
      <Divider height-10 />
      <Text h10 white regular>{i18n.t('Auth2fa.textUseYourPhoneAsYourTwoFactor')}</Text>
      <Divider height-20 />
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.push('ActivationSms')}
        >
          <Text h13 semibold white center>
            {i18n.t('Auth2fa.textActivateAuthenticationSMS')}
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}
export default Auth2faSms;