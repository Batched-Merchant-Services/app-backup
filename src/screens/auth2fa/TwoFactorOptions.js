import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { cleanErrorLicenses, getLicenses, saveCurrentLicense } from '@store/actions/licenses.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import IconSecurityLock from '@assets/iconSVG/IconAuth2fa/IconSecurityLock';
import { TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import IconRightRow from '../../assets/iconSVG/IconRightRow';
import Styles from './styles';
import IconNumber from '../../assets/iconSVG/IconAuth2fa/IconNumber';
import IconAsterisk from '../../assets/iconSVG/IconAuth2fa/IconAsterisk';
import IconKey from '../../assets/iconSVG/IconAuth2fa/IconKey';
import IconEmail from '../../assets/iconSVG/IconAuth2fa/IconEmail';


const TwoFactorOptions = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function handleSupport() {
    navigation.navigate('SignOut',{screen: 'SupportAuthentication'});
    
  }


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerH>
        <IconNumber width={scale(183)} height={verticalScale(137)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <Divider height-20 />
      <Text h16 regular blue02>Autenticación de dos factores</Text>
      <Divider height-20 />
      <View row>
        <IconAsterisk width={scale(30)} height={verticalScale(30)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-10 />
        <View left>
          <Text h14 white regular>Cambiar autenticación de dos factores a nuevo dispositivo</Text>
          <Divider height-5 />
          <Text h12 white regular>Utiliza la clave de tu dispositivo actual para activar la autenticación de dos factores en otro dispositivo.</Text>
          <Divider height-5 />
          <Link onPress={()=>navigation.navigate('EnterOldCode')}>
            <Text h12 blue02 medium>Continuar</Text>
          </Link>
        </View>
      </View>
      <Divider height-20 />
      <View row>
        <IconKey width={scale(30)} height={verticalScale(30)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-10 />
        <View left>
          <Text h14 white regular>Respaldo de autenticación utilizando la llave de seguridad</Text>
          <Divider height-5 />
          <Text h12 white regular>Configurar una aplicación de autentificación diferente u otro dispositivo utilizando la copia de tu clave de seguridad.</Text>
          <Divider height-5 />
          <Link onPress={handleSupport}>
            <Text h12 blue02 medium>Continuar</Text>
          </Link>
        </View>
      </View>
      <Divider height-10 />
      {/* <View row>
        <IconEmail width={scale(30)} height={verticalScale(30)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-10 />
        <View left>
          <Text h14 white regular>Recuperar por correo electrónico</Text>
          <Divider height-5 />
          <Text h12 white regular>Restablecer la verificación en 2 pasos confirmando la propiedad de la cuenta.</Text>
          <Divider height-5 />
          <Link>
            <Text h12 blue02 medium>Continuar</Text>
          </Link>
        </View>
      </View> */}
    </BackgroundWrapper>


  );
}


export default TwoFactorOptions;