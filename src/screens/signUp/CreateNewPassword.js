import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  ImageResize,
  ButtonRounded,
  FloatingInput,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import StepButton from './components/StepsButton';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';
import StepIndicator from '../../components/StepIndicator';
import rectangleConfirm from '@assets/icons/rectangleConfirm.png';
import confirmationCheck from '@assets/icons/confirmationCheckRectangle.png';
import Styles from './styles';
import i18n from '@utils/i18n';


const CreateNewPassword = ({ navigation,navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const password = useValidatedInput('password', '');
  const confirmPassword = useValidatedInput('confirmPassword', '',{
    validationParams: [password.value]
  });

  const isValid = isFormValid(password,confirmPassword);


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
    <BackgroundWrapper navigation={navigation}>
      <View row>
        <View flex-1>
          <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        </View>
        <View flex-1 right centerV>
          <StepIndicator step={4} totalSteps={4} />
        </View>
      </View>
      <Divider height-40 />
      <View style={Styles.container}>
        <ImageBackground source={rectangleConfirm} resizeMode="cover" style={Styles.image}>
          <ImageResize
            source={confirmationCheck}
            height={verticalScale(90)}
            width={scale(90)}
          />
        </ImageBackground>
        <Text h16 blue02 regular>{i18n.t('Register.inputLastName')}</Text>
        <Text h12 white >{i18n.t('Register.texAtLeast')}<Text white semibold>{i18n.t('Register.textEightCharacters')}</Text>{i18n.t('Register.textWithNonConsecutive')}</Text>
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

        <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
        <View row bottom >
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
            onPress={() => navigation.navigate("NewPin")}
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