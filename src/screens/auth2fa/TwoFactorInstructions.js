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
import IconNumber from '@assets/iconSVG/IconAuth2fa/IconNumber';
import LottieView from 'lottie-react-native';

const TwoFactorInstructions = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const error = useSelector(state => state?.auth?.showError);
  const { colors } = useTheme();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function handleActivation() {
    navigation.navigate('TwoFactorActivation',{ page:'change'});
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Divider height-15 />
      <View centerH>
      <LottieView source={require('../../assets/animationsLottie/IconNumber.json')} autoPlay loop style={{ width: '90%' }} />
        {/* <IconNumber width={scale(120)} height={verticalScale(120)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} /> */}
      </View>
      <Divider height-30 />
      <Text h16 regular blue02>{i18n.t('Auth2fa.textTwoFactorAuthentication')}</Text>
      <Divider height-10 />
      <Text h10 white regular>{i18n.t('Auth2fa.textUseAnAuthenticatorApp')}</Text>
      <Divider height-20 />
      <Text h14 regular blue02>{i18n.t('Auth2fa.textBeforeActivating')}</Text>
      <Divider height-10 />
      <Text h12 white regular>{i18n.t('Auth2fa.textInstallATwoFactor')}</Text>
      <Divider height-20 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link>
          <Text h14 blue02>{i18n.t('Auth2fa.textGoogleAuthenticator')}</Text>
        </Link>
      </View>
      <Divider height-10 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link>
          <Text h14 blue02>{i18n.t('Auth2fa.textMicrosoftAuthenticator')}</Text>
        </Link>
      </View>
      <Divider height-10 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5 />
        <Link>
          <Text h14 blue02>{i18n.t('Auth2fa.textLastPassAuthenticator')}</Text>
        </Link>
      </View>
      <View flex-1 bottom>
        <ButtonRounded
          blue
          onPress={handleActivation}
          //onPress={() => navigation.navigate('TwoFactorOptions')}
        >
          <Text h13 semibold white center>
          {i18n.t('Auth2fa.buttonInstalledMy')}
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}


export default TwoFactorInstructions;