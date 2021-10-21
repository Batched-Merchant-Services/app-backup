import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  StepIndicator,
  FloatingInput,
  ButtonRounded,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import Styles from './styles'
import i18n from '@utils/i18n';

const ContactInformation = ({ navigation, navigation: { goBack } }) => {
  const phone = useValidatedInput('phone', '55 2303 3632');
  const addressOne = useValidatedInput('addressOne', '');
  const addressTwo = useValidatedInput('addressTwo', '');
  const postalCode = useValidatedInput('postalCode', '');
  const email = useValidatedInput('email', 'loremipsum@batched.com');
  const [items, setItems] = useState([
    { id: '1', value: 'apple', name: 'Apple' },
    { id: '2', value: 'banana', name: 'Banana' }
  ]);
  const country = useValidatedInput('select', {
    changeHandlerSelect: 'onSelect'
  });
  const birthDay = useValidatedInput('select', {
    changeHandlerSelect: 'onSelect'
  });

  //const isValid = isFormValid(firstName, mediumName, lastName, ssn, gender, birthDay);
  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
      <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
        <StepIndicator step={2} totalSteps={2} />
      </View>
      <Divider height-10 />
      <Text h14 blue02 regular>{i18n.t('myProfile.textContactInformation')}</Text>
      <Divider height-10 />
      <Divider height-25 />
      <View style={Styles.container}>
        <DropDownPicker
          {...country}
          label={i18n.t('myProfile.dropDownCountry')}
          options={items}
        //onFill={(code)=> filterPays(code)}
        />
        <Divider height-5 />
        <FloatingInput
          {...phone}
          editable={false} 
          label={i18n.t('myProfile.inputPhone')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...addressOne}
          label={i18n.t('myProfile.inputAddressOne')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...addressTwo}
          label={i18n.t('myProfile.inputAddressTwo')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...postalCode}
          label={i18n.t('myProfile.inputPostalCode')}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...email}
          editable={false} 
          label={i18n.t('myProfile.inputEmail')}
          autoCapitalize={'none'}
        />
      </View>
      <Divider height-20 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-20 />
      <ButtonRounded
        onPress={() => goBack()}
        disabled={false}
        dark
        size='lg'
      >
        <Text h14 semibold blue02>
          {i18n.t('myProfile.buttonSaveChanges')}
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>
  );
}


export default ContactInformation;