import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  DatePicker,
  StepIndicator,
  FloatingInput,
  ButtonRounded,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import Logo from '@assets/brandBatched/logo.svg';
import camera from '@assets/icons/camera.png';

import Styles from './styles'
import i18n from '@utils/i18n';


const PersonalInformation = ({ navigation, navigation: { goBack } }) => {
  const firstName = useValidatedInput('firstName', '');
  const mediumName = useValidatedInput('', '');
  const lastName = useValidatedInput('lastName', '');
  const ssn = useValidatedInput('ssn', '');
  const [items, setItems] = useState([
    { id: '1', value: 'value1', name: 'value1' },
    { id: '2', value: 'value2', name: 'value2' }
  ]);
  const gender = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const birthDay = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });

  //const isValid = isFormValid(firstName, mediumName, lastName, ssn, gender, birthDay);
  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
      <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
        <StepIndicator step={1} totalSteps={2} />
      </View>
      <Divider height-10 />
      <Text h14 blue02 regular>{i18n.t('myProfile.textPersonalInformation')}</Text>
      <Divider height-10 />
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
      <Divider height-20 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('General.buttonSaveChanges')}
          </Text>
        </ButtonRounded>
        <Divider width-10 />
        <ButtonRounded
          onPress={() => {
            navigation.navigate('SignIn',{
              screen: 'ContactInformation',
              merge: true
            });
          }}
          //disabled={!isValid}
          dark
          size='sm'
        >
          <Text h14 blue02 semibold>
            {i18n.t('General.buttonNext')}
          </Text>
        </ButtonRounded>
        <Divider height-20 />
      </View>
    </BackgroundWrapper>
  );
}


export default PersonalInformation;