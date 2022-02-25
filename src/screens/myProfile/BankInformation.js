import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  SnackBar,
  SnackNotice,
  StepIndicator,
  FloatingInput,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import Styles from './styles'
import i18n from '@utils/i18n';
import { getCountries } from '../../store/actions/register.actions';
import { cleanErrorProfile, createBankInfo, editBankInfo } from '../../store/actions/profile.actions';
import { generateRSA } from '@utils/api/encrypt';
import Loading from '../Loading';
const BankInformation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const registerData = redux?.register;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts;
  const profile = redux?.profile;
  const bank = accounts?.bankInformation?.length > 0 ? accounts?.bankInformation[0] : '';
  const phone = useValidatedInput('phone', bank?.phoneNumber);
  const bankName = useValidatedInput('bankName', bank?.bankName);
  const routingNumber = useValidatedInput('routingNumber', bank?.routingNumber);
  const accountNumber = useValidatedInput('accountNumber', bank?.accountNumber);
  const beneficiary = useValidatedInput('beneficiary', bank?.beneficiary);
  const bankAddress = useValidatedInput('bankAddress', bank?.streetAddress);
  const bankCity = useValidatedInput('bankCity', bank?.city);
  const bankZipCode = useValidatedInput('bankZipCode', bank?.postalCode);
  const bankCountry = useValidatedInput('bankCountry', bank?.countryCode);
  const bankSate = useValidatedInput('bankSate', bank?.state);
  const swiftCode = useValidatedInput('swiftCode', bank?.swiftCode);
  const [successInfo, setSuccessInfo] = useState(false);
  const [valueCountries, setValueCountries] = useState([]);
  const [items, setItems] = useState([
    { id: '1', value: 'value1', name: 'value1' },
    { id: '2', value: 'value2', name: 'value2' }
  ]);
  const country = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const error = useSelector(state => state?.profile?.errorProfile);
  const success = useSelector(state => state?.profile?.successEditBankInfo);

  useEffect(() => {
    dispatch(cleanErrorProfile());
    dispatch(getCountries());
  }, [dispatch]);


  useEffect(() => {
    if (registerData?.countries) {
      if (registerData?.countries?.length > 0) {
        setItems(registerData?.countries)
        const valueCountry = registerData?.countries?.filter(key => key?.value === bank?.country);
        setValueCountries(...valueCountry);
      }
    }
  }, [registerData?.countries]);



  function updateBankInformation() {
    const dataUpdateBank = {
      id: bank.id,
      accountId: userProfile.accountId ?? "",
      bankName: bankName?.value,
      accountNumber: generateRSA(accountNumber?.value),
      routingNumber: generateRSA(routingNumber?.value),
      beneficiary: beneficiary?.value,
      phoneNumber: phone?.value,
      swiftCode: swiftCode?.value,
      streetAddress: bankAddress?.value,
      city: bankCity?.value,
      postalCode: bankZipCode?.value,
      state: bankSate?.value,
      countryCode: bankCountry?.value
    }
    dispatch(editBankInfo({ dataUpdateBank }))
  }


  function createBankInformation() {
    const dataCreateBank = {
      accountId: userProfile.accountId ?? "",
      bankName: bankName?.value,
      accountNumber: generateRSA(accountNumber?.value),
      routingNumber: generateRSA(routingNumber?.value),
      beneficiary: beneficiary?.value,
      phoneNumber: phone?.value,
      swiftCode: swiftCode?.value,
      streetAddress: bankAddress?.value,
      city: bankCity?.value,
      postalCode: bankZipCode?.value,
      state: bankSate?.value,
      countryCode: bankCountry?.value
    }
    dispatch(createBankInfo({ dataCreateBank }))
  }

  if (success) {
    setSuccessInfo(true)
  }

  function handleSuccessInfo() {
    setSuccessInfo(true)
  }

  function closeSnack() {
    setSuccessInfo(false)
  }

  return (
    <>
      <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
        <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
          <StepIndicator step={5} totalSteps={5} />
        </View>
        <Divider height-10 />
        <Text h14 blue02 regular>{i18n.t('myProfile.bankInformation.titleBankInformation')}</Text>
        <Divider height-10 />
        <View style={Styles.container}>
          <FloatingInput
            {...bankName}
            label={i18n.t('myProfile.bankInformation.inputBankName')}
            autoCapitalize={'sentences'}
          />
          <Divider height-5 />
          <FloatingInput
            {...routingNumber}
            label={i18n.t('myProfile.bankInformation.inputRoutingNumber')}
            keyboardType="numeric"
          />
          <Divider height-5 />
          <FloatingInput
            {...accountNumber}
            label={i18n.t('myProfile.bankInformation.inputAccountNumber')}
            autoCapitalize={'sentences'}
          />
          <Divider height-5 />
          <FloatingInput
            {...beneficiary}
            label={i18n.t('myProfile.bankInformation.inputBeneficiary')}
            autoCapitalize={'sentences'}
          />
          <FloatingInput
            {...phone}
            label={i18n.t('myProfile.bankInformation.inputPhoneNumber')}
            keyboardType="numeric"
          />
          <Divider height-5 />
          <FloatingInput
            {...swiftCode}
            label={i18n.t('myProfile.bankInformation.inputSWIFTCode')}
            autoCapitalize={'sentences'}
          />
          <Divider height-5 />
          <FloatingInput
            {...bankAddress}
            label={i18n.t('myProfile.bankInformation.inputBankStreetAddress')}
            autoCapitalize={'sentences'}
          />
          <Divider height-5 />
          <FloatingInput
            {...bankCity}
            label={i18n.t('myProfile.bankInformation.inputCity')}
            autoCapitalize={'sentences'}
          />
          <Divider height-5 />
          <FloatingInput
            {...bankZipCode}
            label={i18n.t('myProfile.bankInformation.inputZipCode')}
            autoCapitalize={'sentences'}
          />
          <Divider height-5 />
          <FloatingInput
            {...bankCountry}
            label={i18n.t('myProfile.bankInformation.inputCountry')}
            autoCapitalize={'sentences'}
          />
          <Divider height-5 />
          <FloatingInput
            {...bankSate}
            label={i18n.t('myProfile.bankInformation.inputState')}
            autoCapitalize={'sentences'}
          />
        </View>
        <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
        <Divider height-10 />
        <View flex-1 row bottom >
          <ButtonRounded
            //onPress={accounts?.bankInformation?.length > 0? updateBankInformation:createBankInformation}
            onPress={handleSuccessInfo}
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
              navigation.navigate('DrawerScreen', {
                screen: 'HomeProfile',
                merge: true
              });
            }}
            //disabled={!isValid}
            dark
            size='sm'
          >
            <Text h14 blue02 semibold>
              {i18n.t('myProfile.bankInformation.buttonExit')}
            </Text>
          </ButtonRounded>
        </View>
        <Loading modalVisible={profile?.isLoadingProfile} />
        <View flex-1 bottom>
          <SnackNotice
              visible={error || successInfo}
              message={profile?.error?.message}
          />
        </View>
      </BackgroundWrapper>
      <View blue04 paddingH-20>
        <SnackBar
          success
          visible={successInfo}
          message={'Informacion Guardada con exito'}
          handleClose={closeSnack}
        />
        <Divider height-20 />
      </View>
    </>
  );
}


export default BankInformation;