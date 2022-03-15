import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import IconSecurityLock from '@assets/iconSVG/IconAuth2fa/IconSecurityLock';
import { TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import IconRightRow from '@assets/iconSVG/IconRightRow';
import Styles from './styles';
import LottieView from 'lottie-react-native';
import ModalInfo2fa from '../ModalInfo2fa';

const Auth2fa = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const auth = redux?.auth;
  const user = redux?.user;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();
  const [isEnabledApp, setIsEnabledApp] = useState(false);
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const [isEnabledSMS, setIsEnabledSMS] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  
  useEffect(() => {
    switch (auth?.type2fa) {
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
  
  useEffect(() => {
    if (!auth?.user?.isTwoFactor) {
      setShowModalInfo(true);
    }else{
      setShowModalInfo(false);
    }
  }, [auth?.user?.isTwoFactor]);


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

  const handleGoToOptions = () => {
    navigation.navigate("TwoFactorOptions");
    
  }

  const handleChangePass = () => {
    navigation.navigate('ChangePasswordInside'); 
  }


  const handleClose = () => {
    setShowModalInfo(!showModalInfo);
  };


  
  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerV padding-20 style={{ borderColor: colors.blue02, borderWidth: 1 }}>
        <View centerH>
        <LottieView source={require('../../assets/animationsLottie/IconSecurityLock.json')} autoPlay loop style={{ width: '90%' }} />
        {/* <IconSecurityLock width={scale(130)} height={verticalScale(130)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} /> */}
        </View>
        <Divider height-15 />
        <Text h16 regular blue02>{i18n.t('Auth2fa.textSecurityOfYourAccount')}</Text>
        <Divider height-10 />
        <Text h12 white semibold>{i18n.t('Auth2fa.textForUsYourSafetyIs')}</Text>
        <Divider height-10 />
        <TouchableOpacity style={{ width: '100%' }} onPress={handleChangePass}>
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
          <View flex-1 left>
            <Text h14 regular white >{i18n.t('Auth2fa.textTwoFactorAuthenticationApp')}</Text>
            <Link onPress={handleGoToOptions}>
              <Text h12 blue02 semibold>{i18n.t('Auth2fa.linkOptions')}</Text>
            </Link>
          </View>
          <View  right >
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
          <View flex-1 left>
            <Text h14 regular white >{i18n.t('Auth2fa.textAuthenticationVia')}{' '}<Text white semibold>{i18n.t('Auth2fa.textSMS')}</Text></Text>
          </View>
          <View right>
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
          <View flex-1 left>
            <Text h14 regular white>{i18n.t('Auth2fa.textAuthenticationVia')}{' '}<Text white semibold>{i18n.t('Auth2fa.textEmail')}</Text></Text>
          </View>
          <View right>
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
      <ModalInfo2fa visible={showModalInfo}
        onRequestClose={() => { setShowModalInfo(false)}}
        onPressOverlay={handleClose}
      />
    </BackgroundWrapper>


  );
}


export default Auth2fa;