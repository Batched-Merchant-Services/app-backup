import React, { useEffect, useState } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  DatePicker,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  DropDownPicker,
  BackgroundWrapper
} from '@components';

import Logo from '@assets/brandBatched/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import StepIndicator from '../../components/StepIndicator';
import Styles from './styles';
import i18n from '@utils/i18n';

//actions
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorRegister,getGender,registerProfile} from '@store/actions/register.actions';
import Loading from '../Loading';



const RegisterProfileBasic = ({ navigation, navigation: { goBack },route }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const referralCode = route?.params?.referral;
  const registerData = redux?.register;
  const firstName = useValidatedInput('firstName', '');
  const mediumName = useValidatedInput('', '');
  const lastName = useValidatedInput('lastName', '');
  const ssn = useValidatedInput('ssn', '');
  const [showModalDates, setShowModalDates] = useState(false);
  const [items, setItems] = useState([]);
  const gender = useValidatedInput('select','',{
    changeHandlerSelect: 'onSelect'
  });
  const birthDay = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const isValid = isFormValid(firstName, mediumName, lastName, ssn,gender,birthDay);
  console.log('referralCode',referralCode)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorRegister());
      dispatch(toggleSnackbarClose());
      dispatch(getGender());
      getShowGender();
    });
    return unsubscribe;

  }, []);
  
  async function getShowGender() {
    setItems(registerData?.gender)
  }

  const error = useSelector(state => state?.register?.showError);

  // if (registerData?.isLoading) {
  //   return <Loading />;
  // }

  if (registerData?.finishRProfileSuccess) {
    navigation.navigate("AccountConfirmation");
  }

  async function handleRegisterProfile(){
    const term = true;
    const dataRegisterProf = {
      firstName:firstName?.value,
      middleName:mediumName?.value,
      lastName:lastName?.value,
      secondLastName:'',
      birthday:birthDay?.value,
      nationality:'',
      currency: '',
      term: term,
      gender: gender?.value?.value?.toString(),
      nationalId:'',
      otherNationalId: '',
      settings: null,
      securityQuestion:null
    }
    dispatch(registerProfile({ dataRegisterProf,term,referralCode }))

  }



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
      <Divider height-15 />
      <Text h14 blue02>{i18n.t('Register.textByCompletingYourBasic')}</Text>
      <Divider height-25 />
      <View style={Styles.container}>
        <FloatingInput
          {...firstName}
          label={i18n.t('Register.inputFirstName')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...mediumName}
          label={i18n.t('Register.inputMediumName')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...lastName}
          label={i18n.t('Register.inputLastName')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...ssn}
          label={i18n.t('Register.inputSocialSecurityNumber')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <DropDownPicker
          {...gender}
          label={i18n.t('Register.inputGender')}
          options={registerData?.gender??[]}
        //onFill={(code)=> filterPays(code)}
        />
        <Divider height-5 />
        <DatePicker 
          {...birthDay}
          label={i18n.t('Register.inputDateOfBirth')}
        />
      </View>
      <Divider height-10 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-10 />
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
          onPress={handleRegisterProfile}
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


export default RegisterProfileBasic;