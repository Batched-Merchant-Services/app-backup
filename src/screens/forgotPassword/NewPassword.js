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

const NewPassword = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const password = useValidatedInput('password', '');
  const confirmPassword = useValidatedInput('confirmPassword', '', {
    validationParams: [password.value]
  });
  const isValid = isFormValid(password, confirmPassword);

  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper navigation={navigation}>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-20 />
      <Text h16 regular blue02>{i18n.t('ForgotPassword.textRecoverYourPassword')}</Text>
      <Divider height-10 />
      <Text h16 medium white>{i18n.t('ForgotPassword.textDefineYourNew')}</Text>
      <Divider height-10 />
      <Text h12 light white>{i18n.t('ForgotPassword.textAtLeast')}{' '}<Text h12 semibold white>{i18n.t('ForgotPassword.textEightCharacters')}{' '}</Text>{i18n.t('ForgotPassword.textWithNonConsecutive')}</Text>
      <Divider height-10 />
      <FloatingInput
        {...password}
        label={i18n.t('ForgotPassword.inputDefineYourPassword')}
        autoCapitalize={'none'}
        secureTextEntry
      />
      <Divider height-15 />
      <FloatingInput
        {...confirmPassword}
        label={i18n.t('ForgotPassword.inputRepeatYourPassword')}
        autoCapitalize={'none'}
        secureTextEntry
      />
      <Divider height-30 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => navigation.navigate("ConfirmationForgot")}
          disabled={!isValid}
          blue
        >
          <Text h14 semibold white>
            {i18n.t('General.buttonSave')}
          </Text>
        </ButtonRounded>
      </View>

    </BackgroundWrapper>


  );
}


export default NewPassword;