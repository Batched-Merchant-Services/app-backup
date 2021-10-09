import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
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
import confirmationCheck from '@assets/icons/confirmationCheck.png';
import startConfirmation from '@assets/icons/startConfirmation.png';
import Styles from './styles'

const ActivationConfirmation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');


  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <ImageBackground source={rectangleConfirm} resizeMode="contain" style={Styles.image}>
        <ImageResize
          source={startConfirmation}
          height={verticalScale(90)}
          width={scale(90)}
        />
      </ImageBackground>
      <Divider height-10 />
      <Text h24 semibold white>Congratulations!</Text>
      <Text h20 white regular>You are fully active today!</Text>
      <Divider height-10 />
      <View blue01 width-36 height-1 />
      <Divider height-20 />
      <Text h12 white regular>Your reward points will be updated at 24:00. UTC, come back tomorrow from 06:00 to 12:00 UTC.</Text>
      <Divider height-15 />
      <Text h12 white regular>Si quieres revisar tu historial de recompenzas puedes hacerlo en  el siguiente enlace:</Text>
      <Divider height-20 />
      <Link>
        <Text h12 green>No cuento con código</Text>
      </Link>
      <View flex-1 bottom>
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
        <Divider height-20 />
        <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue. </Text>
        <Divider height-10 />
        <Text h10 blue01 light>All rights reserved. Batched.com</Text>
      </View>
    </BackgroundWrapper>
  );
}


export default ActivationConfirmation;