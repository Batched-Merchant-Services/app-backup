import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import hamburgerMenu from '@assets/icons/hamburgerMenu.png';
import i18n from '@utils/i18n';
import LottieView from 'lottie-react-native';


const Confirmation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');

  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-10 />
      <View centerH>
        <LottieView source={require('../../assets/animationsLottie/IconCheck.json')} autoPlay loop style={{ width: '90%' }} />
      </View>
      <Divider height-30 />
      <Text h18 regular blue02>{i18n.t('ForgotPassword.confirmation.textPasswordActualized')}</Text>
      <Divider height-20 />
      <View blue01 width-36 height-1 />
      <Divider height-20 />
      <Text h12 white light>{i18n.t('ForgotPassword.confirmation.textIfYouWantToMake')}{' '}<Text h12 white semibold >{i18n.t('ForgotPassword.confirmation.textMyProfile')}{' '}</Text>{i18n.t('ForgotPassword.confirmation.textSectionFrom')}</Text>
      <Divider height-20 />
      <View centerH centerV>
        <ImageResize
          source={hamburgerMenu}
          height={verticalScale(32)}
          width={scale(32)}
        />
      </View>
      
      <View flex-1 bottom>
        <ButtonRounded
          onPress={() => navigation.navigate("Login")}
          disabled={false}
          blue
        >
          <Text h14 semibold white>
            {i18n.t('General.buttonBackToLogin')}
          </Text>
        </ButtonRounded>
        <Divider height-10 />
      </View>
    </BackgroundWrapper>
  );
}
export default Confirmation;