import React, { useEffect, useState, Fragment } from 'react';
import {
  Text,
  View,
  Divider,
  ImageResize,
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
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity,Platform } from 'react-native';
import Front from '@assets/icons/blue-frontId.png';
import Back from '@assets/icons/blue-backId.png';
import Selfie from '@assets/icons/blue-selfie.png';
import Address from '@assets/icons/blue-address.png';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from "@styles/Colors";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'Choose an Image',
  includeBase64: true
};


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
      id: accounts.kyc.id ?? "",
      accountId: userProfile.accountId ?? "",
      frontId: '',
      backId: '',
      faceId: '',
      typeIdentification: typeIdentification,
      documentId: '',
      kycid: accounts.kyc.kycid ?? "0",
      isComplete: true
    }
    dispatch(editKYC({ dataUpdateKYC }))
  }



  function getCreateKYC() {
    const dataCreateKYC = {
      accountId: userProfile.accountId ?? "",
      frontId: '',
      backId: '',
      faceId: '',
      typeIdentification: '',
      documentId: '',
      kycid: accounts.kyc.kycid ?? "0",
      status: "0",
      isComplete: true
    }
    dispatch(createKYC({ dataCreateKYC }))
  }


  function handleImageFront() {
    launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = 'data:image/jpeg;base64,' + response?.assets[0].base64;

    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        console.log(source)
      }
    });
  }



  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
      <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
        <StepIndicator step={2} totalSteps={2} />
      </View>
      <Divider height-10 />
      <Text h14 blue02 regular>Official Documents:</Text>
      <Divider height-10 />
      <Text h10 white light><Text blue02 h5>{'\u2B24'}</Text> Your images should have good lighting readability</Text>
      <Text h10 white light><Text blue02 h5>{'\u2B24'}</Text> The format must be .jpg or .png</Text>
      <Text h10 white light><Text blue02 h5>{'\u2B24'}</Text> The maximun size is 2.5 MB</Text>
      <Divider height-10 />
      <Text h12 white light>To be approved, photos must be taken in good lighting, without reflections, without obstructing objects, clear and legible.</Text>
      <Divider height-10 />
      <Text h12 white bold>If the photos are discarded, you will need to retake them for approval.</Text>
      <Divider height-10 />
      <View style={Styles.container}>
        <DropDownPicker
          {...typeIdentification}
          label={i18n.t('myProfile.dropDownTypeIdentification')}
          options={items}
        //labelDefault={valueCountries?.name}
        />
        <Divider height-5 />
        <Fragment>
          <View blue02 padding-5>
            <Text h12 white semibold>Front*</Text>
          </View>
          <TouchableOpacity onPress={handleImageFront}>
            <View flex-1 centerH centerV height-150 textBlue01 style={{ borderColor: Colors.blue02, borderWidth: 1 }}>
              <ImageResize
                source={Front}
                width={scale(130)}
                height={verticalScale(130)}
              />
            </View>
          </TouchableOpacity>
        </Fragment>
        <Divider height-15 />
        <Fragment>
          <View blue02 padding-5>
            <Text h12 white semibold>Back*</Text>
          </View>
          <TouchableOpacity >
            <View flex-1 centerH centerV height-160 textBlue01 style={{ borderColor: Colors.blue02, borderWidth: 1 }}>
              <ImageResize
                source={Back}
                width={scale(130)}
                height={verticalScale(130)}
              />
            </View>
          </TouchableOpacity>
        </Fragment>
        <Divider height-15 />
        <Fragment>
          <View blue02 padding-5>
            <Text h12 white semibold>Your photo holding your ID in front*</Text>
          </View>
          <TouchableOpacity >
            <View flex-1 centerH centerV height-160 textBlue01 style={{ borderColor: Colors.blue02, borderWidth: 1 }}>
              <ImageResize
                source={Selfie}
                width={scale(130)}
                height={verticalScale(130)}
              />
            </View>
          </TouchableOpacity>
        </Fragment>
        <Divider height-15 />
        <Fragment>
          <View blue02 padding-5>
            <Text h12 white semibold>Proof of address*</Text>
          </View>
          <TouchableOpacity >
            <View flex-1 centerH centerV height-160 textBlue01 style={{ borderColor: Colors.blue02, borderWidth: 1 }}>
              <ImageResize
                source={Address}
                width={scale(130)}
                height={verticalScale(130)}
              />
            </View>
          </TouchableOpacity>
        </Fragment>
      </View>
      <Divider height-15 />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-5 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={getCreateKYC}
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
              screen: 'ProfilePicture',
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