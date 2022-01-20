import React, { useState,useEffect } from 'react';
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
import { maskNumbers, thousandsSeparator } from '../../utils/formatters';
import { cleanErrorPoints, setCommissionBalanceToLiquidityPool, setGatewayPointsToTransactionRewards, setLiquidityPoolToUulalaWallet, setRewardsPointsToTransactionGateway } from '../../store/actions/points.actions';
import Loading from '../Loading';
import { toggleSnackbarClose } from '../../store/actions/app.actions';
import { validateCodeEmail, validateCodeSms } from '../../store/actions/auth.actions';

const TransferOption = ({ navigation, route, onPress, label }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const valueSelect = route?.params?.valueSelect;
  const dataUser = redux?.user;
  const amount = route?.params?.amount;
  const userProfile = dataUser?.dataUser?.usersProfile ?dataUser?.dataUser?.usersProfile[0]:''
  const accounts = userProfile?.accounts
  const codeSecurity = useValidatedInput('codeSms', '');
  const [valuePhone, setValuePhone] = useState(accounts?.phoneNumber);
  const [codeSmsEmail, setCodeSmsEmail] = useState(auth?.dataCode);
  const points = redux?.points;
  const auth = redux?.auth;
  const infoUser = redux?.user;
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
    dispatch(cleanErrorPoints());
    dispatch(toggleSnackbarClose());
    dispatch(validateCodeSms());
  }, [])

  useEffect(() => {
    setCodeSmsEmail(auth?.dataCode)
  }, [auth?.dataCode])


  const handleCreateTransfer = (codeSecurity) => {
    const address = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.address : 0;
    if (valueSelect === 'rewards') {
      dispatch(setRewardsPointsToTransactionGateway({ address: address, amount: amount?.value,code: codeSmsEmail+'-'+codeSecurity}));
    } else if (valueSelect === 'commission') {
      dispatch(setCommissionBalanceToLiquidityPool({ address: address, amount: amount?.value,code: codeSmsEmail+'-'+codeSecurity }));
    } else if (valueSelect === 'wallet') {
      dispatch(setLiquidityPoolToUulalaWallet({ address: address, amount: amount?.value,code: codeSmsEmail+'-'+codeSecurity }));
    }else if (valueSelect === 'gateway') {
      dispatch(setGatewayPointsToTransactionRewards({ address: address, amount: amount?.value,code: codeSmsEmail+'-'+codeSecurity }));
    } else return null;
  };

  function getInfo(code) {
    handleCreateTransfer(code); 
  }
  function onPressResendCode() {
    dispatch(validateCodeEmail());
    setValuePhone(accounts?.email);
  }
  

  if (points?.successTransferGatewayLiquid) {
    navigation.navigate('ConfirmationTransfer',{ amount: amount?.value});
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Text h16 blue02 regular>{i18n.t('home.myBatchedTransfer.textConfirmTheTransfer')}</Text>
      <Divider height-10 />
      <Text h14 blue02>{i18n.t('home.myBatchedTransfer.textRewardPoints')}</Text>
        <Text h16 white semibold>{thousandsSeparator(RewardsData?.total)}</Text>
      <Divider height-10 />
      <Text h16 blue02>{i18n.t('home.myBatchedTransfer.textWeHaveSentYou')}<Text h12 white>{maskNumbers(valuePhone)}</Text></Text>
      <Divider height-20 />
      <Text h12 blue02>{i18n.t('home.myBatchedTransfer.textConfirmationCode')}</Text>
      <Divider height-10 />
      <PinInput {...codeSecurity} onSubmit={(code)=>getInfo(code) }/>
      {/* <FloatingInput
        {...codeSecurity}
        label={i18n.t('ForgotPassword.inputSixDigits')}
        autoCapitalize={'none'}
      /> */}
      <Divider height-25 />
      <Divider style={Styles.borderDoted} />
      <Divider height-25 />
      <Text h12 white>{i18n.t('home.myBatchedTransfer.textTheCodeWillBeValid')}{' '}
      <Link onPress={onPressResendCode}>
        <Text h12 white>{i18n.t('home.myBatchedTransfer.linkResendCode')}</Text>
      </Link></Text>
      <Divider height-30 />
      <ButtonRounded
        onPress={handleCreateTransfer}
        disabled={!isValid}
      >
        <Text h14 semibold white>
          {i18n.t('home.myBatchedTransfer.buttonConfirmTransfer')}
        </Text>
      </ButtonRounded>
      <Divider height-20 />
      <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue. </Text>
      <Divider height-10 />
      <Text h10 blue01 light>{i18n.t('General.textAllRightsReserved')} Batched.com</Text>
      <Loading modalVisible={points?.isLoadingRewardsPoints} />
      <View flex-1 bottom>
        <SnackNotice
          visible={error}
          message={points?.error?.message}
          timeout={3000}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default TransferOption;
