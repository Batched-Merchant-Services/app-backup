import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { Linking,Animated } from 'react-native';
import BoxLicenses from './components/BoxLicenses';
import i18n from '@utils/i18n';
import { cleanErrorLicenses, saveCurrentLicense } from '@store/actions/licenses.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanError } from '../../store/actions/auth.actions';


const GetLicenses = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const params = route?.params;
  const error = useSelector(state => state?.licenses?.showErrorLicenses);
  const [animated] = useState(new Animated.Value(0));
  const [animatedTwo] = useState(new Animated.Value(0));
  const [animatedThree] = useState(new Animated.Value(0));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(cleanError());
      dispatch(toggleSnackbarClose());
  
    });
    return unsubscribe;
  }, []);


  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start();

    Animated.timing(animatedTwo, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true
    }).start();
    Animated.timing(animatedThree, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();

  }, [licensesData?.getLicenses]);


  function handleSelectLicense(license) {
    const selectLicense = {
      numberStep: license,
      percentStep: '100%',
      amountStep: licensesData?.getLicenses?.cost * license,
      typeLicenses: licensesData?.getLicenses?.id
    }
    dispatch(saveCurrentLicense({ selectLicense }));
    navigation.push("SelectLicense")
  }

  const handleDashboard = () => {
    if (params?.page === 'myBatched') {
      navigation.navigate('HomeMyBatchedB')
    } else if (params?.page === 'dashboard') {
      navigation.navigate('Dashboard')
    } else {
      return null
    }
  }

  const handleOpenCycle = useCallback(async () => {
    const url = 'https://cycle.batched.com/'
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const animatedInterpolate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const animatedInterpolateTwo = animatedTwo.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });
  const animatedInterpolateThree = animatedThree.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={params?.page === 'myBatched' || "dashboard" ? true : false} onPressLeft={handleDashboard} navigation={navigation}>
      <Text h16 regular blue02>{i18n.t('Licenses.textGetYourLicenses')}</Text>
      <Text h12 white light>{i18n.t('Licenses.textYourLicensesWill')}</Text>
      <Divider height-20 />
      <ButtonRounded
        onPress={handleOpenCycle}
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
        <Divider width-5 />
        <Text h12 white>{i18n.t('Licenses.textSelectYourInitial')}</Text>
      </View>
      <Divider height-10 />
      <Animated.View style={{transform: [{ translateY: animatedInterpolate }]}}>
        <BoxLicenses
          onPress={() => handleSelectLicense(5)}
          numberLicense={5}
          pricingLicense={licensesData?.getLicenses?.cost * 5}
          percentPoint={500}
          green
        />
      </Animated.View>

      <Divider height-10 />
      <Animated.View style={{transform: [{ translateY: animatedInterpolateTwo }]}}>
        <BoxLicenses
          onPress={() => handleSelectLicense(3)}
          numberLicense={3}
          pricingLicense={licensesData?.getLicenses?.cost * 3}
          percentPoint={300}
          blue
        />
      </Animated.View>

      <Divider height-10 />
      <Animated.View style={{transform: [{ translateY: animatedInterpolateThree }]}}>
        <BoxLicenses
          onPress={() => handleSelectLicense(1)}
          numberLicense={1}
          pricingLicense={licensesData?.getLicenses?.cost * 1}
          percentPoint={100}
          blueDark
        />
      </Animated.View>
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