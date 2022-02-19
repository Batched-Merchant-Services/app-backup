import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  PinInput,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconClock from '@assets/iconSVG/IconAuth2fa/IconClock';
import i18n from '@utils/i18n';
import { Activation2faApp } from '@store/actions/auth.actions';
import Loading from '../Loading';

const TwoFactorActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const params = route?.params;
  const authData = redux?.auth;
  const codeActivation = useValidatedInput('number', '');
  const error = useSelector(state => state?.auth?.showError);
  const { colors } = useTheme();
  //isActivateApp successActivateApp

  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function getInfo(code) {
    console.log('code',code)
    dispatch(Activation2faApp({code}));
  }

  if (authData?.successActivateApp) {
    navigation.navigate('TwoFactorConfirmationActivation');
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerH>
        <IconClock width={scale(180)} height={verticalScale(180)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      {params.page !== 'change' &&(
        <Text h16 regular blue02>{i18n.t('Auth2fa.textActivateTwoFactorAuthentication')}</Text>
      )}
      {params.page === 'change' &&(
        <Text h16 regular blue02>{i18n.t('Auth2fa.textChangeTwoFactorAuthentication')}</Text>
      )}
      <Divider height-20 />
      {params.page !== 'change' &&(
        <Text h10 white semibold>{i18n.t('Auth2fa.textEnterTheCodeYou')}{' '}<Text white regular>{i18n.t('Auth2fa.textIfTimeRunsOut')}</Text></Text>
      )}
      {params.page === 'change' &&(
        <Text h10 white semibold>{i18n.t('Auth2fa.textEnterTheCodeYouGot')}<Text white regular>{i18n.t('Auth2fa.textIfTimeRunsOut')}</Text></Text>
      )}
      <Divider height-30 />
      <Text h12 blue02>{i18n.t('home.myBatchedTransfer.textConfirmationCode')}</Text>
      <Divider height-10 />
      <PinInput {...codeActivation} onSubmit={(code)=>getInfo(code) }/>
      <Divider height-20 />
      <View flex-1 bottom>
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
        <SnackNotice
          visible={error}
          message={authData?.error?.message}
        />
      </View>
      <Loading modalVisible={authData?.isActivateApp} />
    </BackgroundWrapper>


  );
}


export default TwoFactorActivation;