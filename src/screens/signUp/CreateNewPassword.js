import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  ImageResize,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';

import Logo from '@assets/brandBatched/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import LocalStorage from '@utils/localStorage';
import StepIndicator from '../../components/StepIndicator';

import Styles from './styles';
import i18n from '@utils/i18n';

//actions
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorRegister,setPassword} from '@store/actions/register.actions';
import LottieView from 'lottie-react-native';


const CreateNewPassword = ({ navigation,navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const registerData = redux?.register;
  const password = useValidatedInput('password', '');
  const confirmPassword = useValidatedInput('confirmPassword', '',{
    validationParams: [password.value]
  });

  const isValid = isFormValid(password,confirmPassword);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorRegister());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;

  }, []);

  async function handleNewPin() {
    const passwordValue = password?.value;
    dispatch(setPassword({ passwordValue }));
  }

  if (registerData?.finishSetPasswordSuccess) {
    navigation.push('TermConditions');
  }

  
  return (
    <BackgroundWrapper navigation={navigation}>
      <View row>
        <View flex-1>
          <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        </View>
        <View flex-1 right centerV>
          <StepIndicator step={3} totalSteps={4} />
        </View>
      </View>
      <Divider height-40 />
      <View style={Styles.container}>
      <View centerH>
        <LottieView source={require('@assets/animationsLottie/IconCheck.json')} autoPlay loop style={{ width: '90%' }} />
      </View>
        <Divider height-40 />
        <Text h16 blue02 regular>{i18n.t('Register.textDefineYourPassword')}</Text>
        <Divider height-10 />
        <Text h12 white >{i18n.t('Register.texAtLeast')}<Text white semibold>{i18n.t('Register.textEightCharacters')}</Text>{i18n.t('Register.textWithNonConsecutive')}</Text>
        <Divider height-20 />
        <View>
          <FloatingInput
            {...password}
            label={i18n.t('Register.inputPassword')}
            autoCapitalize={'none'}
            secureTextEntry
          />
          <Divider height-15 />
          <FloatingInput
            {...confirmPassword}
            label={i18n.t('Register.inputRepeatPassword')}
            autoCapitalize={'none'}
            secureTextEntry
          />
        </View>
        <Divider height-20 />
        <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
        <View flex-1 row bottom>
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
            onPress={handleNewPin}
            disabled={!isValid}
            blue
            size='sm'
          >
            <Text h14 semibold>
            {i18n.t('General.buttonNext')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </BackgroundWrapper>
  );
}


export default CreateNewPassword;