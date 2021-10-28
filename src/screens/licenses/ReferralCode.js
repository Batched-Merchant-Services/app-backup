import React, { Fragment, useEffect,useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import check from '@assets/icons/white-check.png';
import i18n from '@utils/i18n';
import {
  useColorScheme,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import  Colors  from '@styles/Colors';

const ReferralCode = ({ navigation }) => {

  const [userID, setUserID] = useState(false);
  const referenceCode = useValidatedInput('referenceCode', '');
  const redux = useSelector(state => state);
  const [statusBar, setStatusBar] = useState(0);
  const isValid = isFormValid(referenceCode);

  useEffect(() => {
    console.log('redux', redux)
  }, [])

  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: colors.white,
    flex: 1
  };
  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Divider height-10 />
      <Text h16 regular blue02>{i18n.t('Licenses.textDoYouHaveAReferral')}</Text>
      <Text h14 white light>{i18n.t('Licenses.textWhoeverReferredYouWill')}<Text white semibold>{i18n.t('Licenses.textEveryoneWins')}</Text></Text>
      <Divider height-15 />
      <FloatingInput
        {...referenceCode}
        label={i18n.t('Licenses.inputReferenceCode')}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-15 />
      <View centerV row height-60 paddingL-10 style={{borderColor:Colors.blue02,borderWidth:1}}>
      {userID&&(
        <Fragment>
          <View centerV centerH width-40 height-40 style={{borderColor:Colors.blue02,borderWidth:2}}>
            <ImageResize source={check} width={verticalScale(20)} height={verticalScale(20)}  />
          </View>
          <Divider width-15 />
          <View>
            <Text h12 blue02>Uulala ID: IMCG4WHEIILNM</Text>
            <Text h12 white semibold>Victor Hugo U****** P******</Text>
          </View>
        </Fragment>
      )}
      {!userID&&(
        <Fragment>
          <View centerV centerH width-40 height-40 blue02/>
          <Divider width-15 />
          <View>
          <Text h12 blue02>Uulala ID: ----</Text>
          <Text h12 error semibold>{i18n.t('Licenses.textUserNotFound')}</Text>
        </View>
        </Fragment>
      )}
      </View>
      <Divider height-20 />
      <ButtonRounded
        onPress={() => navigation.navigate("GetLicenses")}
        disabled={!isValid}
        blue
      >
        <Text h14 semibold white>
          {i18n.t('Licenses.textNextSkip')}
        </Text>
      </ButtonRounded>
      
    </BackgroundWrapper>


  );
}


export default ReferralCode;