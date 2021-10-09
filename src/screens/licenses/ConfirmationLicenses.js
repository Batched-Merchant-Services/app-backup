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

const ConfirmationLicenses = ({ navigation,navigation: { goBack }  }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');

  
  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Text h18 regular blue02>QR code for transaction</Text>
      <Divider height-10 />
      <Text h12 white light>Scan the following QR code from your crypto wallet to make the transfer.</Text>
      <Divider height-25 />
      <ImageBackground source={rectangleConfirm} resizeMode="cover" style={Styles.image}>
        <ImageResize
          source={confirmationCheck}
          height={verticalScale(90)}
          width={scale(90)}
        />
      </ImageBackground>
      <Divider height-20 />
      <Text h18 regular blue02> Awaiting confirmation</Text>
      <Divider height-10 />
      <Text h12 white semibold>Your nodes will be updated and you will be notified when the transfer is confirmed.</Text>
      <Divider height-10 />
      <Text h12 white semibold>The confirmation time can vary from 24 to 72 hours,<Text h12 white light> depending on how fast the blockchain takes
and the liquidation of the assets is carried out.</Text> </Text>
      <Divider height-120 />
      <ButtonRounded
        onPress={() => navigation.navigate("Dashboard")}
        disabled={false}
        blue
        size='lg'
      >
        <Text h14 semibold white>
          Go to distribution cycle
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>


  );
}


export default ConfirmationLicenses;