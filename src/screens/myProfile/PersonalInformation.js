import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  SnackBar,
  DatePicker,
  SnackNotice,
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
import { getGender } from '@store/actions/register.actions';
import { cleanErrorProfile, updateUserProfileInfo } from '@store/actions/profile.actions';
import Loading from '../Loading';


const PersonalInformation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const registerData = redux?.register;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts;
  const profile = redux?.profile;
  const firstName = useValidatedInput('firstName', accounts?.firstName);
  const mediumName = useValidatedInput('', accounts?.middleName || accounts?.secondLastName);
  const lastName = useValidatedInput('lastName', accounts?.lastName);
  const ssn = useValidatedInput('ssn', accounts?.ssn);
  const phone = useValidatedInput('phone', accounts?.phoneNumber);
  const email = useValidatedInput('phone', accounts?.email);
  const [successInfo, setSuccessInfo] = useState(false);
  const [items, setItems] = useState([]);
  const [valueGender, setValueGender] = useState([]);
  const gender = useValidatedInput('select', accounts?.gender, {
    changeHandlerSelect: 'onSelect'
  });
  const birthDay = useValidatedInput('select', accounts?.birthday, {
    changeHandlerSelect: 'onSelect'
  });
  const error = useSelector(state => state?.profile?.errorProfile);
  const success = useSelector(state => state?.profile?.successUpdateInfo);

  useEffect(() => {
    dispatch(cleanErrorProfile());
    dispatch(getGender());
    getShowGender();
    // const unsubscribe = navigation.addListener('focus', () => {
    //   dispatch(getGender());
    //   getShowGender();
    // });
    // return unsubscribe;
  }, [dispatch]);

  async function getShowGender() {
    if (registerData?.gender) {
      if (registerData?.gender?.length > 0) {
        setItems(registerData?.gender)
        const valueGender = registerData?.gender?.filter(key => key?.value.toString() === accounts?.gender);
        setValueGender(...valueGender);
      }
    }
  }

  function handleUpdateInfo() {
    const genderValues = gender?.value;
    const dataProfile = {
      id: accounts?.id ?? '',
      firstName: firstName?.value ?? '',
      middleName: mediumName?.value ?? '',
      lastName: lastName?.value ?? '',
      secondLastName: mediumName?.value ?? '',
      birthday: birthDay?.value,
      nationalId: '',
      otherNationalId: '',
      gender: genderValues?.value ?? gender?.value,
      alias: accounts?.alias ?? "",
      countryCode: accounts?.countryCode ?? "",
      isComplete: true
    }
    dispatch(updateUserProfileInfo({ dataProfile }))
  }

  function handleClose() {
    setSuccessInfo(false)
  }


  //const isValid = isFormValid(firstName, mediumName, lastName, ssn, gender, birthDay);
  return (
    <>
      <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
        <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
          <StepIndicator step={1} totalSteps={5} />
        </View>
        <Divider height-10 />
        <Text h14 blue02 regular>{i18n.t('myProfile.textPersonalInformation')}</Text>
        <Divider height-10 />
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
            labelDefault={valueGender?.name}
          />
          <Divider height-5 />
          <DatePicker
            {...birthDay}
            label={i18n.t('Register.inputDateOfBirth')}
          />
          <Divider height-5 />
          <FloatingInput
            {...email}
            editable={false}
            label={i18n.t('Register.email')}
            autoCapitalize={'none'}
          />
          <Divider height-5 />
          <FloatingInput
            {...phone}
            editable={false}
            label={i18n.t('myProfile.inputPhone')}
            autoCapitalize={'none'}
          />
        </View>
        <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
        <Divider height-5 />
        <View flex-1 row bottom >
          <ButtonRounded
            onPress={handleUpdateInfo}
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
              navigation.navigate('SignIn', {
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
        </View>
        <Divider height-10 />
        <Text h10 white light>{i18n.t('General.textAllRightsReserved')}</Text>
        <Loading modalVisible={profile?.isLoadingProfile} />
        {/* <View flex-1 bottom>
          <SnackNotice
            visible={error || success}
            message={profile?.error?.message}
            timeout={3000}
          />
        </View> */}
      </BackgroundWrapper>
      {error || success && (
        <View blue04 paddingB-10 paddingH-15>
          <SnackNotice
            visible={error || success}
            message={profile?.error?.message}
            timeout={3000}
          />
        </View>
      )}
    </>
  );
}


export default PersonalInformation;