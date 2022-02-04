import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '../../assets/iconSVG/IconWarning';
import QRCode from 'react-native-qrcode-svg';
import Styles from './styles';
import IconKey from '../../assets/iconSVG/IconAuth2fa/IconKey';

const TwoFactorActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const params = route?.params;
  const { colors } = useTheme();

  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');

  function handleCodeActivation() {
    navigation.navigate('SignOut',{
      screen: 'TwoFactorCodeActivation',
      params: { page:'change'}
    });
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      {params.page !== 'change' &&(
        <Text h16 regular blue02>Activar Autenticación de dos factores</Text>
      )}
      {params.page === 'change' &&(
        <Text h16 regular blue02>Cambiar autenticación de dos factores en un nuevo dispositivo</Text>
      )}
      <Divider height-10 />
      {params.page !== 'change' &&(
        <Text h10 white regular>Escanéa el código QR o ingresa la siguiente llave.</Text>
      )}
      {params.page === 'change' &&(
        <Text h10 white regular>Escanéa el código QR o ingresa la siguiente llave en tu nuevo dispositivo. </Text>
      )}
     
      <Divider height-20 />
      <View row padding-10 centerV style={{borderColor:colors.blue02,borderWidth:1}}>
        <IconKey width={scale(30)} height={verticalScale(30)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-8 />
        <Text white h13 medium>{clabe}</Text>
        <Divider width-8 />
        <Link>
          <Text h12 blue02>copiar</Text>
        </Link>
      </View>
      <Divider height-20 />
      <View row paddingH-10 centerV warning height-55>
        <IconWarning width={scale(18)} height={verticalScale(18)} fill={brandTheme?.white ?? colors?.white} fillSecondary={brandTheme?.warning ?? colors?.warning} />
        <Divider width-10 />
        <View flex-1>
          <Text h12 semibold white>Guarda tu llave donde puedas recuperarla,{' '}<Text regular white>se requerirá en caso de que cambies tu dispositivo.</Text></Text>
        </View>
      </View>
      <Divider height-20 />
      <Text h12 regular white>Nunca compartas tu llave con nadie.</Text>
      <Divider height-20 />
      <View centerH>
        <QRCode
          value={clabe}
          size={scale(260)}
          quietZone={scale(30)}
        />
      </View>
      <Divider height-5 />
        <Link>
          <Text h14 blue02>Descar QR</Text>
        </Link>
      <Divider height-10 />
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={handleCodeActivation}
        >
          <Text h13 semibold white center>
            Continuar
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}


export default TwoFactorActivation;