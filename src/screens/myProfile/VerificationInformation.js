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
import { createAddress, createKYC, editAddress, editKYC } from '../../store/actions/profile.actions';

const ContactInformation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const registerData = redux?.register;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts
  const phone = useValidatedInput('phone', accounts?.phoneNumber);
  const addressOne = useValidatedInput('addressOne', '');
  const addressTwo = useValidatedInput('addressTwo', '');
  const suburb = useValidatedInput('suburb', '');
  const municipality = useValidatedInput('municipality', '');
  const state = useValidatedInput('state', '');
  const street = useValidatedInput('street', '');
  const number = useValidatedInput('number', '');
  const zipCode = useValidatedInput('postalCode', '');
  const email = useValidatedInput('email', accounts?.email);
  const [valueCountries, setValueCountries] = useState([]);
  const [items, setItems] = useState([
    { id: '1', value: 'value1', name: 'value1' },
    { id: '2', value: 'value2', name: 'value2' }
  ]);
  const typeIdentification = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });


  // useEffect(() => {

  // }, [dispatch]);

 
  function getUpdateAddress() {
    const dataUpdateKYC = {
      id: accounts.kyc.id?? "",
      accountId: userProfile.accountId?? "",
      frontId:'',
      backId: '',
      faceId: '',
      typeIdentification: typeIdentification,
      documentId: '',
      kycid: accounts.kyc.kycid?? "0",
      isComplete: true
    }
    dispatch(editKYC({ dataUpdateKYC }))
  }



  function getCreateKYC() {
    const dataCreateKYC = {
      accountId: userProfile.accountId?? "",
      frontId:'',
      backId: '',
      faceId: '',
      typeIdentification: '',
      documentId:'',
      kycid: accounts.kyc.kycid?? "0",
      status: "0",
      isComplete: true
    }
    dispatch(createKYC({ dataCreateKYC }))
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
          {...typeIdentification}
          label={i18n.t('myProfile.dropDownCountry')}
          options={items}
          //labelDefault={valueCountries?.name}
        />
        <Divider height-5 />
      </View>
      <Divider height-20 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-20 />
      <ButtonRounded
        onPress={getCreateKYC}
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


export default ContactInformation;