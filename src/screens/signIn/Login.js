import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  SnackBar,
  SnackNotice,
  ImageResize,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { getLogin, cleanError } from '@store/actions/auth.actions';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '@assets/brandBatched/logo.svg';
import StepButton from '../signUp/components/StepsButton';
import i18n from '@utils/i18n';
import Loading from '../Loading';
import Colors from '@styles/Colors';
import close from '@assets/icons/white-x.png';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { getDataUser } from '../../store/actions/user.action';
import { userInactivity } from '../../store/actions/app.actions';
  
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const [values, setValues] = useState(false);
  const authData = redux?.auth;
  const email = useValidatedInput('', '');
  const password = useValidatedInput('password', '');
  const isValid = isFormValid(email, password);
  const error = useSelector(state => state?.auth?.showError);


  useEffect(() => {
    console.log('ya esta en login')
    dispatch(cleanError());
    dispatch(toggleSnackbarClose());
  }, [dispatch]);


  function fetchSession() {
    //setValues(true)
   dispatch(getLogin({ email, password }));
  }

  function handleClose(){
    setValues(false)
  }

  if (authData?.isSession) {
    navigation.navigate('DrawerScreen',{
      screen: 'Dashboard'
    });
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
      <View left>
        <Link onPress={() => navigation.navigate("EmailConfirm")}>
          <Text h12 blue02 left>{i18n.t('Login.linkIForgotMyPassword')}</Text>
        </Link>
      </View>

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
      
      <SnackNotice
        visible={error}
        message={authData?.error?.message}
        timeout={3000}
      />
       {/* <SnackBar
        visible={values}
        warning
        handleClose={handleClose}
        message={'sip'}
      /> */}
      <Loading  modalVisible={authData?.isLoggingIn}/>
    </BackgroundWrapper>
  );
}

Login.propTypes = {
  isLoggingIn: PropTypes.bool,
};


export default Login;