import React, { useEffect, useState } from 'react';
import { useColorScheme, TouchableOpacity, Picker } from 'react-native';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  FloatingInput,
  StepIndicator,
  BackgroundWrapper
} from '@components';
import StepButton from './components/StepsButton';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';
import i18n from '@utils/i18n';

const CodeSms = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const codeSms = useValidatedInput('sms', '');
  const isValid = isFormValid(codeSms);

  useEffect(() => {
    console.log('redux', redux)
  }, [])


  const { data, error, loading } = useQuery(FETCH_TODOS);
  //console.log('data', data, error, loading)

  if (error) {
    console.error(error);
  }

  // if (loading) {
  //   console.log('loading');
  // }



  return (
    <BackgroundWrapper>
      <View row>
        <View flex-1>
          <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        </View>
        <View flex-1 right centerV>
        <StepIndicator step={2} totalSteps={4} />
        </View>
      </View>
      <Divider height-15 />
      <StepButton navigation={navigation} />
      <Divider height-15 />
      <Text h16 blue02>{i18n.t('Register.textWeHaveSentYou')}</Text>
      <Divider height-15 />
      <Text h12 white>{i18n.t('Register.textYouWillReceive')}</Text>
      <Divider height-25 />
      <FloatingInput
        {...codeSms}
        label={i18n.t('Register.textConfirmationCodeSixDigits')}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-10 />
      <Text h12 white left>{i18n.t('Register.textIfSeveralMinutesHave')}</Text>
      <Divider height-30 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('General.buttonBack')}
          </Text>
        </ButtonRounded>
        <Divider width-10 />
          <ButtonRounded
            onPress={() => navigation.navigate("RegisterProfileBasic")}
            disabled={!isValid}
            blue
            size='sm'
          >
            <Text h14 semibold>
              {i18n.t('General.buttonNext')}
            </Text>
          </ButtonRounded>
      </View>
    </BackgroundWrapper>
  );
}


export default CodeSms;