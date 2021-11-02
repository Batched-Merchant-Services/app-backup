import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import SnackBar from 'rn-snackbar-component';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  ImageResize,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { getLogin, resetAuth } from '@store/actions/auth';
import { useQuery } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '@utils/api/queries/auth';
import { FETCH_COIN_LIST } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import StepButton from '../signUp/components/StepsButton';
import i18n from '@utils/i18n';
import Loading from '../Loading';
import Colors from '@styles/Colors';
import close from '@assets/icons/white-x.png';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const authData = redux?.auth;
  const email = useValidatedInput('', '');
  const password = useValidatedInput('password', '');
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const isValid = isFormValid(email, password);


  async function fetchSession() {
    dispatch(getLogin({ email, password }));
  }

  function handleClose(){
    setSnackIsVisible(false)
  }
  if (authData?.isLoggingIn) {
    return <Loading/>;
  }

  return (
    <BackgroundWrapper showNavigation={false} navigation={navigation}>
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
        keyboardType={'default'}
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
          onPress={fetchSession}
          disabled={!isValid}
        >
          <Text h14 semibold>
            {i18n.t('Login.buttonLogin')}
          </Text>
        </ButtonRounded>
      </View>
      <SnackBar 
      visible={snackIsVisible} 
      actionHandler={handleClose}
      containerStyle={{backgroundColor:Colors.error}}
      message="Hello There!"
      autoHidingTime={6000} 
      action={(
        <View flex-1 centerV paddingR-10>
        <ImageResize
          source={close}
          height={verticalScale(10)}
          width={scale(10)}
        />
      </View>
      )} />
    </BackgroundWrapper>
  );
}

Login.propTypes = {
  isLoggingIn: PropTypes.bool,
};


export default Login;