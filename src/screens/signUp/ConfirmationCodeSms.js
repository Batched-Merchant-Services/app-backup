import React, { useEffect,useState } from 'react';
import { useColorScheme,TouchableOpacity,Picker } from 'react-native';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale,verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  ButtonRounded,
  FloatingInput,
  StepIndicator,
  BackgroundWrapper
} from '@components';
import StepButton from './components/StepsButton';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Styles from './styles'
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';
import DropDown from '../../components/DropDownPicker';
const Register = ({ navigation }) => {
  const redux = useSelector(state => state);
  const email = useValidatedInput('email', '');
  const password = useValidatedInput('password', '');


  useEffect(() => {
    console.log('redux', redux)
  }, [])


  const { data, error, loading } = useQuery(FETCH_TODOS);
  //console.log('data', data, error, loading)

  if (error) {
    console.error(error);
  }

  // if (loading) {
  //   console.log('loading');
  // }



  return (
    <BackgroundWrapper>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-15 />
      <StepButton navigation={navigation}/>
      <Divider height-15 />
      <Text h16 blue02>We have sent you a confirmation code to your email and a text message to your phone number.</Text>
      <Text h12 white>You will receive the code in less than 5 minutes, check your inbox emails and keep an eye on messages via SMS received on your mobile.</Text>
      <Divider height-25 />
      <FloatingInput
        {...email}
        label={'Reference Code'}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
       <Divider height-5 />
       <StepIndicator step={1} totalSteps={4} />
       <Divider height-10 />
        <Text h12 white left>If several minutes have passed and you have not received it, check your email in the SPAM section. If you still don't receive it, press the "back" button and try again.</Text>
      <Divider height-35 />
      <View flex-1 row >
      <ButtonRounded
        onPress={() => navigation.navigate("Dashboard")}
        disabled={false}
        blue
        size='lg'
      >
        <Text h14 semibold>
          Next
        </Text>
      </ButtonRounded>
      <Divider width-15 />
      <ButtonRounded
        onPress={() => navigation.navigate("Dashboard")}
        disabled={false}
        blue
        size='lg'
      >
        <Text h14 semibold>
          Next
        </Text>
      </ButtonRounded>
      </View>
    
      <Divider height-15 />
      <View flex-1 row bottom>
        <Link>
          <Text h12 white>Terms and Conditionsd</Text>
        </Link>
        <Divider width-10 />
        <Link>
          <Text h12 white>Privacy Policy</Text>
        </Link>
      </View>
      <Divider height-15 />
    </BackgroundWrapper>
  );
}


export default Register;