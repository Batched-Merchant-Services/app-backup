import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';
import Menu from '@assets/icons/hamburgerMenu.png';
import Clipboard from '@react-native-community/clipboard';
import { TouchableHighlight } from 'react-native';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import Styles from './styles'
import { useTheme } from '@react-navigation/native';
import IconUpload from '../../assets/iconSVG/IconsKYC/IconUpload';
import { generateColorRandom } from '../../utils/formatters';

const HomeProfile = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const [showReferralCode, setShowReferralCode] = useState(false);
  const dataUser = redux?.user;
  const brandTheme = dataUser?.Theme?.colors;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts;
  const { colors } = useTheme();

  const copyToClipboard = () => {
    Clipboard.setString(accounts?.id);
  }

  function handleProfilePicture() {
    navigation.navigate('ProfilePicture');
  }


  return (
    <BackgroundWrapper childrenLeft menu showNavigation={true} navigation={navigation}>
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
          <Text h12 white light>{i18n.t('myProfile.textReferredBy')} </Text>
        </View>

      )}

      <Divider height-10 />
      <View blue03 paddingH-12 paddingV-15>
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
            <Text h12 blue02 light>{i18n.t('myProfile.inputPhone')}</Text>
            <Text h12 white light>{accounts?.phoneNumber}</Text>
            <Divider height-10 />
            <Text h12 blue02 light>{i18n.t('myProfile.textReferenceCode')}</Text>
            <Text h12 green semibold>{accounts?.id}</Text>
          </View>
          <View right width-90 height-80 centerH centerV style={{ borderColor: colors.blue02, borderWidth: 1 }}>
            {accounts?.avatarImage === '' && (
              <ImageResize
                source={{ uri: accounts?.avatarImage }}
                height={verticalScale(76)}
                width={verticalScale(75)}
                resizeMode="stretch"
              />
            )}
            {accounts?.avatarImage !== '' && (
              <View width-90 height-80  centerH centerV style={{backgroundColor:generateColorRandom()}}>
                <Text h30 semibold>{accounts?.alias}</Text>
              </View>
            )}

            {accounts?.avatarImage !== '' && (
              <TouchableHighlight style={[Styles.containerMini, { backgroundColor: brandTheme?.blue02 ?? colors?.blue02 }]} onPress={handleProfilePicture} >
                <IconUpload height={verticalScale(18)} width={scale(18)} fill={brandTheme?.white ?? colors?.white} />
              </TouchableHighlight>
            )}
          </View>
        </View>
        <Divider height-12 />
        <ButtonRounded
          disabled={false}
          onPress={() => copyToClipboard()}
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
          navigation.navigate('PersonalInformation');
        }}
      >
        <Text h14 white semibold>{i18n.t('myProfile.buttonCompleteInformation')}</Text>
      </ButtonRounded>
      <Divider height-15 />
    </BackgroundWrapper>
  );
}


export default HomeProfile;