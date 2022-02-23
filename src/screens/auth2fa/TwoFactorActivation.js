import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  ImageResize,
  SnackNotice,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '../../assets/iconSVG/IconWarning';
import QRCode from 'react-native-qrcode-svg';
import Styles from './styles';
import IconKey from '@assets/iconSVG/IconAuth2fa/IconKey';
import { getAuth2faQr } from '@store/actions/auth.actions';
import i18n from '@utils/i18n';



const TwoFactorActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const authData = redux?.auth;
  const brandTheme = appData?.Theme?.colors;
  const params = route?.params;
  const error = useSelector(state => state?.auth?.showError);
  const { colors } = useTheme();

  const [clabe, setClabe] = useState('QrCode');

  function handleCodeActivation() {
    navigation.navigate('SignIn',{
      screen: 'TwoFactorCodeActivation',
      params: { page:'change'}
    });
  }

  const copyToClipboard = () => {
    Clipboard.setString(accounts?.id);
  }

  useEffect(() => {
    dispatch(getAuth2faQr());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('authData?.dataQrCode',authData)
    setClabe(authData?.dataQrCode?.secretCode)
  }, [authData?.dataQrCode]);

  console.log('dataQrCode',authData?.dataQrCode?.qrCodeUrl)

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      {params.page !== 'change' &&(
        <Text h16 regular blue02>{i18n.t('Auth2fa.textActivateTwoFactorAuthentication')}</Text>
      )}
      {params.page === 'change' &&(
        <Text h16 regular blue02>{i18n.t('Auth2fa.textChangeTwoFactorAuthentication')}</Text>
      )}
      <Divider height-10 />
      {params.page !== 'change' &&(
        <Text h10 white regular>{i18n.t('Auth2fa.textScanTheQRCodeOrEnter')}</Text>
      )}
      {params.page === 'change' &&(
        <Text h10 white regular>{i18n.t('Auth2fa.textScanTheQRCodeNewDevice')}</Text>
      )}
      <Divider height-20 />
      <View row padding-10 centerV style={{borderColor:colors.blue02,borderWidth:1}}>
        <IconKey width={scale(20)} height={verticalScale(20)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-5 />
        <Text white h10 semibold>{clabe}</Text>
        <Divider width-5 />
        <Link onPress={() => copyToClipboard}>
          <Text h12 blue02>{i18n.t('Auth2fa.linkCopy')}</Text>
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
      <Divider height-15 />
      <Text h12 regular white>{i18n.t('Auth2fa.textNeverShareYour')}</Text>
      <Divider height-20 />
      <View centerH>
        <ImageResize
          source={{ uri: authData?.dataQrCode?.qrCodeUrl }}
          height={verticalScale(220)}
          width={scale(250)}
          style={{ flex:1}}
        />
      </View>
        
      {/* <View centerH>
        <QRCode
          value={clabe}
          size={scale(260)}
          quietZone={scale(30)}
        />
      </View> */}
      <Divider height-15 />
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={handleCodeActivation}
        >
          <Text h13 semibold white center>
            {i18n.t('Auth2fa.linkContinue')}
          </Text>
        </ButtonRounded>
        <SnackNotice
          visible={error}
          message={authData?.error?.message}
        />
      </View>
    </BackgroundWrapper>
  );
}


export default TwoFactorActivation;