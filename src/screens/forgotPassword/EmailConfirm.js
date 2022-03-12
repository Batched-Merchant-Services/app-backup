import React, { Fragment, useEffect, useState,useRef } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  SnackNotice,
  FloatingInput,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { Animated } from 'react-native';
import Logo from '@assets/brandBatched/logo.svg';
import i18n from '@utils/i18n';
import Styles from './styles'

//actions
import { toggleSnackbarClose, toggleSnackbarOpen } from '@store/actions/app.actions';
import { cleanErrorForgot, getForgotPassword } from '@store/actions/forgotPassword.actions';
import Loading from '../Loading';
import { changeTypeAuth } from '../../store/actions/auth.actions';


const EmailConfirm = ({ navigation, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const forgotData = redux?.forgotPassword;
  const userData = redux?.user;
  const email = useValidatedInput('email', '');
  const phone = useValidatedInput('phone', '');
  const [showInputEmail, setShowInputEmail] = useState(false);
  const [showInputSMS, setShowInputSMS] = useState(false);
  const [animatedEmail,setAnimatedEmail] = useState(new Animated.Value(0))
  const [animatedSms,setAnimatedSms] = useState(new Animated.Value(0))
  const [typeAuthentication,setTypeAuthentication] = useState(2)
  const error = useSelector(state => state?.forgotPassword?.showError);
  const isValidEmail = isFormValid(email);
  const isValidPhone = isFormValid(phone);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorForgot());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;

  }, []);


  useEffect(() => {
    Animated.timing(animatedEmail, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start();

  }, [animatedEmail]);


  useEffect(() => {
    Animated.timing(animatedSms, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start();

  }, [showInputSMS]);



  function handleSendCode() {
    const countryCode = userData?.dataUser?.lada;
    let dataRecovery = {
      email: email?.value,
      phone: '+'+countryCode + phone?.value,
      type: typeAuthentication
    }
    dispatch(getForgotPassword({ dataRecovery }));
  }

  function handleShowEmail() {
    setAnimatedEmail(new Animated.Value(0));
    setTypeAuthentication(2);
    dispatch(changeTypeAuth(3))
    setShowInputEmail(!showInputEmail);
    setShowInputSMS(false);
  }
  function handleShowPhone() {
    setAnimatedSms(new Animated.Value(0));
    setTypeAuthentication(1);
    dispatch(changeTypeAuth(2))
    setShowInputSMS(!showInputSMS);
    setShowInputEmail(false);
  }

  if (forgotData?.sendMessage) {
    const countryCode = userData?.dataUser?.lada;
    navigation.push("ConfirmSms", {
      page: 'LoginChange',
      typeAuth: typeAuthentication,
      email:email?.value,
      phone:'+'+countryCode + phone?.value,
    });
  }
  

  return (
    <BackgroundWrapper navigation={navigation}>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-20 />
      <Text h18 regular blue02>{i18n.t('ForgotPassword.textRecoverYourPassword')}</Text>
      <Divider height-20 />
      <Text h14 light>Select password recovery option</Text>
      <Divider height-20 />
      <Text h11 light white>{i18n.t('ForgotPassword.textYourCodeIsValid')}{' '}<Text h12 semibold white>{i18n.t('ForgotPassword.textFiveMin')}{' '}</Text>,{i18n.t('ForgotPassword.textIfYouCantFind')}</Text>
      <Divider height-20 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link onPress={handleShowEmail}>
          <Text h16 blue02>Correo electronico</Text>
        </Link>
      </View>
      <Divider height-20 />
      {showInputEmail && (
        <Fragment>
          <Animated.View style={{ opacity: animatedEmail }}>
          <Text h12 light white>{i18n.t('ForgotPassword.textEnterYourRegistration')}:</Text>
          <Divider height-10 />
            <FloatingInput
              {...email}
              label={i18n.t('ForgotPassword.inputEmail')}
              autoCapitalize={'none'}
            />
          </Animated.View>
        </Fragment>
      )}
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link onPress={handleShowPhone}>
          <Text h16 blue02>SMS</Text>
        </Link>
      </View>
      <Divider height-20 />
      {showInputSMS && (
        <Fragment>
          <Animated.View style={{ opacity: animatedSms }}>
          <Text h12 light white>{i18n.t('ForgotPassword.textEnterYourRegistrationPhone')}:</Text>
          <Divider height-10 />
            <FloatingInput
              {...phone}
              label={i18n.t('ForgotPassword.inputPhone')}
              autoCapitalize={'none'}
            />
          </Animated.View>
        </Fragment>
      )}
      <Divider height-20 />

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
          onPress={handleSendCode}
          disabled={typeAuthentication === 1?!isValidPhone:!isValidEmail}
          blue
          size='sm'
        >
          <Text h14 semibold>
            {i18n.t('General.buttonNext')}
          </Text>
        </ButtonRounded>
        <Loading modalVisible={forgotData?.isLoadingForgot} />
        <SnackNotice
          visible={error}
          message={forgotData?.error?.message}
        />
      </View>
      <Divider height-15 />
    </BackgroundWrapper>

  );
}


export default EmailConfirm;