import React, { useEffect,useState } from 'react';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector,useDispatch } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale,verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import LottieView from 'lottie-react-native';
import { cleanErrorLicenses } from '../../store/actions/licenses.actions';

const ConfirmationLicenses = ({ navigation,navigation: { goBack }  }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
    });
    return unsubscribe;
  }, []);

  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-30 />
      <View centerH >
        <LottieView source={require('../../assets/animationsLottie/IconCheck.json')} autoPlay loop style={{ width: scale(120),height:verticalScale(120) }} />
      </View>
      <Divider height-20 />
      <Text h18 regular blue02>{i18n.t('Licenses.textAwaitingConfirmation')}</Text>
      <Divider height-10 />
      <Text h12 white semibold>{i18n.t('Licenses.textYourNodesWillBe')}</Text>
      <Divider height-10 />
      <Text h12 white semibold>{i18n.t('Licenses.textTheConfirmationTimeCan')}{' '}<Text h12 white light>{i18n.t('Licenses.textDependingOnHowFastTheBlockchain')}</Text> </Text>
      <Divider height-120 />
      <View flex-1 bottom>
      <ButtonRounded
        onPress={() => {
          navigation.navigate('Dashboard');
        }}
        blue
      >
        <Text h14 semibold white>
          {i18n.t('Licenses.buttonGoToDistribution')}
        </Text>
      </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}


export default ConfirmationLicenses;