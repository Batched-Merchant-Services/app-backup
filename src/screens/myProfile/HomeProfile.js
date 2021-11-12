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
  return (
    <BackgroundWrapper childrenLeft={Menu} menu showNavigation={true} navigation={navigation}>
      <Divider height-10 />
      <View centerV row>
        <View flex-1>
          <Text h16 blue02 light>{i18n.t('myProfile.textMyProfile')}</Text>
        </View>
        <View flex-1 right>
          <Text h12 green medium>{i18n.t('myProfile.textCompleted')}</Text>
        </View>
      </View>
      <Divider height-10 />
      {showReferralCode&&(
        <Text h12 white light>{i18n.t('myProfile.textReferredBy')} Victor Hugo U**** P*******</Text>
      )}
      {!showReferralCode&&(
        <View left>
          <Link>
            <Text h12 white medium left>{i18n.t('myProfile.textReferredCode')}</Text>
          </Link>
        </View>
        
      )}
     
      <Divider height-10 />
      <View blue03 height-230 paddingH-12 paddingV-15>
        <View row>
          <View flex-1>
            <Text h12 blue02 light>oscargarcia@uulala.io</Text>
            <Divider height-10 />
            <Text h16 blue02 semibold>Oscar</Text>
            <Text h16 white light>García Lorem Ipsum</Text>
            <Divider height-10 />
            <Text h12 blue02 light>Uulala ID:</Text>
            <Text h12 white light>IMCG4WHEIILNM</Text>
            <Divider height-10 />
            <Text h12 blue02 light>{i18n.t('myProfile.textReferenceCode')}</Text>
            <Text h12 green semibold>udefinode.com/cni4w7y3u</Text>
          </View>
          <View right>
            <View width-80 height-80 style={{ borderColor: Colors.blue02, borderWidth: 1 }}>
              {showImage&&(
                <ImageResize
                  source={camera}
                  height={verticalScale(16)}
                  width={scale(16)}
                />
              )}
              {!showImage&&(
                <View flex-1 blue02 centerH centerV>
                  <Text h32 white semibold>OG</Text>
                </View>
              )}
              <View centerH centerV blue02 width-20 height-20 style={{position:'absolute', bottom:0,right:0}}>
                <ImageResize
                  source={camera}
                  height={verticalScale(16)}
                  width={scale(16)}
                />
              </View>
            </View>
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
      <Text h14 white medium>{i18n.t('myProfile.textPersonalInformation')}</Text>
      <Divider height-15 />
      <Text h10 white regular>{i18n.t('myProfile.textItIsVeryImportant')}</Text>
      <Divider height-15 />
      <ButtonRounded
        disabled={false}
        blue
        onPress={() => {
            navigation.navigate('SignIn',{
              screen: 'PersonalInformation',
              merge: true
            });
          }}
      >
        <Text h14 white semibold>{i18n.t('myProfile.buttonCompleteInformation')}</Text>
      </ButtonRounded>
    </BackgroundWrapper>
  );
}


export default HomeProfile;