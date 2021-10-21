import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import rectangleConfirm from '@assets/icons/rectangleConfirm.png';
import logout from '@assets/icons/logout.png';
import Styles from './styles'
import i18n from '@utils/i18n';
import { ViewBase } from 'react-native';
import Colors from '@styles/Colors';


const Logout = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('sms', '');


  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-20 />
      <ImageBackground source={rectangleConfirm} resizeMode="cover" style={Styles.image}>
        <View centerH centerV style={[Styles.borderCircle,{borderColor:Colors.white}]}>
          <ImageResize
            source={logout}
            height={verticalScale(40)}
            width={scale(40)}
          />
        </View>
        
      </ImageBackground>
      <Divider height-30 />
      <Text h18 regular blue02>{i18n.t('Logout.textLogout')}</Text>
      <Divider height-20 />
      <Text h18 regular blue02>{i18n.t('Logout.textAreYouSure')}</Text>
      <Divider height-20 />
      <View blue01 width-36 height-1 />

      <Divider height-25 />
      <Text h12 white>{i18n.t('Logout.textIfYouAreFullActive')}</Text>
      <Divider height-25 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => {
            navigation.navigate('DrawerScreen',{
              screen: 'Dashboard',
              merge: true
            });
          }}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('Logout.buttonStayLoggedIn')}
          </Text>
        </ButtonRounded>
        <Divider width-10 />
        <ButtonRounded
          onPress={() => {
            navigation.navigate('SignOut',{
              screen: 'Login',
              merge: true
            });
          }}
          //disabled={!isValid}
          blue
          size='sm'
        >
          <Text h14 semibold>
            {i18n.t('Logout.buttonLogout')}
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-25 />
    </BackgroundWrapper>
  );
}

export default Logout;