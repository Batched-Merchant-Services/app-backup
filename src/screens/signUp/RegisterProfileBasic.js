import React, { useEffect, useState } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
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


const RegisterProfileBasic = ({ navigation,navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const firstName = useValidatedInput('firstName', '');
  const mediumName = useValidatedInput('', '');
  const lastName = useValidatedInput('lastName', '');
  const ssn = useValidatedInput('ssn', '');
  const birthDay = useValidatedInput('birthDay', '');
  const gender = useValidatedInput('select', {
    changeHandlerSelect: 'onSelect'
  });


  const [items, setItems] = useState([
    { id: '1', value: 'apple', name: 'Apple' },
    { id: '2', value: 'banana', name: 'Banana' }
  ]);
  const isValid = isFormValid(firstName, mediumName, lastName, ssn, gender, birthDay);


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
          <StepIndicator step={1} totalSteps={4} />
        </View>
      </View>
      <Divider height-15 />
      <Text h14 blue02>By completing your basic information you will be able to access to your Uulala App and Card Portal.</Text>
      <Divider height-25 />
      <View style={Styles.container}>
        <FloatingInput
          {...firstName}
          label={'First Name*'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...mediumName}
          label={'Medium Name'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...lastName}
          label={'Last Name*'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...ssn}
          label={'Social Security Number*'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <DropDownPicker
          {...gender}
          label={'Gender*'}
          options={items}
          size="sm"
        //onFill={(code)=> filterPays(code)}
        />
        <Divider height-5 />
        <FloatingInput
          {...birthDay}
          label={'Date of birth'}
          autoCapitalize={'none'}
        />
      </View>
      <Divider height-10 />
      <Text h12 white>* Required fields</Text>
      <Divider height-10 />
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
          onPress={() => navigation.navigate("CreateNewPassword")}
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


export default RegisterProfileBasic;