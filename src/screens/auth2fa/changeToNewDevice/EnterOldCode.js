import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  PinInput,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '@assets/iconSVG/IconWarning';
import QRCode from 'react-native-qrcode-svg';
//import Styles from './styles';
import IconClock from '@assets/iconSVG/IconAuth2fa/IconClock';
import LottieView from 'lottie-react-native';


const EnterOldCode = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const codeActivation = useValidatedInput('number', '');
  const { colors } = useTheme();

  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function getInfo(code) {
    navigation.navigate('SignOut',{
      screen: 'TwoFactorActivation',
      params: { page:'change'}
    });
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
    <Divider height-15 />
      <View centerH>
        <LottieView source={require('../../../assets/animationsLottie/IconClock.json')} autoPlay loop style={{ width: scale(130),height:verticalScale(130) }} />
        {/* <IconClock width={scale(180)} height={verticalScale(180)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} /> */}
      </View>
      <Divider height-20 />
      <Text h16 regular blue02>{i18n.t('Auth2fa.textSwitchTwoFactorAuthentication')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('Auth2fa.textEnterTheCodeThatAppears')}</Text>
      <Divider height-10 />
      <Text h12 white semibold>{i18n.t('Auth2fa.textEnterTheCodeYouYot')}<Text h12 white>{i18n.t('Auth2fa.textIfTimeRunsOutReEnter')}</Text></Text>
      <Divider height-30 />
      <Text h12 blue02>{i18n.t('home.myBatchedTransfer.textConfirmationCode')}</Text>
      <Divider height-10 />
      <PinInput {...codeActivation} onSubmit={(code)=>getInfo(code) }/>
      <Divider height-20 />
      {/* <Loading modalVisible={points?.isLoadingRewardsPoints} /> */}
      <View flex-1 bottom>
        {/* <SnackNotice
          visible={error}
          message={points?.error?.message}
          timeout={3000}
        /> */}
      </View>
    </BackgroundWrapper>


  );
}


export default EnterOldCode;