import React, { Fragment, useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  FloatingInput,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import Logo from '@assets/brandBatched/logo.svg';
import i18n from '@utils/i18n';
import Styles from './styles'

//actions
import { toggleSnackbarClose, toggleSnackbarOpen } from '@store/actions/app.actions';
import { cleanErrorForgot, confirmForgotPassword } from '@store/actions/forgotPassword.actions';
import Loading from '../Loading';
import { generateRSA } from '@utils/api/encrypt';
import LottieView from 'lottie-react-native';

const NewPassword = ({ navigation, navigation: { goBack }, route }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const forgotData = redux?.forgotPassword;
  const auth = redux?.auth;
  const code = route?.params?.code;
  const params = route?.params;
  const password = useValidatedInput('password', '');
  const confirmPassword = useValidatedInput('confirmPassword', '', {
    validationParams: [password.value]
  });
  const isValid = isFormValid(password, confirmPassword);
  const error = useSelector(state => state?.forgotPassword?.showError);

  useEffect(() => {
    dispatch(cleanErrorForgot());
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorForgot());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;

  }, []);


  if (forgotData?.finishForgotSuccess) {
    navigation.push("ConfirmationForgot",{page: params?.page});
  }

  function handleSetPassword() {
  
    const codeComposition = auth?.type2fa === 1 ? '2fa' + '-' + code : forgotData?.codeLeft + '-' + code;
    let dataConfirm = {
      token: auth?.type2fa === 1 ? forgotData?.codeLeft : code,
      code: codeComposition,
      password: generateRSA(password?.value),
      confirmPassword: generateRSA(confirmPassword?.value)
    }
    dispatch(confirmForgotPassword({ dataConfirm }));

  }

  return (
    <BackgroundWrapper navigation={navigation}>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-20 />
      <View centerH>
        <LottieView source={require('../../assets/animationsLottie/IconCheck.json')} autoPlay loop style={{ width: '90%' }} />
      </View>
      <Divider height-30 />
      {params?.page !== 'ChangePass' && (
        <Fragment>
          <Text h16 regular blue02>{i18n.t('ForgotPassword.textRecoverYourPassword')}</Text>
          <Divider height-10 />
        </Fragment>

      )}
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
          onPress={handleSetPassword}
          disabled={!isValid}
          blue
          size='sm'
        >
          <Text h14 semibold>
            {i18n.t('General.buttonSave')}
          </Text>
        </ButtonRounded>
      </View>
      <Loading modalVisible={forgotData?.isLoadingForgot} />
      <View bottom>
       
      </View>
      <SnackNotice
          visible={error}
          message={forgotData?.error?.message}
          timeout={3000}
        />
    </BackgroundWrapper>


  );
}


export default NewPassword;