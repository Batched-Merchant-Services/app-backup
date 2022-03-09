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
import IconKey from '@assets/iconSVG/IconAuth2fa/IconKey';
import ModalAuth2fa from './ModalAuth2fa';
import LottieView from 'lottie-react-native';

const TwoFactorConfirmationActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const authData = redux?.auth;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();
  const [showModalDates, setShowModalDates] = useState(true);
  const [showDisabled, setShowDisabled] = useState(true);
  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');

  const copyToClipboard = () => {
    Clipboard.setString(clabe);
  }

  function handleGoToAuth() {
    navigation.navigate("Auth2fa");
  }
  useEffect(() => {
    setClabe(authData?.dataQrCode?.secretCode)
  }, [authData?.dataQrCode]);

  const handleClose = () => {
    setShowModalDates(!showModalDates);

    setTimeout(() => {
      setShowDisabled(false);
    }, 3000); 
  };
 
  return (
    <BackgroundWrapper showNavigation={true}  navigation={navigation}>
     <Divider height-20 />
      <View centerH>
        <LottieView source={require('../../assets/animationsLottie/IconSecurityLock.json')} autoPlay loop style={{ width: '90%' }} />
        {/* <IconSecurityLock width={scale(180)} height={verticalScale(180)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} /> */}
      </View>
      <Divider height-20 />
      <Text h16 regular blue02>{i18n.t('Auth2fa.textTwoFactorAuthenticationActivated')}</Text>
      <Divider height-20 />
      <Text h10 white semibold>{i18n.t('Auth2fa.textRememberToEnter')}</Text>
      <Divider height-20 />
      <View row padding-10 centerV style={{ borderColor: colors.blue02, borderWidth: 1 }}>
        <IconKey width={scale(25)} height={verticalScale(25)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-5 />
        <Text white h10 semibold>{clabe}</Text>
        <Divider width-5 />
        <Link onPress={() => copyToClipboard()}>
          <Text h10 blue02>{i18n.t('Auth2fa.linkCopy')}</Text>
        </Link>
      </View>
      <Divider height-20 />
      <View row paddingH-10 centerV warning height-55>
        <IconWarning width={scale(18)} height={verticalScale(18)} fill={brandTheme?.white ?? colors?.white} fillSecondary={brandTheme?.warning ?? colors?.warning} />
        <Divider width-10 />
        <View flex-1>
          <Text h12 semibold white>{i18n.t('Auth2fa.textKeepYourKeyWhere')},{' '}<Text regular white>{i18n.t('Auth2fa.textItWillBeRequired')}</Text></Text>
        </View>
      </View>
      <Divider height-20 />
      <Text h12 regular white>{i18n.t('Auth2fa.textNeverShareYour')}</Text>
      {/* <Loading modalVisible={points?.isLoadingRewardsPoints} /> */}
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={handleGoToAuth}
          disable={showDisabled}
        >
          <Text h13 semibold white center>
            {i18n.t('Auth2fa.buttonBackToSecurity')}
          </Text>
        </ButtonRounded>
        {/* <SnackNotice
          visible={error}
          message={points?.error?.message}
          timeout={3000}
        /> */}
      </View>
        <ModalAuth2fa visible={showModalDates}
          onRequestClose={() => { setShowModalDates(false)}}
          onPressOverlay={handleClose}
          getData={(data) => getData(data)}
        />
    </BackgroundWrapper>


  );
}


export default TwoFactorConfirmationActivation;