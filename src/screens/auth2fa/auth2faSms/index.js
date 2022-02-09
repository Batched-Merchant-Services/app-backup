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
import IconWarning from '@assets/iconSVG/IconWarning';
import QRCode from 'react-native-qrcode-svg';
import Styles from './styles';
import IconAuthSms from '@assets/iconSVG/IconAuth2fa/IconAuthSms';

const Auth2faSms = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);



  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerH>
        <IconAuthSms width={scale(200)} height={verticalScale(210)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <Text h16 regular blue02>Autenticaciónvía SMS</Text>
      <Divider height-10 />
      <Text h10 white regular>Use your phone as your Two-Factor Authentication (2FA) when you sign in you’ll be required to use the security code we send you via SMS message.</Text>
      <Divider height-20 />
      
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('ActivationSms')}
        >
          <Text h13 semibold white center>
            Activar autenticación vía SMS
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}
export default Auth2faSms;