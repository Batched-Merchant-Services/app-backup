import React, { Fragment, useEffect, useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
  ImageResize,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import check from '@assets/icons/white-check.png';
import i18n from '@utils/i18n';
import {
  useColorScheme,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import Colors from '@styles/Colors';
import { validateReference } from '@store/actions/licenses.actions';
import Loading from '../Loading';

import { cleanError } from '@store/actions/auth.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorLicenses } from '@store/actions/licenses.actions';

const ReferralCode = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const [userID, setUserID] = useState(false);
  const referenceCode = useValidatedInput('referenceCode', '');
  const [statusBar, setStatusBar] = useState(0);
  const showData = licensesData?.dataLicenses?.firstName ? true : false
  const error = useSelector(state => state?.licenses?.showErrorLicenses);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanError());
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;
  }, []);


  function handleNextSkip() {
    navigation.navigate('RegisterProfileBasic',
      {referral: referenceCode?.value }
    );
    
  }
  async function handleReferralCode() {
    dispatch(validateReference({ referenceCode }));
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Divider height-10 />
      <Text h16 regular blue02>{i18n.t('Licenses.textEnterYourReferralCode')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('Licenses.textIfYouWantToRefer')}</Text>
      <Divider height-5 />
      <Text h12 white light>{i18n.t('Licenses.textEnterTheReferenceCode')}</Text>
      <Text h12 white light>{i18n.t('Licenses.textIfTheAdvisorShownIsCorrect')}</Text>
      <Divider height-20 />
      <Text h12 white semibold>{i18n.t('Licenses.textOneOfOurAdvisorsWill')}</Text>
      <Divider height-20 />
      <FloatingInput
        {...referenceCode}
        label={i18n.t('Licenses.inputReferenceCode')}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-5 />
      <ButtonRounded
          onPress={handleReferralCode}
          disabled={false}
          dark
        >
          <Text h14 semibold blue02 center>
            {i18n.t('Licenses.buttonSearch')}
          </Text>
        </ButtonRounded>
        <Divider height-20 />
      <View centerV row height-60 paddingL-10 style={{ borderColor: Colors.blue02, borderWidth: 1 }}>
        {showData && (
          <Fragment>
            <View centerV centerH width-40 height-40 style={{ borderColor: Colors.blue02, borderWidth: 2 }}>
              <ImageResize source={{ uri: licensesData?.dataLicenses?.avatarImage }} width={verticalScale(20)} height={verticalScale(20)} />
            </View>
            <Divider width-15 />
            <View>
              {/* <Text h12 blue02>Uulala ID: IMCG4WHEIILNM</Text> */}
              <Text h12 white semibold>{licensesData?.dataLicenses?.firstName + ' ' + licensesData?.dataLicenses?.lastName}</Text>
            </View>
          </Fragment>
        )}
        {!showData && (
          <Fragment>
            <View centerV centerH width-40 height-40 blue02 />
            <Divider width-15 />
            <View>
              <Text h12 blue02>Uulala ID: ----</Text>
              <Text h12 error semibold>{i18n.t('Licenses.textUserNotFound')}</Text>
            </View>
          </Fragment>
        )}
      </View>
      <Divider height-30 />
      <View flex-1>
        <ButtonRounded
          onPress={handleNextSkip}
          disabled={!licensesData?.statusCodeReferral}
          blue
        >
          <Text h14 semibold white>
            {i18n.t('Licenses.buttonContinue')}
          </Text>
        </ButtonRounded>
      </View>
      <View flex-1 bottom>
        <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue. Duis vel ligula in felis cursus pellentesque. Nam tellus tellus, gravida ut luctus a, pellentesque nec est.</Text>
        <Divider height-10 />
        <Text h10 white light>All rights reserved. Batched.com</Text>
      </View>
      <SnackNotice
        visible={error}
        message={licensesData?.error?.message}
        timeout={3000}
      />
      <Loading modalVisible={licensesData?.isLoadingLicenses} />
    </BackgroundWrapper>


  );
}


export default ReferralCode;