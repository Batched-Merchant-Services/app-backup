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
import { NativeModules } from 'react-native';
import { useValidatedInput } from '@hooks/validation-hooks';
import check from '@assets/icons/white-check.png';

import {
  useColorScheme,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import  Colors  from '@styles/Colors';

const ReferralCode = ({ navigation }) => {
  const { StatusBarManager } = NativeModules; 
  const [userID, setUserID] = useState(false);
  const referenceCode = useValidatedInput('referenceCode', '');
  const redux = useSelector(state => state);
  const [statusBar, setStatusBar] = useState(0);

  useEffect(() => {
    StatusBarManager.getHeight(({height}) =>setStatusBar(height));
  }, [])

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
    <BackgroundWrapper showNavigation={true} childrenLeft={true}>
      <Divider height-10 />
      <Text h16 regular blue02>Do you have a refferal code?</Text>
      <Text h14 white light>Whoever referred you will get a bonus and you will receive full benefits,<Text white semibold> everyone wins!</Text></Text>
      <Divider height-15 />
      <FloatingInput
        {...referenceCode}
        label={'Reference Code'}
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
          <Text h12 error semibold>User Not Found</Text>
        </View>
        </Fragment>
      )}
      </View>
      <Divider height-20 />
      <ButtonRounded
        onPress={() => navigation.navigate("GetLicenses")}
        disabled={false}
        blue
        size='lg'
      >
        <Text h14 semibold white>
            Next / Skip
        </Text>
      </ButtonRounded>
      
    </BackgroundWrapper>


  );
}


export default ReferralCode;