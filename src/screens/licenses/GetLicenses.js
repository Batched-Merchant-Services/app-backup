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

import { cleanErrorLicenses,getLicenses,saveCurrentLicense } from '@store/actions/licenses.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';

const GetLicenses = ({ navigation,route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const referenceCode = useValidatedInput('referenceCode', '');
  const params = route?.params;
  const error = useSelector(state => state?.licenses?.showErrorLicenses);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());  
      dispatch(getLicenses()); 
    });
    return unsubscribe;
  }, []);

 

  function handleSelectLicense(license) {
    const selectLicense = {
      numberStep: license,
      percentStep: '100%',
      amountStep: licensesData?.getLicenses?.cost
    }
    dispatch(saveCurrentLicense({ selectLicense })); 
    navigation.navigate("SelectLicense")
  }

  const handleDashboard = () =>{
    if (params?.page === 'myBatched') {
      navigation.navigate('DrawerScreen',{
        screen: 'HomeMyBatched'})
    }else if (params?.page === 'dashboard') {
      navigation.navigate('DrawerScreen',{
        screen: 'Dashboard'})
    }else{
      return null
    }
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={params?.page === 'myBatched'|| "dashboard" ?true:false} onPressLeft={handleDashboard} navigation={navigation}>
      <Text h16 regular blue02>{i18n.t('Licenses.textGetYourLicenses')}</Text>
      <Text h12 white light>{i18n.t('Licenses.textYourLicensesWill')}</Text>
      <Divider height-20 />
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
        onPress={()=> handleSelectLicense(5)}
        numberLicense={5}
        pricingLicense={licensesData?.getLicenses?.cost*5}
        percentPoint={500}
        green
      />
      <Divider height-10/>
      <BoxLicenses
        onPress={()=>handleSelectLicense(3)}
        numberLicense={3}
        pricingLicense={licensesData?.getLicenses?.cost*3}
        percentPoint={300}
        blue
      />
      <Divider height-10/>
      <BoxLicenses
        onPress={()=>handleSelectLicense(1)}
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
       {/* <Loading modalVisible={licensesData?.isLoadingLicenses} /> */}
    </BackgroundWrapper>


  );
}


export default GetLicenses;