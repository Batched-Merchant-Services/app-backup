import React, { useEffect, useState } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  DatePicker,
  ButtonRounded,
  FloatingInput,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';
import StepIndicator from '../../components/StepIndicator';
import Styles from './styles';
import i18n from '@utils/i18n';

const RegisterProfileBasic = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const firstName = useValidatedInput('firstName', '');
  const mediumName = useValidatedInput('', '');
  const lastName = useValidatedInput('lastName', '');
  const ssn = useValidatedInput('ssn', '');
  const [showModalDates, setShowModalDates] = useState(false);
  const [items, setItems] = useState([
    { id: '1', value: 'value1', name: 'value1' },
    { id: '2', value: 'value2', name: 'value2' }
  ]);
  const gender = useValidatedInput('select','',{
    changeHandlerSelect: 'onSelect'
  });
  const birthDay = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });

  const isValid = isFormValid(firstName, mediumName, lastName, ssn,gender,birthDay);


  useEffect(() => {
    console.log('redux', redux)
  }, [])


  const { data, error, loading } = useQuery(FETCH_TODOS);
  //console.log('data', data, error, loading)

  if (error) {
    console.error(error);
  }

 console.log('gender',gender)

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
          options={items}
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
          onPress={() => navigation.navigate("CreateNewPassword")}
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


export default RegisterProfileBasic;