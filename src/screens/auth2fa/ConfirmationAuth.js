import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import IconSecurityLock from '@assets/iconSVG/IconAuth2fa/IconSecurityLock';
import i18n from '@utils/i18n';
import LottieView from 'lottie-react-native';

const ConfirmationAuth = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const params = route?.params;
  const { colors } = useTheme();

  return (
    <BackgroundWrapper showNavigation={true}  navigation={navigation}>
     <Divider height-15 />
      <View centerH >
        <LottieView source={require('../../assets/animationsLottie/IconSecurityLock.json')} autoPlay loop style={{ width: scale(120),height:verticalScale(120) }} />
        {/* <IconSecurityLock width={scale(180)} height={verticalScale(180)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} /> */}
      </View>
      <Divider height-15 />
      <View width-170>
      {params?.page === 'SMS' &&(
        <Text h18 regular blue02>{i18n.t('Auth2fa.textSMSAuthenticationActivated')}</Text>
      )}
      {params?.page === 'Email' &&(
        <Text h18 regular blue02>{i18n.t('Auth2fa.textEmailAuthenticationActivated')}</Text>
      )}
      {params?.page === 'App' &&(
        <Text h18 regular blue02>{i18n.t('Auth2fa.textTwoFactorAuthenticationActivated')}</Text>
      )}
      
      </View>
      <Divider height-20 />
      <View blue01 width-36 height-1 />
      <Divider height-20 />
      <Text h13 white regular>{i18n.t('Auth2fa.textRememberToEnterSixDigits')} 
      {params?.page === 'SMS' &&(
        <Text blue02 semibold>{' '}{i18n.t('Auth2fa.textYouWillReceivePhone')}{' '}</Text>
      )} 
      {params?.page === 'Email' &&(
        <Text  blue02>{' '}{i18n.t('Auth2fa.textYouWillReceiveEmail')}{' '}</Text>
      )}
      {params?.page === 'App' &&(
        <Text  blue02>{' '}{i18n.t('Auth2fa.textYouWillReceiveApp')}{' '}</Text>
      )}
      {i18n.t('Auth2fa.textEveryTimeYouLog')}</Text>
      <Divider height-20 />
      
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('Auth2fa')}
        >
          <Text h13 semibold white center>
          {i18n.t('Auth2fa.buttonBackToSecurity')}
          </Text>
        </ButtonRounded>
        {/* <SnackNotice
          visible={error}
          message={points?.error?.message}
          timeout={3000}
        /> */}
      </View>
    </BackgroundWrapper>


  );
}


export default ConfirmationAuth;