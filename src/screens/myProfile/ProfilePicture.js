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
import upload from '@assets/icons/white-upload.png';

import Styles from './styles'
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';

const ProfilePicture = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const [showImage, setShowImage] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const dataUser = redux?.user;
  const points = redux?.points;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts
  return (
    <BackgroundWrapper childrenLeft={Menu} menu showNavigation={true} navigation={navigation}>
      <Text h14 blue02 regular>Profile picture:</Text>
      <Divider height-10 />
      <View flex-1 centerH centerV>
        {/* {accounts?.avatarImage !== '' && (
          <ImageResize
            source={{ uri: accounts?.avatarImage }}
            height={verticalScale(320)}
            width={scale(320)}
          />
        )} */}
        {accounts?.avatarImage !== '' && (
          <View  width-320 height-320 blue02 >
            <View flex-1 centerH centerV>
              <Text semibold white style={{ fontSize: 110 }}>{accounts?.alias}</Text>
            </View>
            <View flex-1 right bottom style={{width:'100%'}}>
            <View blue04 width-40 height-40 centerV centerH >
              <ImageResize
                source={upload}
                height={verticalScale(30)}
                width={scale(30)}
              />
            </View>
            </View>
            
          </View>
        )}
      </View>
      <View flex-1 bottom >
        <ButtonRounded
          onPress={() => {
            navigation.navigate('SignIn', {
              screen: 'BankInformation',
              merge: true
            });
          }}
          //disabled={!isValid}
          dark
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


export default ProfilePicture;