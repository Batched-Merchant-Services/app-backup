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
import { useTheme } from '@react-navigation/native';
import IconNumber from '../../assets/iconSVG/IconAuth2fa/IconNumber';
import IconAsterisk from '../../assets/iconSVG/IconAuth2fa/IconAsterisk';
import IconKey from '../../assets/iconSVG/IconAuth2fa/IconKey';


const TwoFactorOptions = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const error = useSelector(state => state?.auth?.showError);
  const { colors } = useTheme();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function handleSupport() {
    navigation.navigate('SignIn',{screen: 'SupportAuthentication'});
    
  }


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <View centerH>
        <IconNumber width={scale(183)} height={verticalScale(137)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
      </View>
      <Divider height-20 />
      <Text h16 regular blue02>{i18n.t('Auth2fa.textTwoFactorAuthentication')}</Text>
      <Divider height-20 />
      <View row>
        <IconAsterisk width={scale(30)} height={verticalScale(30)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-10 />
        <View flex-1 left>
          <Text h14 white regular>{i18n.t('Auth2fa.textSwitchTwoFactor')}</Text>
          <Divider height-5 />
          <Text h12 white regular>{i18n.t('Auth2fa.textUseYourCurrent')}</Text>
          <Divider height-5 />
          <Link onPress={()=>navigation.navigate('EnterOldCode')}>
            <Text h12 blue02 medium>{i18n.t('Auth2fa.linkContinue')}</Text>
          </Link>
        </View>
      </View>
      <Divider height-20 />
      <View row>
        <IconKey width={scale(30)} height={verticalScale(30)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
        <Divider width-10 />
        <View flex-1 left>
          <Text h14 white regular>{i18n.t('Auth2fa.textAuthenticationSupport')}</Text>
          <Divider height-5 />
          <Text h12 white regular>{i18n.t('Auth2fa.textAuthenticationSupport')}</Text>
          <Divider height-5 />
          <Link onPress={handleSupport}>
            <Text h12 blue02 medium left>{i18n.t('Auth2fa.textSetUpADifferent')}</Text>
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