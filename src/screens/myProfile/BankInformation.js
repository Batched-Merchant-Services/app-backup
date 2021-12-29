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
import { generateRSA } from '@utils/api/encrypt';
const BankInformation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const registerData = redux?.register;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts
  const phone = useValidatedInput('phone', accounts?.phoneNumber);
  const bankName = useValidatedInput('bankName', '');
  const accountNumber = useValidatedInput('accountNumber', '');
  const clabeInterbank = useValidatedInput('clabeInterbank', '');
  const [valueCountries, setValueCountries] = useState([]);
  const [items, setItems] = useState([
    { id: '1', value: 'value1', name: 'value1' },
    { id: '2', value: 'value2', name: 'value2' }
  ]);
  const country = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });


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
 
  function getUpdateBankInformation() {
    const dataUpdateBank = {
      accountId: userProfile.accountId?? "",
      bankName: bankName?.value,
      accountNumber:generateRSA(accountNumber?.value),
      routingNumber: generateRSA(clabeInterbank?.value)
    }
    dispatch(editBankInfo({ dataUpdateBank }))
  }


  function getCreateBankInformation() {
    const dataCreateBank = {
      accountId: userProfile.accountId?? "",
      bankName: bankName?.value,
      accountNumber:generateRSA(accountNumber?.value),
      routingNumber: generateRSA(clabeInterbank?.value)
    }
    dispatch(createBankInfo({ dataCreateBank }))
  }

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
          labelDefault={valueCountries?.name}
        />
        <Divider height-5 />
        <FloatingInput
          {...phone}
          editable={false}
          label={'bank name'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...phone}
          editable={false}
          label={'account number'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...phone}
          editable={false}
          label={'interbank clabe'}
          autoCapitalize={'none'}
        />
        
      </View>
      <Divider height-20 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-20 />
      <ButtonRounded
        onPress={getCreateBankInformation}
        disabled={false}
        dark
      >
        <Text h14 semibold blue02>
          {i18n.t('myProfile.buttonSaveChanges')}
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>
  );
}


export default BankInformation;