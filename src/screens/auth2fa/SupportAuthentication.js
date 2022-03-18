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
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import i18n from '@utils/i18n';

const SupportAuthentication = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  return (
    <BackgroundWrapper showNavigation={true}  navigation={navigation}>
       <Divider height-30 />
      <Text h16 regular blue02>{i18n.t('Auth2fa.textToSupportAuthentication')}</Text>
      <Divider height-20 />
      <Text h14 white semibold>{i18n.t('Auth2fa.textToStartANewConfiguration')}</Text>
      <Divider height-20 />
      <Text h12 light white>{i18n.t('Auth2fa.textOpenTheAuthenticatorApp')}</Text>
      <Divider height-20 />
      <Text h12 light white>{i18n.t('Auth2fa.textAddANewAccount')}</Text>
      <Divider height-20 />
      <Text h12 light white>{i18n.t('Auth2fa.textSelectTheManualOption')}</Text>

      {/* <Loading modalVisible={points?.isLoadingRewardsPoints} /> */}
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('Auth2fa')}
        >
          <Text h13 semibold white center>
            {i18n.t('Auth2fa.linkContinue')}
          </Text>
        </ButtonRounded>
        {/* <SnackNotice
          visible={error}
          message={points?.error?.message}
          timeout={3000}
        /> */}
      </View>
    </BackgroundWrapper>


  );
}


export default SupportAuthentication;