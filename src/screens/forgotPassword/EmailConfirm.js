import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  FloatingInput,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import Logo from '@assets/brandBatched/logo.svg';
import i18n from '@utils/i18n';
import Styles from './styles'

const EmailConfirm = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const email = useValidatedInput('email', '');
  const referenceCode = useValidatedInput('sms', '');
  const isValid = isFormValid(email,referenceCode);

  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper navigation={navigation}>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-20 />
      <Text h16 regular blue02>{i18n.t('ForgotPassword.textRecoverYourPassword')}</Text>
      <Divider height-10 />
      <Text h16 medium white>{i18n.t('ForgotPassword.textEmailConfirm')}</Text>
      <Divider height-10 />
      <Text h12 light white>{i18n.t('ForgotPassword.textEnterYourRegistration')}:</Text>
      <Divider height-10 />
      <FloatingInput
        {...email}
        label={i18n.t('ForgotPassword.inputEmail')}
        autoCapitalize={'none'}
      />
      <Divider height-10 />
      <ButtonRounded
        onPress={() => goBack()}
        disabled={false}
        dark
      >
        <Text h14 semibold blue02>
          {i18n.t('ForgotPassword.buttonSendCode')}
        </Text>
      </ButtonRounded>
      <Divider height-20 />
      <Text h12 light white>{i18n.t('ForgotPassword.textYourCodeIsValid')}{' '}<Text h12 semibold white>{i18n.t('ForgotPassword.textFiveMin')}{' '}</Text>,{i18n.t('ForgotPassword.textIfYouCantFind')}</Text>
      <Divider height-20 />
      <FloatingInput
        {...referenceCode}
        label={i18n.t('ForgotPassword.inputSixDigits')}
        autoCapitalize={'none'}
      />
      <Divider height-30 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('General.buttonBack')}
          </Text>
        </ButtonRounded>
        <Divider width-10 />
          <ButtonRounded
            onPress={() => navigation.navigate("PinConfirmation",{page:'forgotPassword'})}
            disabled={!isValid}
            blue
            size='sm'
          >
            <Text h14 semibold>
            {i18n.t('General.buttonNext')}
            </Text>
          </ButtonRounded>
      </View>
      
    </BackgroundWrapper>

  );
}


export default EmailConfirm;