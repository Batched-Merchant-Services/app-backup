import React, { Fragment, useEffect, useState } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import StepButton from './components/StepsButton';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import StepIndicator from '../../components/StepIndicator';
import i18n from '@utils/i18n';

//actions
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorRegister, getCountries,setRegister } from '@store/actions/register.actions';
import Loading from '../Loading';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const registerData = redux?.register;
  const email = useValidatedInput('email', '');
  const phone = useValidatedInput('phone', '');
  const companyCode = useValidatedInput('companyCode', '');
  const [items, setItems] = useState([]);
  const country = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const [showCompanyCode, setShowCompanyCode] = useState(false);
  
  
  const isValid = isFormValid(email, phone, country);


  const error = useSelector(state => state?.register?.showError);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorRegister());
      dispatch(toggleSnackbarClose());
      dispatch(getCountries());
      getShowCountries();
    });
    return unsubscribe;

  }, []);

  function getShowCountries() {
    console.log('registerData',registerData.countries)
    setItems(registerData?.countries)
  }

  async function handleRegister() {
    const group = '320'
    const dataRegister = {
      email: email?.value,
      phoneNumber: phone?.value,
      lada: country?.value?.value,
      groupId: group
    }
    dispatch(setRegister({ dataRegister }));
  }

  if (registerData?.isLoading) {
    return <Loading />;
  }

  if (registerData?.finishRegisterSuccess) {
    navigation.navigate("CodeSms")
  }



  return (
    <BackgroundWrapper navigation={navigation}>
      <View row>
        <View flex-1>
          <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        </View>
        <View flex-1 right centerV>
          <StepIndicator step={1} totalSteps={4} />
        </View>
      </View>
      <Divider height-15 />
      <StepButton navigation={navigation} />
      <Divider height-15 />
      <Text h18 blue02>{i18n.t('Register.textWelcomeTo')}</Text>
      <Divider height-30 />
      {showCompanyCode&&(
        <Fragment>
          <FloatingInput
            {...companyCode}
            label={i18n.t('Register.textCompanyCode')}
            autoCapitalize={'none'}
          />
          <Divider height-5 />
        </Fragment>
      )}
      <FloatingInput
        {...email}
        label={i18n.t('Register.textInputEmail')}
        autoCapitalize={'none'}
      />
      <Divider height-5 />
      <DropDownPicker
        {...country}
        label={i18n.t('Register.textDropDown')}
        options={registerData?.countries??[]}
        size='lg'
      //onFill={(code)=> filterPays(code)}
      />
      <FloatingInput
        {...phone}
        label={i18n.t('Register.inputPhone')}
        autoCapitalize={'none'}
      />
      <Divider height-35 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={handleRegister}
          disabled={!isValid}
          blue
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
    </BackgroundWrapper>
  );
}


export default Register;