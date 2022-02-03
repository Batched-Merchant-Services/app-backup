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


const TwoFactorInstructions = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);



  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerH>
        <IconNumber width={scale(120)} height={verticalScale(120)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <Divider height-30 />
      <Text h16 regular blue02>Autenticación de dos factores</Text>
      <Divider height-10 />
      <Text h10 white regular>Use an Authenticator App as your Two-Factor Authentication (2FA). When you sign in you’ll be required to use the security code provided by your Authenticator App.</Text>
      <Divider height-20 />
      <Text h14 regular blue02>Antes de activar:</Text>
      <Divider height-10 />
      <Text h12 white regular>Instala una aplicación de autenticación de dos factores por ejemplo:</Text>
      <Divider height-20 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link>
          <Text h14 blue02>Google Authenticator</Text>
        </Link>
      </View>
      <Divider height-10 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link>
          <Text h14 blue02>Microsoft Authenticator</Text>
        </Link>
      </View>
      <Divider height-10 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link>
          <Text h14 blue02>LastPass Authenticator</Text>
        </Link>
      </View>
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={() => navigation.navigate('TwoFactorActivation')}
        >
          <Text h13 semibold white center>
            Instalé mi aplicación de autenticación
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}


export default TwoFactorInstructions;