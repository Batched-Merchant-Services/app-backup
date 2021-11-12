import React, { useEffect, useState } from 'react';
import { useColorScheme, TouchableOpacity, Picker } from 'react-native';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  StepIndicator,
  BackgroundWrapper
} from '@components';
import StepButton from './components/StepsButton';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '@utils/i18n';

//actions
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorRegister} from '@store/actions/register.actions';
import Loading from '../Loading';
import LocalStorage from '@utils/localStorage';
import { validateSMS } from '../../store/actions/register.actions';


const CodeSms = ({ navigation, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const registerData = redux?.register;
  const codeSms = useValidatedInput('sms', '');
  const [snackVisible, setSnackVisible] = useState(false);
  const isValid = isFormValid(codeSms);
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorRegister());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;

  }, []);

  const error = useSelector(state => state?.register?.showError);


  async function handleConfirmSMS() {
    await LocalStorage.set('auth_token', codeSms?.value);
    dispatch(validateSMS({codeSms}));
  }

  // if (registerData?.isLoading) {
  //   return <Loading />;
  // }

  if (registerData?.finishSmsSuccess) {
    // navigation.navigate("RegisterProfileBasic")
    navigation.navigate("CreateNewPassword")
  }

  console.log('codesms', registerData)



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
            onPress={handleConfirmSMS}
            disabled={!isValid}
            blue
            size='sm'
          >
            <Text h14 semibold>
              {i18n.t('General.buttonNext')}
            </Text>
          </ButtonRounded>
      </View>
      <SnackNotice
        visible={error}
        message={registerData?.error?.message}
        timeout={3000}
      />
       <Loading  modalVisible={registerData?.isLoading}/>
    </BackgroundWrapper>
  );
}


export default CodeSms;