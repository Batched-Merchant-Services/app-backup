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
import { scale, verticalScale } from 'react-native-size-matters';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import rectangleConfirm from '@assets/icons/rectangleConfirm.png';
import confirmationCheck from '@assets/icons/confirmationCheckRectangle.png';
import Styles from './styles'
import i18n from '@utils/i18n';
import { cleanContactError } from '@store/actions/contact.actions';


const ConfirmationContact = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-20 />
      <ImageBackground source={rectangleConfirm} resizeMode="cover" style={Styles.image}>
        <ImageResize
          source={confirmationCheck}
          height={verticalScale(90)}
          width={scale(90)}
        />
      </ImageBackground>
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
            navigation.navigate('DrawerScreen', {
              screen: 'Dashboard',
              merge: true
            })
          }}
          disabled={false}
          blue
        >
          <Text h14 semibold white>
            Go to distribution cycle
          </Text>
        </ButtonRounded>
        <Divider height-40 />
        <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue. </Text>
      </View>
    </BackgroundWrapper>
  );
}

export default ConfirmationContact;