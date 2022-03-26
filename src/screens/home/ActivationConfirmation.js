import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import rectangleConfirm from '@assets/icons/rectangleConfirm.png';
import confirmationCheck from '@assets/icons/confirmationCheck.png';
import startConfirmation from '@assets/icons/startConfirmation.png';
import Styles from './styles'
import i18n from '@utils/i18n';
import LottieView from 'lottie-react-native';

const ActivationConfirmation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <View centerH >
        <LottieView source={require('../../assets/animationsLottie/IconCheck.json')} autoPlay loop style={{ width: scale(120),height:verticalScale(120) }} />
      </View>
      <ImageBackground source={rectangleConfirm} resizeMode="contain" style={Styles.image}>
        <ImageResize
          source={startConfirmation}
          height={verticalScale(90)}
          width={scale(90)}
        />
      </ImageBackground>
      <Divider height-10 />
      <Text h24 semibold white>{i18n.t('home.confirmationActivation.textCongratulations')}</Text>
      <Text h20 white regular>{i18n.t('home.confirmationActivation.textYouAreFullyActiveToday')}</Text>
      <Divider height-10 />
      <View blue01 width-36 height-1 />
      <Divider height-20 />
      <Text h12 white regular>{i18n.t('home.confirmationActivation.textYourRewardPointsWill')}</Text>
      <Divider height-15 />
      <Text h12 white regular>{i18n.t('home.confirmationActivation.textIfYouWantTo')}</Text>
      <Divider height-20 />
      <Link>
        <Text h12 green>{i18n.t('home.confirmationActivation.textIDontHaveACode')}</Text>
      </Link>
      <View flex-1 bottom>
        <ButtonRounded
          onPress={() => navigation.navigate("Dashboard")}
          disabled={false}
          blue
        >
          <Text h14 semibold white>
            {i18n.t('home.confirmationActivation.buttonGoToDistributionCycle')}
          </Text>
        </ButtonRounded>
        <Divider height-20 />
      </View>
    </BackgroundWrapper>
  );
}


export default ActivationConfirmation;