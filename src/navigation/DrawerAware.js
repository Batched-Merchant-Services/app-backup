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
import { useTheme } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';


//Images
import Back from '@assets/icons/backBlue.png';
import blueRowRight from '@assets/icons/blue-row-right.png';
import blueIconPlus from '@assets/icons/blue-icon-plus.png';
import blueRestPlus from '@assets/icons/blue-icon-rest.png';
import blueLogOut from '@assets/icons/blue-logout.png';
import Logo from '@assets/brandBatched/black-logo.svg';
//import i18n from '@utils/i18n';
import { useTranslation, Trans, I18nextProvider } from 'react-i18next';
import { DevSettings, Linking, AsyncStorage, TouchableOpacity,Platform } from 'react-native';
import IconBack from '../assets/iconSVG/IconBack';
import IconRowRight from '../assets/iconSVG/IconRowRight';
import IconLogOut from '../assets/iconSVG/IconLogOut';
import NavigationService from './../../NavigationService';
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
    navigation.navigate('LogOut');
  }


  function changeLanguage(lng) {
    i18n.options.lng = lng;
    AsyncStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
    DevSettings.reload();
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
    const { colors } = useTheme();
    function handleClose() {
      navigation.closeDrawer();
  }

    return (
      <TouchableOpacity
        style={[{
          width: scale(30),
          height: verticalScale(30),
          justifyContent: 'center',
          alignItems: 'center'
        }]}
        onPress={handleClose}
      >
        <IconBack width={scale(32)} height={verticalScale(32)} fill={brandTheme?.blue02?? colors?.blue02} />
      </TouchableOpacity>
    );
  };



  const CustomLabel = ({ navigation, onPress, label, logout, language, legal, ...props }) => {
    const { colors } = useTheme();
    return (
      <View width-210>
        {!language && !legal && (
          <>
            <View flex-1 row>
              <View flex-1>
                <Text h14 blue04 semibold>{label}</Text>
              </View>
             
              <View  right >
                {logout &&(
                  <IconLogOut width={scale(14)} height={verticalScale(16)} fill={brandTheme?.blue04?? colors?.blue04} />
                )}
                {!logout &&(
                  <IconRowRight width={scale(9)} height={verticalScale(15)} fill={brandTheme?.blue04?? colors?.blue04} />
                )}
               
               
              </View>
            </View>
            <Divider height-10 />
            <View blue04 style={{ width: '100%', height: 1 }} />
          </>

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
          <Logo width={scale(120)} height={verticalScale(17)} />
        </View>
        <DrawerContentScrollView {...props} contentContainerStyle={{ top: Platform.OS === 'ios' ? verticalScale(-30) : verticalScale(10),width:'100%' }}>
        <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('Dashboard')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonDistributionCycle')} />}
            />
          </Ripple>
          
          {/* <Ripple color={'rgb(0, 106, 200)'} centered={true}
          >
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'Enter referral code'} />}
            />
          </Ripple> */}
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('HomeProfile')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonMyProfile')} />}
            />
          </Ripple>
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('HomeMyBatched')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonMyBatched')} />}
            />
          </Ripple>
          <DrawerItem
            label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonLegalInformation')} legal />}
          />
          {showTerm && (
            <View paddingL-15 centerV marginB-10>
              <TouchableOpacity
                onPress={handlePress}
              >
                <View flex-1 row centerV>
                  <Text blue04 h4>{'\u2B24'}</Text>
                  <Divider width-5 />
                  <Text h14 blue04 semibold>{i18n.t('General.menu.buttonTermsAndConditions')}</Text>
                </View>
              </TouchableOpacity>
              <Divider height-10 />
              <TouchableOpacity
                onPress={handlePressLicenses}
              >
                <View flex-1 row centerV>
                  <Text blue04 h4>{'\u2B24'}</Text>
                  <Divider width-5 />
                  <Text h14 blue04 semibold>{i18n.t('General.menu.buttonLegalPrivacyPolicy')}</Text>
                </View>
              </TouchableOpacity>
              <Divider height-20 />
              <View blue04 width-220 height-1 />
            </View>

          )}
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('HomeContact')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonContact')} />}
            />
          </Ripple>
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('Auth2fa')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonSecurity')} />}
            />
          </Ripple>
          <DrawerItem
            label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonLanguage')} language />}
          />
          <Ripple color={'rgb(0, 106, 200)'} centered={true}
            // onPress={() => {
            //   navigation.navigate('LogOut')
            // }}
            onPress={handleLogout}
          >
            <DrawerItem
              label={({ focused }) => <CustomLabel label={i18n.t('General.menu.buttonLogout')} logout />}
            />
          </Ripple>
        </DrawerContentScrollView>
      </SafeAreaView>
    </Animated.View>
  )
};

export default CustomDrawer;


