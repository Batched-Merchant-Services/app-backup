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
  ImageUploadPiker,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import Styles from './styles'
import i18n from '@utils/i18n';
import { getCountries } from '../../store/actions/register.actions';
import { createAddress, createKYC, editAddress, editKYC } from '../../store/actions/profile.actions';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity, Platform } from 'react-native';
import Front from '@assets/icons/blue-frontId.png';
import Back from '@assets/icons/blue-backId.png';
import Selfie from '@assets/icons/blue-selfie.png';
import Address from '@assets/icons/blue-address.png';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from "@styles/Colors";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setFile } from '../../store/actions/user.action';
import { convertImage } from '@utils/formatters';
const options = {
  title: 'Choose an Image',
  includeBase64: true
};


const ContactInformation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts
  const imageFront = useValidatedInput('file', '');
  const imageBack = useValidatedInput('file', '');
  const imageProofAddress = useValidatedInput('file', '');
  const imageSelfie = useValidatedInput('file', '');

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

  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
      <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
        <StepIndicator step={3} totalSteps={5} />
      </View>
      <Divider height-10 />
      <Text h14 blue02 regular>{i18n.t('myProfile.kyc.tittleOfficialDocuments')}</Text>
      <Divider height-10 />
      <Text h10 white light><Text blue02 h5>{'\u2B24'}</Text>{i18n.t('myProfile.kyc.textYourImagesShould')}</Text>
      <Text h10 white light><Text blue02 h5>{'\u2B24'}</Text>{i18n.t('myProfile.kyc.textTheFormatMust')}</Text>
      <Text h10 white light><Text blue02 h5>{'\u2B24'}</Text>{i18n.t('myProfile.kyc.textTheMaximumSizeIs')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('myProfile.kyc.textToBeApprovedPhotos')}</Text>
      <Divider height-10 />
      <Text h12 white bold>{i18n.t('myProfile.kyc.textIfThePhotosAreDiscarded')}</Text>
      <Divider height-10 />
      <View style={Styles.container}>
        <DropDownPicker
          {...typeIdentification}
          label={i18n.t('myProfile.dropDownTypeIdentification')}
          options={items}
        //labelDefault={valueCountries?.name}
        />
        <Divider height-5 />
        <ImageUploadPiker
          {...imageFront}
          label={i18n.t('myProfile.kyc.buttonImageFront')}
          imageEmpty={Front}
          typeImage='front'

        />
        <Divider height-15 />
        <ImageUploadPiker
          {...imageBack}
          label={i18n.t('myProfile.kyc.buttonImageBack')}
          imageEmpty={Back}
          typeImage='back'
        />
        <Divider height-15 />
        <ImageUploadPiker
          {...imageSelfie}
          label={i18n.t('myProfile.kyc.buttonSelfie')}
          imageEmpty={Selfie}
          typeImage='selfie'

        />
        <Divider height-15 />
        <ImageUploadPiker
          {...imageProofAddress}
          label={i18n.t('myProfile.kyc.buttonProofOfAddress')}
          imageEmpty={Address}
          typeImage='address'

        />
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