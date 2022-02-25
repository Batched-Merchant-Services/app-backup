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

const AccountConfirmation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');



  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-10 />
      <ImageBackground source={rectangleConfirm} resizeMode="cover" style={Styles.image}>
        <ImageResize
          source={confirmationCheck}
          height={verticalScale(90)}
          width={scale(90)}
        />
      </ImageBackground>
      <Divider height-30 />
      <Text h18 regular blue02>{i18n.t('Register.textAccountSuccessfully')}</Text>
      <Text h18 regular blue02>{i18n.t('Register.textCreated')}</Text>
      <Divider height-20 />
      <View blue01 width-36 height-1/>
      <Divider height-20/>
      <Text h12 white light>{i18n.t('Register.textYouCanLoginWith')}</Text>
        <View flex-1 bottom>
          <ButtonRounded
            onPress={() => navigation.navigate("Login")}
            disabled={false}
            blue
          >
            <Text h14 semibold white>
              {i18n.t('Register.buttonBackToLogin')}
            </Text>
          </ButtonRounded>
          <Divider height-40 />
        </View>
    </BackgroundWrapper>


  );
}


export default AccountConfirmation;