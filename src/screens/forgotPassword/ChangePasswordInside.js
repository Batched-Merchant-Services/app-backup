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
import { cleanErrorForgot, getForgotPassword } from '../../store/actions/forgotPassword.actions';
import { toggleSnackbarClose } from '../../store/actions/app.actions';


const ChangePasswordInside = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const dataUser = redux?.user;
  const auth = redux?.auth;
  const forgotData = redux?.forgotPassword;
  const userProfile = dataUser?.dataUser? dataUser?.dataUser : ''
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();
  console.log('auth?.user',auth?.user,'auth',auth)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorForgot());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;
  }, [navigation]);

  function handleChangePass() {
    const countryCode = dataUser?.dataUser?.lada;
    console.log('auth',auth)
    let dataRecovery = {
      email: userProfile?.email,
      phone: '+'+countryCode + userProfile?.phoneNumber,
      type: auth?.type2fa === 2?1:auth?.type2fa === 3?2:3
    }
    console.log('dataRecovery',dataRecovery)
    dispatch(getForgotPassword({ dataRecovery }));
  }

  if (forgotData?.sendMessage) {
   navigation.navigate('ConfirmSms', { page: 'ChangePass' });
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Divider height-15 />
      <View centerH >
      <LottieView source={require('../../assets/animationsLottie/IconSecurityLock.json')} autoPlay loop style={{ width: '90%' }} />
      </View>
      <Divider height-40 />
      <Text h16 regular blue02>{i18n.t('ForgotPassword.textChangePassword')}</Text>
      <Divider height-10 />
      <Text h12 white regular>{i18n.t('ForgotPassword.textChangeYourPasswordPeriodically')}</Text>
      <Divider height-20 />
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={handleChangePass}
        >
          <Text h13 semibold white center>
            Continuar
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}
export default ChangePasswordInside;