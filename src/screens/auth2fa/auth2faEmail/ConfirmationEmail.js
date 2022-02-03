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

const ConfirmationEmail = ({ navigation, route, navigation: { goBack } }) => {
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
      <View centerH >
        <IconSecurityLock width={scale(180)} height={verticalScale(180)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <View width-170>
      <Text h18 regular blue02>Autenticación vía email activada</Text>
      </View>
      <Divider height-20 />
      <View blue01 width-36 height-1 />
      <Divider height-20 />
      <Text h13 white regular>Reguerda reingresar el código que recibirás en tu Email cada vez que inicies sesión o realices una transacción.</Text>
      <Divider height-20 />
      
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


export default ConfirmationEmail;