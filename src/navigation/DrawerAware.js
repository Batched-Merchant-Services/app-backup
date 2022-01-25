import React,{ useState,useCallback }from 'react';

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
import { DevSettings,Linking,AsyncStorage,TouchableOpacity} from 'react-native';
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



  const CustomLabel = ({ navigation, onPress, label, logout, language, legal,...props }) => {

    return (
      <View flex-1 width-222>
        {!language && !legal && (
          <View flex-1 row centerV>
            <Text h16 blue04 semibold>{label}</Text>
            <View flex-1 right>
              <ImageResize source={logout ? blueLogOut : blueRowRight} height={verticalScale(12)} width={scale(12)} />
            </View>
          </View>
        )}
        {language && !legal && (
          <View flex-1 row centerV>
            <Text h16 blue04 semibold>{label}</Text>
            <Divider width-10 />
            <View row right>
              <TouchableOpacity
                onPress={() => changeLanguage('en')}
                style={[{
                  backgroundColor: brandTheme?.blue04 ?? Colors?.blue04,
                  padding: verticalScale(8)
                }]}
              >
                <Text h11 white semibold>English</Text>
              </TouchableOpacity>
              <Divider width-10 />
              <TouchableOpacity
                onPress={() => changeLanguage('es')}
                style={[{
                  backgroundColor: brandTheme?.blue04 ?? Colors?.blue04,
                  padding: verticalScale(8)
                }]}
              >
                <Text h11 white semibold>Spanish</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {legal&&(
            <TouchableOpacity onPress={showTerms}>
              <View flex-1 row centerV>
                <Text h16 blue04 semibold>{label}</Text>
                <View flex-1 right>
                  <ImageResize source={showTerm?blueRestPlus:blueIconPlus} height={verticalScale(12)} width={scale(12)} />
                </View>
              </View>
            </TouchableOpacity> 
        )}
        <Divider height-12 />
        <View blue04 style={{width:'100%',height:1}}/>
      </View>
    );
  };

  return (
    <Animated.View style={[
      Styles.containerSideMenu, { backgroundColor: Colors.blue01}]} >
      <SafeAreaView style={Styles.imageContainer} edges={['top']}>
        <View row centerV marginH-10>
          <RenderLeftBack navigation={navigation} />
          <Divider width-30 />
          <Logo width={scale(120)} height={verticalScale(17)} fill="green" />
        </View>
        <DrawerContentScrollView {...props} contentContainerStyle={Styles.drawerContentContainerStyle}>
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
            {showTerm&&(
              <View paddingL-20 centerV marginB-10>
                <TouchableOpacity
                onPress={handlePress}
                >
                  <Text blue04 h5>{'\u2B24'}{' '}<Text h15 blue04 light>Terms and conditions</Text></Text>
                </TouchableOpacity>
                <Divider height-15 />
                <TouchableOpacity
                onPress={handlePressLicenses}
                >
                  <Text blue04 h5>{'\u2B24'}{' '}<Text h15 blue04 light>Legal Privacy policy</Text></Text>
                </TouchableOpacity>
              </View>
             
            )}
          <Ripple color={'rgb(0, 106, 200)'} centered={true} onPress={() => navigation.navigate('HomeContact')}>
            <DrawerItem
              label={({ focused }) => <CustomLabel label={'Contact'} />}
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


