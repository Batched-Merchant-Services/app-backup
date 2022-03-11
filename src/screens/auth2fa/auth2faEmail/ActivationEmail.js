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
import i18n from '@utils/i18n';
import { validateCodeEmail,Activation2faEmail,cleanError } from '@store/actions/auth.actions';
import Loading from '../../Loading';
import { maskEmail } from '../../../utils/formatters';

const ActivationEmail = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const authData = redux?.auth;
  const dataUser = redux?.user;
  const brandTheme = appData?.Theme?.colors;
  const codeActivation = useValidatedInput('number', '');
  const [codeSmsEmail, setCodeSmsEmail] = useState(authData?.dataCode);
  const error = useSelector(state => state?.auth?.showError);

  function getInfo(code) {
    const codeComposition = codeSmsEmail + '-' + code;
    dispatch(Activation2faEmail({codeComposition}));
  }

  useEffect(() => {
    dispatch(validateCodeEmail());
    dispatch(cleanError());
  }, []);

  if (authData?.successActivateEmail) {
    navigation.navigate('ConfirmationAuth',{ page:'Email'})
  }

  useEffect(() => {
    setCodeSmsEmail(authData?.dataCode);
  }, [authData?.dataCode])

  console.log('authData?.isActivateSms',authData?.isActivateSms,authData?.isValidateCode)

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Text h20 regular blue02>{i18n.t('Auth2fa.textActivateEmailAuthentication')}</Text>
      <Divider height-20 />
      <Text h10 white regular>{i18n.t('Auth2fa.textToEnableEmailAuthentication')}{' '}<Text white semibold>{maskEmail(dataUser?.dataUser?.email)}</Text></Text>
      <Divider height-20 />
      <Text h10 white regular>{i18n.t('Auth2fa.textPleaseEnterTheSecurity')}</Text>
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
      <Loading modalVisible={ authData?.isActivateEmail || authData?.isValidateCode } />
    </BackgroundWrapper>


  );
}


export default ActivationEmail;