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


const Register = ({ navigation, navigation: { goBack } }) => {
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
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-15 />
      <StepButton navigation={navigation} />
      <Divider height-15 />
      <Text h16 blue02>We have sent you a confirmation code to your email and a text message to your phone number.</Text>
      <Text h12 white>You will receive the code in less than 5 minutes, check your inbox emails and keep an eye on messages via SMS received on your mobile.</Text>
      <Divider height-25 />
      <FloatingInput
        {...codeSms}
        label={'Confirmation code (6 digits)'}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-5 />
      <StepIndicator step={2} totalSteps={4} />
      <Divider height-10 />
      <Text h12 white left>If several minutes have passed and you have not received it, check your email in the SPAM section. If you still don't receive it, press the "back" button and try again.</Text>
      <Divider height-35 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            Back
          </Text>
        </ButtonRounded>
        <Divider width-10 />
          <ButtonRounded
            onPress={() => navigation.navigate("SecretAnswer")}
            disabled={!isValid}
            blue
            size='sm'
          >
            <Text h14 semibold>
              Next
            </Text>
          </ButtonRounded>
      </View>
    </BackgroundWrapper>
  );
}


export default Register;