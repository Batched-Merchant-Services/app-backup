import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  Divider,
  ImageResize,
  SnackNotice
} from '@components';
import ReactNativePinView from "react-native-pin-view"
import i18n from '@utils/i18n';
//Redux
import { useSelector, useDispatch } from 'react-redux';
//Styles
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocalStorage from '@utils/localStorage';
import Colors from '@styles/Colors';
import Styles from './styles'
//Images
import Back from '@assets/icons/backBlue.png';

//actions
import { toggleSnackbarClose,toggleSnackbarOpen } from '@store/actions/app.actions';
import { cleanErrorRegister, setPassword } from '@store/actions/register.actions';
import Loading from '../Loading';



const PinConfirmation = ({ navigation, navigation: { goBack }, route }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const registerData = redux?.register;
  const userData = redux?.user;
  const brandTheme = userData?.Theme?.colors;

  const page = route?.params?.page;
  const newPinPage = page === 'newPin' ? true : false;
  const [snackVisible, setSnackVisible] = useState(false);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorRegister());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;

  }, []);

  const error = useSelector(state => state?.register?.showError);


  const onComplete = async (inputtedPin, clear) => {
    if (page === 'newPin') {
      const PinConfirm = await LocalStorage.get('pinConfirmation');
      if(inputtedPin !== PinConfirm){
        clear();
        dispatch(toggleSnackbarOpen('pin wrong'));
        setSnackVisible(true);
      }else{
        setPin(PinConfirm);
        setSnackVisible(false);
      }
    } else if (page === 'forgotPassword') {
      navigation.push('NewPassword');
    } else if (page === 'transferOption') {
      navigation.push('ConfirmationTransfer');
    }
    else {
      navigation.push('Login');
    }
  };

  async function setPin(pinConfirm) {
    const password = await LocalStorage.get('password');
    dispatch(setPassword({ pinConfirm, password }));
    
  }

  if (registerData?.isLoading) {
    return <Loading />;
  }

  if (registerData?.finishSetPasswordSuccess) {
    navigation.push('TermConditions');
  }

  return (
    <SafeAreaView style={[Styles.AndroidSafeArea, { backgroundColor: Colors.blue01 }]}>
      <StatusBar barStyle={"light-content"} />
      <View flex-1 blue01 marginH-20 >
        <View row centerV>
          <TouchableOpacity
            style={{
              width: scale(32),
              height: verticalScale(32),
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1e3,
              borderColor: Colors?.blue02,
              borderWidth: 1
            }}
            onPress={() => goBack()}
          >
            <ImageResize source={Back} height={verticalScale(20)} width={scale(20)} />
          </TouchableOpacity>
          <Divider width-30 />
          <View style={{ width: '75%' }}>
            <Text h18 blue04 medium center>{newPinPage ? i18n.t('pinConfirmation.textConfirmYourPIN') : i18n.t('pinConfirmation.textEnterYourConfirmationPIN')}</Text>
          </View>
        </View>
        <Divider height-20 />
        <Text h12 blue04 regular center>{i18n.t('pinConfirmation.textYouWillUseItTo')}</Text>
        <Divider height-20 />
        <Text h12 blue04 regular center>{i18n.t('pinConfirmation.textSixDigits')}</Text>
        <Divider height-10 />
        <ReactNativePinView
          pinLength={6}
          showInputText={true}
          inputViewFilledStyle={{
            backgroundColor: "#FFF",
          }}
          buttonTextColor={brandTheme?.blue02 ?? Colors.blue02}
          inputBgColor={brandTheme?.blue04 ?? Colors.blue04}
          inputBgOpacity={0.8}
          inputActiveBgColor={brandTheme?.blue02 ?? Colors?.blue02}
          onComplete={onComplete}
          keyboardViewStyle={{ borderColor: brandTheme?.blue04 ?? Colors.blue04, borderWidth: 1, borderRadius: verticalScale(2) }}
          inputViewStyle={{ width: verticalScale(20), height: verticalScale(20) }}
        // pinLength={6} // You can also use like that.
        />
      </View>
      <SnackNotice
        visible={snackVisible?snackVisible:error}
        message={registerData?.error?.message}
        timeout={3000}
      />
    </SafeAreaView>


  );
}


export default PinConfirmation;