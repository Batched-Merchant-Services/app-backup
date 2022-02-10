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
  const infoUser = redux?.user;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();
  const [isEnabledApp, setIsEnabledApp] = useState(false);
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const [isEnabledSMS, setIsEnabledSMS] = useState(false);

  useEffect(() => {
    switch (infoUser?.dataUser?.type2fa) {
      case 1:
        setIsEnabledApp(true);
      break;
      case 2:
        setIsEnabledSMS(true);
      break;
      case 3:
        setIsEnabledEmail(true);
      break;
    }
  }, []);
  

  
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
        <Text h16 regular blue02>{i18n.t('Auth2fa.textSecurityOfYourAccount')}</Text>
        <Divider height-10 />
        <Text h12 white semibold>{i18n.t('Auth2fa.textForUsYourSafetyIs')}</Text>
        <Divider height-10 />
        <TouchableOpacity style={{ width: '100%' }}>
          <View row centerV>
            <View flex-1>
              <Text h14 semibold success>{i18n.t('Auth2fa.linkChangePassword')}</Text>
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
        <Text h16 regular blue02>{i18n.t('Auth2fa.textTwoFactorAuthentication')}</Text>
        <Divider height-10 />
        <Text h12 white light>{i18n.t('Auth2fa.textEvenIfSomeoneGets')}{' '}
          <Text white semibold>{i18n.t('Auth2fa.textEachLoginWillBe')}{' '}</Text>
          <Text white light>{i18n.t('Auth2fa.textThatYouWillGetWhen')}</Text></Text>
        <Divider height-10 />
        <View row>
          <View left>
            <Text h14 regular white >{i18n.t('Auth2fa.textTwoFactorAuthenticationApp')}</Text>
            <Divider height-10 />
            <Link>
              <Text h12 blue02 semibold>{i18n.t('Auth2fa.linkOptions')}</Text>
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
            <Text h14 regular white >{i18n.t('Auth2fa.textAuthenticationVia')}{' '}<Text white semibold>{i18n.t('Auth2fa.textSMS')}</Text></Text>
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
            <Text h14 regular white>{i18n.t('Auth2fa.textAuthenticationVia')}{' '}<Text white semibold>{i18n.t('Auth2fa.textEmail')}</Text></Text>
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