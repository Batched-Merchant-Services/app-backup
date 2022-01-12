import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import camera from '@assets/icons/camera.png';
import Menu from '@assets/icons/hamburgerMenu.png';
import Styles from './styles'
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';

const HomeProfile = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const [showImage, setShowImage] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts;


  return (
    <BackgroundWrapper childrenLeft={Menu} menu showNavigation={true} navigation={navigation}>
      <Divider height-10 />
      <View centerV row>
        <View flex-1>
          <Text h16 blue02 light>{i18n.t('myProfile.textMyProfile')}</Text>
        </View>
       
      </View>
      <Divider height-10 />
      {showReferralCode && (
        <Text h12 white light>{i18n.t('myProfile.textReferredBy')} Victor Hugo U**** P*******</Text>
      )}
      {!showReferralCode && (
        <View left>
        <Text h12 white light>Referred by:</Text>
        </View>

      )}

      <Divider height-10 />
      <View blue03  paddingH-12 paddingV-15>
        <View row>
          <View flex-1>
            <Text h12 blue02 light>{accounts?.email}</Text>
            <Divider height-10 />
            <Text h16 blue02 semibold>{accounts?.firstName}</Text>
            <Text h16 white light>{accounts?.middleName}{' '}{accounts?.lastName}</Text>
            <Divider height-10 />
            <Text h12 blue02 light>Uulala ID:</Text>
            <Text h12 white light>{accounts?.id}</Text>
            <Divider height-10 />
            <Text h12 blue02 light>Phone</Text>
            <Text h12 white light>{accounts?.phoneNumber}</Text>
            <Divider height-10 />
            <Text h12 blue02 light>{i18n.t('myProfile.textReferenceCode')}</Text>
            <Text h12 green semibold>{accounts?.id}</Text>
          </View>
          <View right>
            {accounts?.avatarImage !== '' && (
              <ImageResize
                source={{ uri: accounts?.avatarImage }}
                height={verticalScale(80)}
                width={scale(80)}
              />
            )}
            {accounts?.avatarImage === '' && (
              <View width-80 height-80 style={{ borderColor: Colors.blue02, borderWidth: 1 }}>
                <Text h20 semibold>{accounts?.alias}</Text>
              </View>
            )}
          </View>
        </View>
        <Divider height-12 />
        <ButtonRounded
          disabled={false}
          dark
        >
          <Text h12 medium blue02>{i18n.t('myProfile.textCopyMyReferenceCode')}</Text>
        </ButtonRounded>
      </View>
      <Divider height-15 />
      <View row>
      <Text h14 white medium>{i18n.t('myProfile.textPersonalInformation')}</Text>
        <View flex-1 right>
          <Text h12 green medium>{i18n.t('myProfile.textCompleted')}</Text>
        </View>
      </View>
     
      <Divider height-15 />
      <Text h10 white regular>{i18n.t('myProfile.textItIsVeryImportant')}</Text>
      <Divider height-15 />
      <ButtonRounded
        disabled={false}
        blue
        onPress={() => {
          navigation.navigate('SignIn', {
            screen: 'PersonalInformation',
            merge: true
          });
        }}
      >
        <Text h14 white semibold>{i18n.t('myProfile.buttonCompleteInformation')}</Text>
      </ButtonRounded>
      <Divider height-15 />
      <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue.</Text>
      <Divider height-10 />
      <Text h10 white light>{i18n.t('General.textAllRightsReserved')}</Text>
    </BackgroundWrapper>
  );
}


export default HomeProfile;