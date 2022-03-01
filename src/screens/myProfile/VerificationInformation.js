import React, { useEffect, useState, Fragment } from 'react';
import {
  Text,
  View,
  Divider,
  SnackBar,
  SnackNotice,
  StepIndicator,
  ButtonRounded,
  DropDownPicker,
  ImageUploadPiker,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import Styles from './styles'
import i18n from '@utils/i18n';
import { cleanErrorProfile, createKYC, editKYC, getTypeIdentification } from '../../store/actions/profile.actions';
import Front from '@assets/icons/blue-frontId.png';

import Back from '@assets/icons/blue-backId.png';
import Selfie from '@assets/icons/blue-selfie.png';
import Address from '@assets/icons/blue-address.png';
import Loading from '../Loading';
import IconCardFront from '../../assets/iconSVG/IconsKYC/IconCardFront';
import IconCardBack from '../../assets/iconSVG/IconsKYC/IconCradBack';
import IconSelfie from '../../assets/iconSVG/IconsKYC/IconSelfie';
import IconProofAddress from '../../assets/iconSVG/IconsKYC/IconProofAddress';

const VerificationInformation = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts
  const profile = redux?.profile;
  const kyc = accounts?.kyc?.length > 0 ? accounts?.kyc[0] : '';
  const imageFront = useValidatedInput('file', kyc?.frontId);
  const imageBack = useValidatedInput('file', kyc?.backId);
  const imageProofAddress = useValidatedInput('file', kyc?.faceId);
  const imageSelfie = useValidatedInput('file', kyc?.documentId);
  const [successInfo, setSuccessInfo] = useState(false);
  const [typeIdentity, setTypeIdentity] = useState([]);
  const [valueIdentity, setValueIdentity] = useState([]);
  const typeIdentificationD = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const error = useSelector(state => state?.profile?.errorProfile);
  const successEdit = useSelector(state => state?.profile?.successEditKYC);


  useEffect(() => {
    dispatch(cleanErrorProfile());
    const countryCode = accounts?.countryCode;
    dispatch(getTypeIdentification({ countryCode }));
    //getTypeIdentity();
  }, [dispatch])

  useEffect(() => {
    if (profile?.dropDownIdentification) {
      if (profile?.dropDownIdentification?.length > 0) {
        setTypeIdentity(profile?.dropDownIdentification)
        const valueCountry = profile?.dropDownIdentification?.filter(key => key?.value?.toString() === kyc?.typeIdentification);
        setValueIdentity(...valueCountry);
      }
    }
  }, [profile?.dropDownIdentification]);
  

  function getUpdateAddress() {
    const typeIdent = typeIdentificationD?.value;
    const dataUpdateKYC = {
      id: kyc?.id ?? "",
      accountId: userProfile.accountId ?? "",
      frontId: imageFront?.value,
      backId: imageBack?.value,
      faceId: imageSelfie?.value,
      typeIdentification: typeIdent?.value,
      documentId: imageProofAddress?.value,
      kycid: kyc?.kycid ?? "0",
      isComplete: true
    }
    dispatch(editKYC({ dataUpdateKYC }))
  }


  function getCreateKYC() {
    const types = typeIdentificationD?.value;
    const dataCreateKYC = {
      accountId: userProfile?.accountId ?? "",
      frontId: imageFront?.value,
      backId: imageBack?.value,
      faceId: imageSelfie?.value,
      typeIdentification: types?.value,
      documentId: imageProofAddress?.value,
      status: "0",
      kycid: kyc?.kycid ?? "0",
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
        <View flex-1 row centerV>
          <Text blue02 h4>{'\u2B24'}</Text>
          <Divider width-5 />
          <Text h11 white light>{i18n.t('myProfile.kyc.textYourImagesShould')}</Text>
        </View>
        <View flex-1 row centerV>
          <Text blue02 h4>{'\u2B24'}</Text>
          <Divider width-5 />
          <Text h11 white light>{i18n.t('myProfile.kyc.textTheFormatMust')}</Text>
        </View>
        <View flex-1 row centerV>
          <Text blue02 h4>{'\u2B24'}</Text>
          <Divider width-5 />
          <Text h11 white light>{i18n.t('myProfile.kyc.textTheMaximumSizeIs')}</Text>
        </View>
        <Divider height-10 />
        <Text h12 white light>{i18n.t('myProfile.kyc.textToBeApprovedPhotos')}</Text>
        <Divider height-10 />
        <Text h12 white bold>{i18n.t('myProfile.kyc.textIfThePhotosAreDiscarded')}</Text>
        <Divider height-10 />
        <View style={Styles.container}>
          <DropDownPicker
            {...typeIdentificationD}
            label={i18n.t('myProfile.dropDownTypeIdentification')}
            options={typeIdentity}
            labelDefault={valueIdentity?.name}
          />
          <Divider height-5 />
          <ImageUploadPiker
            {...imageFront}
            label={i18n.t('myProfile.kyc.buttonImageFront')}
            ImageEmpty={IconCardFront}
            typeImage='front'

          />
          <Divider height-15 />
          <ImageUploadPiker
            {...imageBack}
            label={i18n.t('myProfile.kyc.buttonImageBack')}
            ImageEmpty={IconCardBack}
            typeImage='back'
          />
          <Divider height-15 />
          <ImageUploadPiker
            {...imageSelfie}
            label={i18n.t('myProfile.kyc.buttonSelfie')}
            ImageEmpty={IconSelfie}
            typeImage='selfie'
          />
          <Divider height-15 />
          <ImageUploadPiker
            {...imageProofAddress}
            label={i18n.t('myProfile.kyc.buttonProofOfAddress')}
            ImageEmpty={IconProofAddress}
            typeImage='address'

          />
        </View>
        <Divider height-15 />
        <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
        <Divider height-5 />
        <View flex-1 row bottom >
          <ButtonRounded
            onPress={accounts?.kyc?.length > 0 ? getUpdateAddress : getCreateKYC}
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
        <Loading modalVisible={profile?.isLoadingProfile} />
        <View flex-1 bottom>
          <SnackNotice
            visible={error || successEdit}
            message={profile?.error?.message}
          />
        </View>
      </BackgroundWrapper>
  );
}


export default VerificationInformation;