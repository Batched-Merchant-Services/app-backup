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
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import IconSecurityLock from '@assets/iconSVG/IconAuth2fa/IconSecurityLock';
import IconWarning from '@assets/iconSVG/IconWarning';
import i18n from '@utils/i18n';
import Styles from './styles';

const TwoFactorConfirmationActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const copyToClipboard = () => {
    Clipboard.setString(clabe);
  }

  return (
    <BackgroundWrapper showNavigation={true}  navigation={navigation}>
      <View centerH>
        <IconSecurityLock width={scale(180)} height={verticalScale(180)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <Text h16 regular blue02>Autenticación de dos factores activada!</Text>
      <Divider height-20 />
      <Text h10 white semibold>Reguerda reingresar el código de seis dígitos que aparece en tu aplicación de autenticación cada vez que inicies sesión. </Text>
      <Divider height-20 />
      <View row padding-10 centerV style={{ borderColor: colors.blue02, borderWidth: 1 }}>
        <Text h12 white>Llave:</Text>
        <Divider width-10 />
        <Text blue02 h12 semibold>{clabe}</Text>
        <Divider width-10 />
        <Link onPress={() => copyToClipboard()}>
          <Text h14 blue02>copiar</Text>
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

      {/* <Loading modalVisible={points?.isLoadingRewardsPoints} /> */}
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('Auth2fa')}
        >
          <Text h13 semibold white center>
            Volver a seguridad
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


export default TwoFactorConfirmationActivation;