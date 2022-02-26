import React, { useState, useCallback, Fragment,useEffect } from 'react';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import {
  Text,
  View,
  Divider,
  ImageResize,
  BackgroundWrapper
} from '@components';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ripple from 'react-native-advanced-ripple';
import Styles from './styles';
import Colors from '@styles/Colors';

import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';


//Images
import Back from '@assets/icons/backBlue.png';
import blueRowRight from '@assets/icons/blue-row-right.png';
import blueIconPlus from '@assets/icons/blue-icon-plus.png';
import blueRestPlus from '@assets/icons/blue-icon-rest.png';
import blueLogOut from '@assets/icons/blue-logout.png';
import Logo from '@assets/brandBatched/black-logo.svg';
import { logoutSession } from '../store/actions/auth.actions';
//import i18n from '@utils/i18n';
import { useTranslation, Trans, I18nextProvider } from 'react-i18next';
import { DevSettings, Linking, AsyncStorage, TouchableOpacity } from 'react-native';
const {
  interpolate,
  Extrapolate
} = Animated;

const CustomDrawer = props => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const appData = redux.user;
  const auth = redux?.auth;
  const brandTheme = appData?.Theme?.colors;
  const [showTerm, setShowTerm] = useState(false);
  const [languageMenu, setLanguageMenu] = useState('');
  const { state, navigation } = props;
  const { t, i18n } = useTranslation();
  //const progress = useDrawerProgress();
  function handleLogout() {
    dispatch(logoutSession());
  }


  function changeLanguage(lng) {
    i18n.options.lng = lng;
    AsyncStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
    DevSettings.reload();
  }

  if (auth?.isLoggedOut) {
    navigation.navigate('SignIn', {
      screen: 'LogOut'
    });
  }
  useEffect(async() => {
    AsyncStorage.getItem('lang').then((value) => {
      setLanguageMenu(value);
    });
  }, [])
  

  function showTerms() {
    setShowTerm(!showTerm);
  }

  const handlePress = useCallback(async () => {
    const url = 'https://uulala.io/privacy.html'
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const handlePressLicenses = useCallback(async () => {
    const url = 'https://uulala-public.s3-us-west-2.amazonaws.com/panel/legal/PrivacyPolicy.pdf'
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }, []);




  const RenderLeftBack = ({ navigation }) => {
    function handleClose() {
      navigation.closeDrawer();
  }

    console.log('language',languageMenu)
    return (
      <TouchableOpacity
        style={[{
          width: scale(30),
          height: verticalScale(30),
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1e3,
          borderColor: brandTheme?.blue04 ?? Colors?.blue02,
          borderWidth: 1
        }]}
        onPress={handleClose}
      >
        <ImageResize source={Back} height={verticalScale(20)} width={scale(20)} />
      </TouchableOpacity>
    );
  };



  const CustomLabel = ({ navigation, onPress, label, logout, language, legal, ...props }) => {

    return (
      <View width-220 >
        {!language && !legal && (
          <Fragment>
            <View flex-1 row centerV >
              <Text h14 blue04 semibold>{label}</Text>
              <View flex-1 right>
                <ImageResize source={logout ? blueLogOut : blueRowRight} height={verticalScale(12)} width={scale(12)} />
              </View>
            </View>
            <Divider height-10 />
            <View blue04 style={{ width: '100%', height: 1 }} />
          </Fragment>

        )}
        {language && !legal && (
          <Fragment>
            <View flex-1 row centerV>
              <Text h14 blue04 semibold>{label}</Text>
              <Divider width-10 />
              <View row right>
                <TouchableOpacity
                  onPress={() => changeLanguage('en')}
                  style={[{
                    backgroundColor: languageMenu === 'en' ?brandTheme?.blue04 ?? Colors?.blue04:'transparent',
                    borderColor: brandTheme?.blue04 ?? Colors?.blue04,
                    borderWidth:1,
                    padding: verticalScale(8)
                  }]}
                >
                  <Text h11 semibold style={{color: languageMenu === 'en' ?brandTheme?.white ?? Colors?.white: brandTheme?.blue04 ?? Colors?.blue04}}>English</Text>
                </TouchableOpacity>
                <Divider width-10 />
                <TouchableOpacity
                  onPress={() => changeLanguage('es')}
                  style={[{
                    backgroundColor: languageMenu === 'es' ?brandTheme?.blue04 ?? Colors?.blue04:'transparent',
                    borderColor: brandTheme?.blue04 ?? Colors?.blue04,
                    borderWidth:1,
                    padding: verticalScale(8)
                  }]}
                >
                  <Text h11 semibold style={{color: languageMenu === 'es' ?brandTheme?.white ?? Colors?.white: brandTheme?.blue04 ?? Colors?.blue04}}>Spanish</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Divider height-10 />
            <View blue04 style={{ width: '100%', height: 1 }} />
          </Fragment>
        )}

        {legal && (
          <TouchableOpacity onPress={showTerms}>
            <View flex-1 row centerV>
              <Text h14 blue04 semibold>{label}</Text>
              <View flex-1 right>
                <ImageResize source={showTerm ? blueRestPlus : blueIconPlus} height={verticalScale(12)} width={scale(12)} />
              </View>
            </View>
            <Divider height-10 />
            {!showTerm&&(
              <View blue04 style={{ width: '100%', height: 1 }} />
              )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Animated.View style={[
      Styles.containerSideMenu, { backgroundColor: Colors.blue01 }]} >
      <SafeAreaView style={Styles.imageContainer} edges={['top']}>
        <Divider height-10 />
        <View row centerV marginH-10 >
          <RenderLeftBack navigation={navigation} />
          <Divider width-20 />
          <Logo width={scale(120)} height={verticalScale(17)} fill="green" />
        </View>
        <DrawerContentScrollView {...props} contentContainerStyle={{ top: verticalScale(-30) }}>
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('Dashboard')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'Distribution cycle'} />}
            />
          </Ripple>
          <Ripple color={'rgb(0, 106, 200)'} centered={true}
          >
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'Enter referral code'} />}
            />
          </Ripple>
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('HomeProfile')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'My profile'} />}
            />
          </Ripple>
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('HomeMyBatched')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'My Batched'} />}
            />
          </Ripple>
          <DrawerItem
            label={({ focused }) => <CustomLabel label={'Legal information'} legal />}
          />
          {showTerm && (
            <View paddingL-15 centerV marginB-10>
              <TouchableOpacity
                onPress={handlePress}
              >
                <View flex-1 row centerV>
                  <Text blue04 h4>{'\u2B24'}</Text>
                  <Divider width-5 />
                  <Text h14 blue04 semibold>Terms and conditions</Text>
                </View>
              </TouchableOpacity>
              <Divider height-10 />
              <TouchableOpacity
                onPress={handlePressLicenses}
              >
                <View flex-1 row centerV>
                  <Text blue04 h4>{'\u2B24'}</Text>
                  <Divider width-5 />
                  <Text h14 blue04 semibold>Legal Privacy policy</Text>
                </View>
              </TouchableOpacity>
              <Divider height-20 />
              <View blue04 width-220 height-1 />
            </View>

          )}
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('HomeContact')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'Contact'} />}
            />
          </Ripple>
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('SignIn', { screen: 'Auth2fa' })}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'Security'} />}
            />
          </Ripple>
          <DrawerItem
            label={({ focused }) => <CustomLabel label={'Language'} language />}
          />
          <Ripple color={'rgb(0, 106, 200)'} centered={true}
            // onPress={() => {
            //   navigation.navigate('SignIn', {
            //     screen: 'LogOut'
            //   })
            // }}
            onPress={handleLogout}
          >
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'Logout'} logout />}
            />
          </Ripple>
        </DrawerContentScrollView>
      </SafeAreaView>
    </Animated.View>
  )
};

export default CustomDrawer;


