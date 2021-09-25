import React, { useEffect,useState } from 'react';
import { useColorScheme,TouchableOpacity } from 'react-native';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale,verticalScale } from 'react-native-size-matters';
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
import Styles from './styles'
import Logo from '@assets/brandBatched/logo.svg';
import StepButton from '../signUp/components/StepsButton';
const Login = ({ navigation }) => {
  const [loginButtonActive, setLoginButtonActive] = useState(false);
  const [registerButtonActive, setRegisterButtonActive] = useState(false);
  const email = useValidatedInput('email', '');
  const password = useValidatedInput('password', '');

  const isDarkMode = useColorScheme() === 'dark';

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
  function handleLoginActiveButton() {
    setLoginButtonActive(true)
    setRegisterButtonActive(false)
  }
  function handleRegisterActiveButton() {
    navigation.navigate("Register")
    setLoginButtonActive(false)
    setRegisterButtonActive(true)
  }
 


  return (
    <BackgroundWrapper>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        <Divider height-30/>
        <Text h18 blue02>An incredible investment proposal in reward <Text white>points with the best daily renovable benefits.</Text></Text>
        <Divider height-15/>
        <StepButton navigation={navigation}/>
        <Divider height-15/>
        <Text h10 white>Si cuentas con <Text white bold>registro en Uulala</Text>puedes acceder con tu Número de teléfono y contraseña.</Text>
        <Divider height-25/>
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
        <Divider height-10/>
        <Link>
          <Text h12 blue02 left>I forgot my password</Text>
        </Link>
        <Divider height-35/>
          <ButtonRounded
              onPress={() => navigation.navigate("Dashboard")}
              disabled={false}
              size='lg'
            >
              <Text h14 semibold>
                Login
              </Text>
          </ButtonRounded>
          <Divider height-15/>
          <View flex-1 row bottom>
            <Link>
              <Text h12 white>Terms and Conditionsd</Text>
            </Link>
            <Divider width-10/>
            <Link>
              <Text h12 white>Privacy Policy</Text>
            </Link>
          </View>
          <Divider height-15/>
    </BackgroundWrapper>


  );
}

export default Login;