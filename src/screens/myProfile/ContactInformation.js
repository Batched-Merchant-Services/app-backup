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
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import Styles from './styles'
import i18n from '@utils/i18n';
import { getCountries } from '../../store/actions/register.actions';
import { createAddress, editAddress } from '../../store/actions/profile.actions';

const ContactInformation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const registerData = redux?.register;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts

  const suburb = useValidatedInput('suburb', '');
  const city = useValidatedInput('city', '');
  const state = useValidatedInput('state', '');
  const street = useValidatedInput('street', '');
  const number = useValidatedInput('number', '');
  const zipCode = useValidatedInput('postalCode', '');
  const [valueCountries, setValueCountries] = useState([]);
  const [items, setItems] = useState([
    { id: '1', value: 'value1', name: 'value1' },
    { id: '2', value: 'value2', name: 'value2' }
  ]);
  const country = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const isValid = isFormValid(suburb,city,state,street,number,zipCode);
  console.log('accounts',dataUser?.dataUser)


  useEffect(() => {
    dispatch(getCountries());
    getShowCountry();
  }, [dispatch]);


  async function getShowCountry() {
    if (registerData?.countries) {
      if (registerData?.countries?.length > 0) {
        setItems(registerData?.countries)
        const valueCountry = registerData?.countries?.filter(key => console.log('key', key?.value === accounts?.countryCode));
        setValueCountries(...valueCountry);
        //
      }
    }
  }
 
  function getUpdateAddress() {
    const dataUpdateAddress = {
      id: accounts?.address.id??'',
      accountId: userProfile.accountId??'',
      suburb: suburb?.value,
      city: city?.value,
      country: country?.value,
      state: state?.value,
      street: street?.value,
      number: number?.value,
      typeAddress: accounts.address.typeAddress??'',
      zipCode: zipCode?.value,
      shortName: accounts.address.shortName??'',
      isComplete: true
    }
    dispatch(editAddress({ dataUpdateAddress }))
  }



  function getCreateAddress() {
    const dataCreateAddress = {
      accountId: userProfile?.accountId ?? "",
      suburb: suburb?.value,
      city: city?.value,
      country: country?.value,
      state: state?.value,
      street: street?.value,
      number: number?.value,
      typeAddress: accounts?.address?.typeAddress??'',
      zipCode: zipCode?.value,
      shortName: accounts?.address?.shortName??'',
      isComplete: true
    }
    dispatch(createAddress({ dataCreateAddress }))
  }



  console.log('valueCountries', valueCountries, userProfile)
  //const isValid = isFormValid(firstName, mediumName, lastName, ssn, gender, birthDay);
  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
      <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
        <StepIndicator step={2} totalSteps={5} />
      </View>
      <Divider height-10 />
      <Text h14 blue02 regular>{i18n.t('myProfile.textContactInformation')}</Text>
      <Divider height-10 />
      <View style={Styles.container}>
        <FloatingInput
          {...street }
          label={i18n.t('myProfile.inputStreet')}
          autoCapitalize={'sentences'}
        />
        <Divider height-5 />
        <FloatingInput
          {...number}
          label={i18n.t('myProfile.inputSuiteNumber')}
          keyboardType="numeric"
        />
        <Divider height-5 />
        <FloatingInput
          {...suburb}
          label={i18n.t('myProfile.inputSuburb')}
          autoCapitalize={'sentences'}
        />
        <Divider height-5 />
        <FloatingInput
          {...city}
          label={i18n.t('myProfile.inputCity')}
          autoCapitalize={'sentences'}
        />
        <Divider height-5 />
        <FloatingInput
          {...state}
          label={i18n.t('myProfile.inputState')}
          autoCapitalize={'sentences'}
        />
        <Divider height-5 />
        <DropDownPicker
          {...country}
          label={i18n.t('myProfile.dropDownCountry')}
          options={items}
          labelDefault={valueCountries?.name}
        />
        <Divider height-5 />
        <FloatingInput
          {...zipCode}
          label={i18n.t('myProfile.inputPostalCode')}
          keyboardType='numeric'
        />
      </View>
      <Divider height-10 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={getCreateAddress}
          disabled={!isValid}
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
            navigation.navigate('SignIn', {
              screen: 'VerificationInformation',
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
      </View>
      <Divider height-10 />
      <Text h10 white light>{i18n.t('General.textAllRightsReserved')}</Text>
    </BackgroundWrapper>
  );
}


export default ContactInformation;