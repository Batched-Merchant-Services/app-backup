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
import i18n from '@utils/i18n';

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
        <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        <Divider height-30 />
        <Text h18 blue02>{i18n.t('Login.textAnIncredible')}{' '}<Text white>{i18n.t('Login.textInRewardPoints')}</Text></Text>
        <Divider height-15 />
        <StepButton navigation={navigation} />
        <Divider height-15 />
        <Text h10 white>{i18n.t('Login.textIfYouHave')}{' '}<Text white bold>{i18n.t('Login.textUulalaRegistration')}{' '}</Text>{i18n.t('Login.textYouCanAccess')}</Text>
        <Divider height-25 />
        <FloatingInput
          {...email}
          label={i18n.t('Login.inputEmail')}
          keyboardType={'number-pad'}
          autoCapitalize={'none'}
        />
        <Divider height-5 />
        <FloatingInput
          {...password}
          label={i18n.t('Login.inputPassword')}
          autoCapitalize={'none'}
          secureTextEntry
        />
        <Divider height-10 />
        <Link onPress={() => navigation.navigate("EmailConfirm")}>
          <Text h12 blue02 left>{i18n.t('Login.linkIForgotMyPassword')}</Text>
        </Link>
        <Divider height-35 />
        <View flex-1 bottom>
          <ButtonRounded
            onPress={() => navigation.navigate("ReferralCode")}
            disabled={!isValid}
            size='lg'
          >
            <Text h14 semibold>
              {i18n.t('Login.buttonLogin')}
            </Text>
          </ButtonRounded>
        </View>
    </BackgroundWrapper>
  );
}

export default Login;