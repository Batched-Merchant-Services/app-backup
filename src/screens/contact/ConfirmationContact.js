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
import i18n from '@utils/i18n';

const ConfirmationContact = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-20 />
      <View centerH>
        <LottieView source={require('../../assets/animationsLottie/IconMessage.json')} autoPlay loop style={{ width: '90%' }} />
      </View>
      <Divider height-30 />
      <Text h18 regular blue02>{i18n.t('contact.textMessageSent')}</Text>
      <Divider height-20 />
      <View blue01 width-36 height-1 />
      <Divider height-20 />
      <Text h16 white>{i18n.t('contact.textWeHaveReceived')}</Text>
      <Divider height-25 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={() => {
            navigation.navigate('Dashboard')
          }}
          disabled={false}
          blue
        >
          <Text h14 semibold white>
            Go to distribution cycle
          </Text>
        </ButtonRounded>
        <Divider height-40 />
      </View>
    </BackgroundWrapper>
  );
}

export default ConfirmationContact;