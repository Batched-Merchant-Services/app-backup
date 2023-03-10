import React, { useState, useEffect,useRef } from 'react';
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
import { cleanDataUser, getDataUser } from '../../store/actions/user.action';
import { saveStateModal2fa, userInactivity } from '../../store/actions/app.actions';
import ModalInfo2fa from '../ModalInfo2fa';
import { cleanErrorPoints } from '../../store/actions/points.actions';


const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const [values, setValues] = useState(false);
  const authData = redux?.auth;
  const app = redux?.app;
  const dataUser = redux?.user;
  const email = useValidatedInput('','');
  const password = useValidatedInput('password', '');
  const isValid = isFormValid(email, password);
  const error = useSelector(state => state?.auth?.showError);
  const [showModalInfo, setShowModalInfo] = useState(false);
 

  useEffect(() => {
    dispatch(cleanError());
    dispatch(cleanErrorPoints());
    dispatch(toggleSnackbarClose());
    dispatch(cleanDataUser());
    dispatch(userInactivity(false));
    setValues(true);
  }, [dispatch]);

  useEffect(() => {
    setValues(false);
  }, [email?.value]);



  function fetchSession() {
    //setValues(true)
    dispatch(getLogin({ email, password }));
  }

  useEffect(() => { 
    if (authData?.isSession) {
      if (!authData?.user?.isTwoFactor || authData?.user?.type2fa === 0) {
        if (app?.stateModalInfo2fa ) {
          if(dataUser?.successDataUser){
            if (dataUser?.dataUser?.bachedTransaction?.length > 0) {
             navigation.navigate('Dashboard');
            } else {
             navigation.navigate('GetLicenses');
            }
          }
          setShowModalInfo(false);
        } else {
          setShowModalInfo(true);
        }
       
      } else {
        navigation.push('ConfirmSms', { page: 'Login' });
        setShowModalInfo(false);
      }
    }
  }, [authData?.isSession,app?.stateModalInfo2fa,dataUser]);



  // if (authData?.isSession) {
  //   if (!authData?.user?.isTwoFactor) {
  //     navigation.navigate('Auth2fa');
  //   } else {
  //     navigation.navigate('ConfirmSms', { page: 'Login' });
  //   }
  // }


  const handleClose = () => {
    setShowModalInfo(!showModalInfo);
  };


  return (
    <BackgroundWrapper showNavigation={false} navigation={navigation}>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-30 />
      <Text h24 blue02>{i18n.t('Login.textAnIncredible')}{' '}<Text white>{i18n.t('Login.textInRewardPoints')}</Text></Text>
      <Divider height-20 />
      <Text h12 white>Earn reward points that will give you daily renewable benefits.</Text>
      <Divider height-20 />
      <StepButton navigation={navigation} />
      <Divider height-25 />
      <FloatingInput
        {...email}
        value={values?'':email?.value}
        label={i18n.t('Login.inputEmail')}
        keyboardType={'default'}
        autoCapitalize={'none'}
      />
      <Divider height-5 />
      <FloatingInput
        {...password}
        value={values?'':password?.value}
        label={i18n.t('Login.inputPassword')}
        autoCapitalize={'none'}
        secureTextEntry
        navigation={navigation}
      />
      <Divider height-10 />
      <View left>
        <Link onPress={() => navigation.push("EmailConfirm")}>
          <Text h12 blue02 left>{i18n.t('Login.linkIForgotMyPassword')}</Text>
        </Link>
      </View>

      <Divider height-35 />
      <View flex-1 bottom>
      <Divider height-10 />
      <Text h10 white>{i18n.t('Login.textIfYouHave')}{' '}<Text white bold>{i18n.t('Login.textUulalaRegistration')}{' '}</Text>{i18n.t('Login.textYouCanAccess')}</Text>
      <Divider height-20 />
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
      <Loading modalVisible={authData?.isLoggingIn} />
      <ModalInfo2fa visible={showModalInfo}
        onRequestClose={() => { setShowModalInfo(false)}}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </BackgroundWrapper>
  );
}

Login.propTypes = {
  isLoggingIn: PropTypes.bool,
};


export default Login;