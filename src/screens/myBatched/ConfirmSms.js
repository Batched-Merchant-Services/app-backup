import React, { useState, useEffect } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import {
  View,
  Text,
  Link,
  Divider,
  PinInput,
  SnackNotice,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import blueRow from '@assets/icons/blue-row-double-down.png';
import Styles from './styles';
import i18n from '@utils/i18n';
import { maskNumbers, maskEmail } from '@utils/formatters';
import { cleanErrorPoints, setCommissionBalanceToLiquidityPool, setGatewayPointsToTransactionRewards, setLiquidityPoolToUulalaWallet, setRewardsPointsToTransactionGateway } from '@store/actions/points.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorLicenses } from '@store/actions/licenses.actions';
import { cleanError, getLoginTwoFactor, validateCodeEmail, validateCodeSms } from '@store/actions/auth.actions';
import LocalStorage from '@utils/localStorage';
import Loading from '../Loading';
import { cleanErrorForgot } from '../../store/actions/forgotPassword.actions';
import { createLicense } from '../../store/actions/licenses.actions';
import IconLineDotted from '../../assets/iconSVG/IconLineDotted';
import { useTheme } from '@react-navigation/native';

const TransferOption = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const valueSelect = route?.params?.valueSelect;
  const dataUser = redux?.user;
  const amount = route?.params?.amount;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts;
  const brandTheme = dataUser?.Theme?.colors;
  const { colors } = useTheme();
  const codeSecurity = useValidatedInput('codeSms', '');
  const [valuePhone, setValuePhone] = useState(accounts?.phoneNumber);
  const [codeSmsEmail, setCodeSmsEmail] = useState(auth?.dataCode);
  const points = redux?.points;
  const auth = redux?.auth;
  const params = route?.params;
  const licensesData = redux?.licenses;
  const typeTransfer = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const [items, setItems] = useState([
    { id: '1', name: 'Rewards points to Transaction Gateway', value: 'rewards' },
    { id: '2', name: 'Gateway to Rewards point', value: 'gateway' },
    { id: '3', name: 'Commission Balance to Liquidity Pool', value: 'commission' },
    { id: '4', name: 'Liquidity Pool to Uulala Wallet', value: 'wallet' },

  ]);
  const isValid = isFormValid(codeSecurity);
  const RewardsData = points?.rewardsData;
  const error = useSelector(state => state?.points?.errorPoints);

  useEffect(() => {
    dispatch(cleanErrorLicenses());
    dispatch(toggleSnackbarClose());
    dispatch(cleanErrorForgot());
    console.log('params?.page',params?.page !== 'Login' || params?.page !== 'LoginChange')
    if(params?.page !== 'ChangePass')  dispatch(cleanError());
    if (params?.page !== 'Login') {
      if(params?.page !== 'LoginChange'){
     
      switch (auth?.type2fa) {
        case 1:
          setCodeSmsEmail('2fa')
          break;
        case 2:
          dispatch(validateCodeSms());
          break;
        case 3:
          dispatch(validateCodeEmail());
          break;
        default:
          setCodeSmsEmail('2fa')
          break;
      }
    }
  }
  }, [dispatch])



  useEffect(() => {
    if (auth?.type2fa === 1) setCodeSmsEmail('2fa')
  }, [auth?.user?.left])



  useEffect(() => {
    if (auth?.type2fa === 1) {
      setCodeSmsEmail('2fa');
    } else {
      setCodeSmsEmail(auth?.dataCode);
    }
  }, [auth?.dataCode])


  const handleCreateTransfer = (codeSecurity) => {
    const address = dataUser?.dataUser?.clients ? dataUser?.dataUser?.clients[0]?.account?.address : 0;
    if (valueSelect === 'rewards') {
      dispatch(setRewardsPointsToTransactionGateway({ address: address, amount: amount?.value, code: codeSmsEmail + '-' + codeSecurity }));
    } else if (valueSelect === 'commission') {
      dispatch(setCommissionBalanceToLiquidityPool({ address: address, amount: amount?.value, code: codeSmsEmail + '-' + codeSecurity }));
    } else if (valueSelect === 'wallet') {
      dispatch(setLiquidityPoolToUulalaWallet({ address: address, amount: amount?.value, code: codeSmsEmail + '-' + codeSecurity }));
    } else if (valueSelect === 'gateway') {
      dispatch(setGatewayPointsToTransactionRewards({ address: address, amount: amount?.value, code: codeSmsEmail + '-' + codeSecurity }));
    } else return null;
  };

  const handleGetLoginTwoFactor = async (code) => {
    const codeLeft = await LocalStorage.get('left');
    const codeSecurity = auth?.type2fa !== 1 ? codeLeft + '-' + code: '2fa' + '-' + code;
    dispatch(getLoginTwoFactor({ codeSecurity }));
  }

  function handleBuyLicenses(code) {
    const data = params?.data
    const createLicenses = {
      ...data,
      code: codeSmsEmail + '-' + code
    }
    dispatch(createLicense({ createLicenses }));
  }

  function getInfo(code) {
    if (params?.page === 'Login') {
      handleGetLoginTwoFactor(code);
    } else if(params?.page === 'ChangePass'  || params?.page === 'LoginChange') {
      navigation.push('NewPassword', { code: code, page: params?.page });
    }else if (params?.page === 'BuyLicenses') {
      handleBuyLicenses(code);
    }
    else{
      handleCreateTransfer(code);
    }
  }
  
  function onPressResendCode() {
    switch (auth?.type2fa) {
      case 1:
        setCodeSmsEmail('2fa');
        break;
      case 2:
        dispatch(validateCodeSms());
        break;
      case 3:
        dispatch(validateCodeEmail());
        break;
      default:
        setCodeSmsEmail('2fa');
        break;
    }
  }

  useEffect(() => {
    if (auth?.isSessionTwoFactors) {
      console.log('dataUser?.dataUser?.bachedTransaction?.length',dataUser)
      if(dataUser?.successDataUser){
        if (dataUser?.dataUser?.bachedTransaction?.length > 0) {
         navigation.navigate('Dashboard');
        } else {
         navigation.navigate('GetLicenses');
        }
      }
    }
  }, [auth?.isSessionTwoFactors,dataUser])



  if (points?.successTransferGatewayLiquid) {
    navigation.push('ConfirmationTransfer', { amount: amount?.value,data: params?.data});
  }

  function handleGoToBack() {
    if ( params?.page === 'ChangePass') {
      navigation.push('ChangePasswordInside');
    }else{
      goBack(null);
    }
  }

  if (licensesData?.successCreateLicense) {
    navigation.push("ConfirmationLicenses")
  }
  console.log('points?.isLoadingRewardsPoints || auth?.isSessionTwoFactors',auth?.type2fa)
  return (
    <BackgroundWrapper showNavigation={true}  childrenLeft  onPressLeft={()=> goBack(null)}>
      <Divider height-20 />
      <Text h16 blue02 regular>{i18n.t('Auth2fa.textTwoFactorAuthentication')}</Text>
      <Divider height-30 />
      {auth?.type2fa === 2 &&(
        <Text h15 blue02>{i18n.t('home.myBatchedTransfer.textWeHaveSentYou')}{' '}<Text h12 white>{maskNumbers(accounts?.phoneNumber || params?.phone)}</Text></Text>
      )}
      {auth?.type2fa === 3 &&(
        <Text h15 blue02>{i18n.t('home.myBatchedTransfer.textWeHaveSentEmail')}{' '}<Text h12 white>{maskEmail(accounts?.email || params?.email)}</Text></Text>
      )}
      {auth?.type2fa === 1 &&(
        <Text h15 blue02>{i18n.t('home.myBatchedTransfer.textWeHaveSentApp')}{' '}<Text white semibold>{i18n.t('home.myBatchedTransfer.textAuthenticatorApp')}</Text></Text>
      )}
      <Divider height-30 />
      <Text h12 blue02>{i18n.t('home.myBatchedTransfer.textConfirmationCode')}</Text>
      <Divider height-10 />
      <PinInput {...codeSecurity} onSubmit={(code) => getInfo(code)}/>
      <Divider height-25 />
      <IconLineDotted height={verticalScale(1)} width={'100%'} fill={brandTheme?.blue04 ?? colors.blue04} />
      <Divider height-25 />
      <Text h12 white>{i18n.t('home.myBatchedTransfer.textTheCodeWillBeValid')}{' '}
        <Link onPress={onPressResendCode} style={{paddingTop:verticalScale(10)}}>
          <Text h12 white>{i18n.t('home.myBatchedTransfer.linkResendCode')}</Text>
        </Link></Text>
      <Divider height-30 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={handleGoToBack}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('General.buttonBack')}
          </Text>
        </ButtonRounded>
        <Loading modalVisible={auth?.isLoggingIn} />
        <SnackNotice
          visible={error}
          message={points?.error?.message}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default TransferOption;
