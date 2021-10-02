import React from 'react';
import { Dimensions } from 'react-native';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import StepButton from '../signUp/components/StepsButton';

const Login = ({ navigation }) => {
  const email = useValidatedInput('email', '');
  const password = useValidatedInput('password', '');
  const isValid = isFormValid(email,password);



  const { data, error, loading } = useQuery(FETCH_TODOS);
  //console.log('data', data, error, loading)

  if (error) {
    console.error(error);
  }

  // if (loading) {
  //   console.log('loading');
  // }

  const backgroundStyle = {
    flex: 1
  };
 
  return (
    <BackgroundWrapper showNavigation={false}  navigation={navigation}>
     <View style={{height: Dimensions.get('window').height - verticalScale(130)}} >
        <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        <Divider height-30 />
        <Text h18 blue02>An incredible investment proposal in reward <Text white>points with the best daily renovable benefits.</Text></Text>
        <Divider height-15 />
        <StepButton navigation={navigation} />
        <Divider height-15 />
        <Text h10 white>Si cuentas con <Text white bold>registro en Uulala</Text>puedes acceder con tu Número de teléfono y contraseña.</Text>
        <Divider height-25 />
        <FloatingInput
          {...email}
          label={'email'}
          keyboardType={'number-pad'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...password}
          label={'password'}
          autoCapitalize={'none'}
          secureTextEntry
        />
        <Divider height-10 />
        <Link>
          <Text h12 blue02 left>I forgot my password</Text>
        </Link>
        <Divider height-35 />
        <View flex-1 bottom>
          <ButtonRounded
            onPress={() => navigation.navigate("ReferralCode")}
            disabled={!isValid}
            size='lg'
          >
            <Text h14 semibold>
              Login
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

export default Login;