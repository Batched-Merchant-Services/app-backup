import React, { useEffect,useState } from 'react';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import BoxLicenses from './components/BoxLicenses';
import i18n from '@utils/i18n';
import Loading from '../Loading';

import { cleanErrorLicenses,getLicenses } from '@store/actions/licenses.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';

const GetLicenses = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const referenceCode = useValidatedInput('referenceCode', '');

  const error = useSelector(state => state?.licenses?.showErrorLicenses);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());  
      dispatch(getLicenses()); 
      
    });
    return unsubscribe;
  }, []);

  console.log('licensesData',licensesData);
  if (licensesData?.isLoadingLicenses) {
    return <Loading />;
  }
  



  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Text h16 regular blue02>{i18n.t('Licenses.textGetYourLicenses')}</Text>
      <Text h12 white light>{i18n.t('Licenses.textYourLicensesWill')}</Text>
      <Divider height-15 />
      <FloatingInput
        {...referenceCode}
        label={i18n.t('Licenses.inputReferenceCode')}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-15 />
      <ButtonRounded
        disabled={false}
        blue
      >
        <Text h14 semibold white>
          {i18n.t('Licenses.textHowDoesItWork')}
        </Text>
      </ButtonRounded>
      <Divider height-15 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5/>
        <Text h12 white>{i18n.t('Licenses.textSelectYourInitial')}</Text>
      </View>
      <Divider height-10/>
      <BoxLicenses
         onPress={() => navigation.navigate("SelectLicense")}
        numberLicense={5}
        pricingLicense={licensesData?.getLicenses?.cost*5}
        percentPoint={500}
        green
      />
      <Divider height-10/>
      <BoxLicenses
        onPress={() => navigation.navigate("SelectLicense")}
        numberLicense={3}
        pricingLicense={licensesData?.getLicenses?.cost*3}
        percentPoint={300}
        blue
      />
      <Divider height-10/>
      <BoxLicenses
        onPress={() => navigation.navigate("SelectLicense")}
        numberLicense={1}
        pricingLicense={licensesData?.getLicenses?.cost*1}
        percentPoint={100}
        blueDark
      />
      <SnackNotice
        visible={error}
        message={licensesData?.error?.message}
        timeout={3000}
      />
    </BackgroundWrapper>


  );
}


export default GetLicenses;