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


const Auth2faEmail = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Divider height-15 />
      <View centerH>
      <LottieView source={require('../../../assets/animationsLottie/IconAuthEmail.json')} autoPlay loop style={{ width: scale(120),height:verticalScale(120) }} />
        {/* <IconAuthEmail width={scale(200)} height={verticalScale(210)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} /> */}
      </View>
      <Divider height-20 />
      <Text h16 regular blue02>{i18n.t('Auth2fa.textEmailAuthentication')}</Text>
      <Divider height-10 />
      <Text h10 white regular>{i18n.t('Auth2fa.textUseASecurityCodeSentTo')}</Text>
      <Divider height-20 />
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('ActivationEmail')}
        >
          <Text h13 semibold white center>
            {i18n.t('Auth2fa.textActivateEmailAuthentication')}
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}
export default Auth2faEmail;