import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  PinInput,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '../../assets/iconSVG/IconWarning';
import QRCode from 'react-native-qrcode-svg';
import Styles from './styles';
import IconClock from '../../assets/iconSVG/IconAuth2fa/IconClock';

const TwoFactorActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const codeActivation = useValidatedInput('number', '');
  const { colors } = useTheme();

  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function getInfo(code) {
    navigation.navigate('TwoFactorConfirmationActivation')
   console.log('code',code);
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerH>
        <IconClock width={scale(180)} height={verticalScale(180)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <Text h16 regular blue02>Activar Autenticación de dos factores</Text>
      <Divider height-20 />
      <Text h10 white semibold>Ingresa el código que obteniste en tu aplicación de autenticación,{' '}<Text white regular>si el tiempo se acaba vuelve a ingresarlo.</Text></Text>
      <Divider height-30 />
      <Text h12 blue02>{i18n.t('home.myBatchedTransfer.textConfirmationCode')}</Text>
      <Divider height-10 />
      <PinInput {...codeActivation} onSubmit={(code)=>getInfo(code) }/>
      <Divider height-20 />
      {/* <Loading modalVisible={points?.isLoadingRewardsPoints} /> */}
      <View flex-1 bottom>
      <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
        <Text h14 semibold blue02>
          {i18n.t('General.buttonBack')}
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


export default TwoFactorActivation;