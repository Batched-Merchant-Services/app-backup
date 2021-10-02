import React, { useEffect,useState } from 'react';
import {
  Text,
  View,
  Divider,
  NavigationBar,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import BoxLicenses from './components/BoxLicenses';


const GetLicenses = ({ navigation }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('referenceCode', '');

  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Text h16 regular blue02>Get your licences.</Text>
      <Text h12 white light>Your licenses will give you access to participate in earning daily rewards points.</Text>
      <Divider height-15 />
      <FloatingInput
        {...referenceCode}
        label={'Reference Code'}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-15 />
      <ButtonRounded
        disabled={false}
        blue
        size='lg'
      >
        <Text h14 semibold white>
          How does it work?
        </Text>
      </ButtonRounded>
      <Divider height-15 />
      <View row centerV>
        <Text blue02 h5>{'\u2B24'}</Text>
        <Divider width-5/>
        <Text h12 white>Select your initial license package:</Text>
      </View>
      <Divider height-10/>
      <BoxLicenses
         onPress={() => navigation.navigate("SelectLicense")}
        numberLicense={5}
        pricingLicense={4950}
        percentPoint={500}
        green
      />
      <Divider height-10/>
      <BoxLicenses
        onPress={() => navigation.navigate("SelectLicense")}
        numberLicense={3}
        pricingLicense={2790}
        percentPoint={300}
        blue
      />
      <Divider height-10/>
      <BoxLicenses
        onPress={() => navigation.navigate("SelectLicense")}
        numberLicense={1}
        pricingLicense={990}
        percentPoint={100}
        blueDark
      />
    </BackgroundWrapper>


  );
}


export default GetLicenses;