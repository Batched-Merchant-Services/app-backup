import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '@utils/i18n';
import LottieView from 'lottie-react-native';
import { cleanError,logoutSession } from '../../store/actions/auth.actions';
import { toggleSnackbarClose } from '../../store/actions/app.actions';
import Loading from '../Loading';

const Logout = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const authData = redux?.auth;

  useEffect(() => {
    dispatch(cleanError());
    dispatch(toggleSnackbarClose());
  }, [dispatch]);

  function handleLogOut() {
    dispatch(logoutSession());
    navigation.navigate('Login');
  }

  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-20 />
      <View centerH>
        <LottieView source={require('@assets/animationsLottie/IconLogout.json')} autoPlay loop style={{ width: '90%' }} />
      </View>
        <Divider height-40 />
      <Divider height-30 />
      <Text h18 regular blue02>{i18n.t('Logout.textLogout')}</Text>
      <Divider height-20 />
      <Text h18 regular blue02>{i18n.t('Logout.textAreYouSure')}</Text>
      <Divider height-20 />
      <View blue01 width-36 height-1 />

      <Divider height-25 />
      <Text h12 white>{i18n.t('Logout.textIfYouAreFullActive')}</Text>
      <Divider height-25 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('Logout.buttonStayLoggedIn')}
          </Text>
        </ButtonRounded>
        <Divider width-10 />
        <ButtonRounded
          onPress={handleLogOut}
          //disabled={!isValid}
          blue
          size='sm'
        >
          <Text h14 semibold>
            {i18n.t('Logout.buttonLogout')}
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-25 />
      <Loading modalVisible={authData?.isLoggedOut} />
    </BackgroundWrapper>
  );
}

export default Logout;