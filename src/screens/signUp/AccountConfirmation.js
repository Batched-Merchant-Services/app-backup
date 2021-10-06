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

const AccountConfirmation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');


  useEffect(() => {
    console.log('redux', redux)
  }, [])


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
      <Text h18 regular blue02>Account successfully </Text>
      <Text h18 regular blue02>created </Text>
      <Divider height-20 />
      <View blue01 width-36 height-1/>
      <Divider height-20 />
      <Text h12 white light>You can login with the information of the account you just created.</Text>
        <View flex-1 bottom>
          <ButtonRounded
            onPress={() => navigation.navigate("Login")}
            disabled={false}
            blue
            size='lg'
          >
            <Text h14 semibold white>
              Back to Login
            </Text>
          </ButtonRounded>
          <Divider height-40 />
          <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue. </Text>
          <Divider height-10 />
          <Text h10 blue01 light>All rights reserved. Batched.com</Text>
        </View>


    </BackgroundWrapper>


  );
}


export default AccountConfirmation;