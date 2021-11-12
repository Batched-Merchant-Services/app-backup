import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Animated} from 'react-native';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import {
  Text,
  View,
  Link,
  Divider,
  PinInput,
  SnackNotice,
  ImageResize,
  BackgroundWrapper
} from '@components';

import { useSelector, useDispatch } from 'react-redux';

//Styles
import Styles from './styles';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';
//Images
import Back from '@assets/icons/backBlue.png';
import i18n from '@utils/i18n';
import { getCodeReference,cleanErrorRegister } from '@store/actions/register.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import Loading from '../Loading';

const LoginCode = ({ navigation, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const registerData = redux?.register;
  const pinCode = useValidatedInput('pinCode', '');
  const [codeInValid, setCodeInValid] = useState(false);

  const error = useSelector(state => state?.register?.showError);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorRegister());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;
  }, []);


  function getInfo() {
    const reference = pinCode?.value;
    setCodeInValid(true);
    dispatch(getCodeReference({ reference }));
     
  }


  // if (registerData?.isLoading) {
  //   return <Loading modalVisible={registerData?.isLoading}/>;
  // }

  if (registerData?.finishValidateCodeSuccess) {
    navigation.navigate('SignOut', {
      screen: 'Register'
    });
  }


  return (
    <BackgroundWrapper>
      <View blue03 flex-1 padding-15 >
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
          <Divider width-10 />
          <View style={{ width: '80%' }}>
            <Text h18 white light center>{i18n.t('Register.textLoginCode')}</Text>
          </View>
        </View>
        <Divider height-20 />
        <View flex-1>
          <Text h12 white light center>{i18n.t('Register.textEnterYourCompanyCode')}</Text>
          <Divider height-50 />
          <View centerV>
            <PinInput {...pinCode} onSubmit={getInfo}/>
            <Divider height-30 />
            {codeInValid &&(
              <View centerH centerV>
                <Animated.Image
                  source={require("@assets/icons/codeInvalid.png")}
                />
                <Divider height-10 />
                <Text h12 regular white>{i18n.t('Register.textEnterYourCompanyCode')} </Text>
              </View>
              
            )}
          </View>
          <Divider height-30 />
          <View flex-1 >
            <Text h12 white semibold center>{i18n.t('Register.textYourProfileIn')}</Text>
            <Divider height-10 />
            <Text h12 white light center>{i18n.t('Register.textTheInformationRequested')}</Text>
          </View>
        </View>
        <Link>
          <Text h12 white>{i18n.t('Register.textIDontHaveACode')}</Text>
        </Link>
        <Divider height-30 />
      </View>
      <SnackNotice
        visible={error}
        message={registerData?.error?.message}
        timeout={3000}
      />
       <Loading  modalVisible={registerData?.isLoading}/>
    </BackgroundWrapper>
  );
}


export default LoginCode;