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


const ConfirmationTransfer = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');


  useEffect(() => {
    console.log('redux', redux)
  }, [])


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
      <Text h18 regular blue02>{i18n.t('home.myBatchedTransfer.confirmation.textMovementConfirmed')}</Text>
      <Divider height-20 />
      <View blue01 width-36 height-1 />
      <Divider height-20 />
      <Text h16 white>{i18n.t('home.myBatchedTransfer.confirmation.textTransactionGateway')}</Text>
      <Divider height-25 />
      <Text h12 white >{i18n.t('home.myBatchedTransfer.confirmation.textBalanceTransferredToCard')}</Text>
      <Text h16 green semibold>$1,200.00</Text>
      <Divider height-15 />
      <Text h12 white light>{i18n.t('home.myBatchedTransfer.confirmation.textDate')}</Text>
      <Text h16 white semibold>12/09/2024</Text>
      <Divider height-15 />
      <Text h12 white light>{i18n.t('home.myBatchedTransfer.confirmation.textTransactionID')}</Text>
      <Text h16 white semibold>INX348IGFEHDCJZ</Text>
      <View flex-1 bottom>
        <ButtonRounded
          onPress={() => {
            navigation.navigate('SignOut',{
              screen: 'Login',
              merge: true
            });
          }}
          disabled={false}
          blue
          size='lg'
        >
          <Text h14 semibold white>
            {i18n.t('home.myBatchedTransfer.confirmation.buttonBackToMyBatched')}
          </Text>
        </ButtonRounded>
        <Divider height-40 />
        <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue. </Text>
        <Divider height-10 />
        <Text h10 blue01 light>{i18n.t('General.textAllRightsReserved')} Batched.com</Text>
      </View>
    </BackgroundWrapper>
  );
}

export default ConfirmationTransfer;