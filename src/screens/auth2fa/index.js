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
import IconRightRow from '@assets/iconSVG/IconRightRow';
import Styles from './styles';
const Auth2fa = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();
  const [isEnabledApp, setIsEnabledApp] = useState(false);
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const [isEnabledSMS, setIsEnabledSMS] = useState(false);
  const toggleSwitchApp = () => {
    setIsEnabledApp(previousState => !previousState);
    setIsEnabledEmail(false);
    setIsEnabledSMS(false);
    navigation.navigate("TwoFactorInstructions")
  }
  const toggleSwitchEmail = () => {
    setIsEnabledEmail(previousState => !previousState);
    setIsEnabledApp(false);
    setIsEnabledSMS(false);
    navigation.navigate("Auth2faEmail")
  }
  const toggleSwitchSMS = () => {
    setIsEnabledSMS(previousState => !previousState);
    setIsEnabledEmail(false);
    setIsEnabledApp(false);
    navigation.navigate("Auth2faSms");
    
  }




  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerV padding-20 style={{ borderColor: colors.blue02, borderWidth: 1 }}>
        <View centerH>
          <IconSecurityLock width={scale(130)} height={verticalScale(130)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        </View>
        <Text h16 regular blue02>Seguridad de tu cuenta</Text>
        <Divider height-10 />
        <Text h12 white semibold>Para nosotros tu seguridad es lo más importante.</Text>
        <Divider height-10 />
        <TouchableOpacity style={{ width: '100%' }}>
          <View row centerV>
            <View flex-1>
              <Text h14 semibold success>Cambiar contraseña</Text>
            </View>
            <Divider width-10 />
            <View>
              <IconRightRow width={scale(10)} height={verticalScale(10)} fill={brandTheme?.success ?? colors?.success} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Divider height-10 />
      <View  padding-20 style={{ borderColor: colors.blue02, borderWidth: 1 }}>
        <Text h16 regular blue02>Autenticación de dos factores</Text>
        <Divider height-10 />
        <Text h12 white light>Incluso si alguien consigue tu contraseña no podrá entrar ya que{' '}
          <Text white semibold>cada inicio de sesión se autorizará con un código de 6 dígitos{' '}</Text>
          <Text white light>que obtendrás cuando desees ingresar.</Text></Text>
        <Divider height-10 />
        <View row>
          <View left>
            <Text h14 regular white >Autenticación de dos factores mediante app externa</Text>
            <Divider height-10 />
            <Link>
              <Text h12 blue02 semibold>Opciones</Text>
            </Link>
          </View>
          <View flex-1 right >
            <Switch
              trackColor={{ false: colors.blue04, true: colors.blue02 }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.blue04}
              onValueChange={toggleSwitchApp}
              value={isEnabledApp}
            />
          </View>
        </View>
        <Divider height-10 />
        <Divider style={[Styles.borderDoted, { borderColor: colors.blue04 }]} />
        <Divider height-10 />
        <View row>
          <View left>
            <Text h14 regular white >Autenticación vía{' '}<Text white semibold>SMS</Text></Text>
          </View>
          <View flex-1 right>
            <Switch
              trackColor={{ false: colors.blue04, true: colors.blue02 }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.blue04}
              onValueChange={toggleSwitchSMS}
              value={isEnabledSMS}
            />
          </View>
        </View>
        <Divider height-10 />
        <Divider style={[Styles.borderDoted, { borderColor: colors.blue04 }]} />

        <Divider height-10 />
        <View row>
          <View left>
            <Text h14 regular white>Autenticación vía{' '}<Text white semibold>email</Text></Text>
          </View>
          <View flex-1 right>
            <Switch
              trackColor={{ false: colors.blue04, true: colors.blue02 }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.blue04}
              onValueChange={toggleSwitchEmail}
              value={isEnabledEmail}
            />
          </View>
        </View>
        <Divider height-10 />
        <Divider style={[Styles.borderDoted, { borderColor: colors.blue04 }]} />
      </View>
    </BackgroundWrapper>


  );
}


export default Auth2fa;