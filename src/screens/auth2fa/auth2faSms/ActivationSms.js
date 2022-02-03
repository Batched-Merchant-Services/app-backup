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
import Styles from './styles';


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
      <Text h20 regular blue02>Activar autenticación vía SMS</Text>
      <Divider height-20 />
      <Text h10 white regular>Para habilitar la autenticación de correo electrónico, se envió un código de seguridad a su dirección de correo electrónico en{' '}<Text white semibold>g***@uulala.io</Text></Text>
      <Divider height-20 />
      <Text h10 white regular>Ingrese el código de seguridad a continuación para continuar.</Text>
      <Divider height-30 />
      <Text h12 blue02>{i18n.t('home.myBatchedTransfer.textConfirmationCode')}</Text>
      <Divider height-10 />
      <PinInput {...codeActivation} onSubmit={(code)=>getInfo(code) }/>
      <Divider height-20 />
      {/* <Loading modalVisible={points?.isLoadingRewardsPoints} /> */}
      <View flex-1 bottom>
      <ButtonRounded
          blue
          onPress={() => navigation.navigate('ConfirmationSMS')}
        >
          <Text h13 semibold white center>
            Activar autenticación vía SMS
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