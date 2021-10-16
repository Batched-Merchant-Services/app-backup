import React, { useEffect,useState } from 'react';
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
import { scale,verticalScale } from 'react-native-size-matters';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import rectangleConfirm from '@assets/icons/rectangleConfirm.png';
import confirmationCheck from '@assets/icons/confirmationCheck.png';
import Styles from './styles'
import i18n from '@utils/i18n';


const ConfirmationLicenses = ({ navigation,navigation: { goBack }  }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');

  
  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Text h18 regular blue02>{i18n.t('Licenses.textQRCodeForTransaction')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('Licenses.textScanTheFollowingQR')}</Text>
      <Divider height-25 />
      <ImageBackground source={rectangleConfirm} resizeMode="cover" style={Styles.image}>
        <ImageResize
          source={confirmationCheck}
          height={verticalScale(90)}
          width={scale(90)}
        />
      </ImageBackground>
      <Divider height-20 />
      <Text h18 regular blue02>{i18n.t('Licenses.textAwaitingConfirmation')}</Text>
      <Divider height-10 />
      <Text h12 white semibold>{i18n.t('Licenses.textYourNodesWillBe')}</Text>
      <Divider height-10 />
      <Text h12 white semibold>{i18n.t('Licenses.textTheConfirmationTimeCan')}{' '}<Text h12 white light>{i18n.t('Licenses.textDependingOnHowFastTheBlockchain')}</Text> </Text>
      <Divider height-120 />
      <ButtonRounded
        onPress={() => navigation.navigate("Dashboard")}
        disabled={false}
        blue
        size='lg'
      >
        <Text h14 semibold white>
          {i18n.t('Licenses.buttonGoToDistribution')}
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>


  );
}


export default ConfirmationLicenses;