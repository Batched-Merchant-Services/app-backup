import React, { useState, useEffect } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import {
  View,
  Text,
  Divider,
  ImageResize,
  SnackNotice,
  ButtonRounded,
  FloatingInput,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import blueRow from '@assets/icons/blue-row-double-down.png';
import { thousandsSeparator } from '../../utils/formatters';
import { cleanErrorPoints } from '../../store/actions/points.actions';
import Loading from '../Loading';
import { toggleSnackbarClose } from '../../store/actions/app.actions';
import i18n from '@utils/i18n';
import LottieView from 'lottie-react-native';
const IconRowBack = require('@assets/animationsLottie/LineDown.json');


const TransferOption = ({ navigation, step, onPress, label }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const [showPointAvailable, setShowPointAvailable] = useState(true);
  const [valueSelect, setValueSelect] = useState('');
  const [dataSelect, setDataSelect] = useState('');
  const [nameSelect, setNameSelect] = useState('Rewards Points');
  const [Balance, setBalance] = useState('');
  const amount = useValidatedInput('amount', '');
  const codeSecurity = useValidatedInput('code', '');
  const infoUser = redux?.user;
  const authData = redux?.auth;
  const userProfile = infoUser?.dataUser;
  const points = redux?.points;
  const RewardsData = points?.rewardsData;
  const gatewayData = points?.gatewayData;
  const liquidData = points?.liquidData;
  const typeTransfer = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const [items, setItems] = useState([
    { id: '1', name: 'Reward points can be transfered to Transaction Gateway', value: 'rewards' },
    { id: '2', name: 'Gateway to Rewards point', value: 'gateway' },
    { id: '3', name: 'Commission balance can be transfered to Liquidity Pool Balance', value: 'commission' },
    { id: '4', name: 'Liquidity pool Balance can be transfered to Uulala Wallet', value: 'wallet' },
  ]);
  const isValid = isFormValid(amount);
  const error = useSelector(state => state?.points?.errorPoints);

  useEffect(() => {
    dispatch(toggleSnackbarClose());
    setBalance(RewardsData?.total);
  }, []);

  const selectTypeTransfer = (code) => {
    const value = code?.value;
    if (value === 'wallet')  setNameSelect('Liquidity pool' + ' ' +'Points');
    else setNameSelect(code?.value + ' ' +'Points Available*');
    setDataSelect(code)
    setValueSelect(value);
    getBalanceValue(code);
  }

  function getBalanceValue(value) {
    switch (value?.value) {
      case 'rewards':
        return setBalance(RewardsData?.total);
      case 'gateway':
        return setBalance(gatewayData?.total);
      case 'commission':
        return setBalance(points?.commissionData?.total);
      case 'wallet':
        return setBalance(liquidData?.total *0.1);

      default:
        return setBalance(0);
    }
  }


  function handleGoToSms() {
    if (authData?.type2fa === 0) {
      navigation.navigate('Auth2fa');
    } else {
      navigation.push('ConfirmSms', { amount: amount, valueSelect: valueSelect, data: dataSelect });
    }

  }


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Text h16 blue02 regular>{i18n.t('home.myBatchedTransfer.textTransferOptions')}</Text>
      <Divider height-10 />
      <Text h12 white>{i18n.t('home.myBatchedTransfer.textSelectTheKind')}</Text>
      <DropDownPicker
        {...typeTransfer}
        label={i18n.t('home.myBatchedTransfer.dropDownTransfers')}
        options={items}
        onSelect={(code) => selectTypeTransfer(code)}
      />
      <Divider height-10 />
      {showPointAvailable && (
        <View>
          <Text h12 blue02>{nameSelect?nameSelect.toLocaleUpperCase():nameSelect}</Text>
          <Text h16 white semibold>{thousandsSeparator(Balance)}</Text>
          <Divider height-20 />
        </View>
      )}
      <Text h10 white>{i18n.t('home.myBatchedBalance.textRewardPointsCan')}</Text>
      <Divider height-5 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textCommissionBalanceCan')}</Text>
      <Divider height-5 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textLiquidityPoolBalance')}</Text>
      <Divider height-15 />
      <LottieView source={IconRowBack} autoPlay loop style={{ width: scale(20), height: verticalScale(20) }} />
      {/* <View row centerV>
        <View flex-1 style={Styles.borderDoted} />
        <Divider width-5 />
        <ImageResize
          source={blueRow}
          height={verticalScale(16)}
          width={scale(16)}
        />
        <Divider width-5 />
        <View flex-1 style={Styles.borderDoted} />
      </View> */}
      <Divider height-10 />
      <Text h12 white>{i18n.t('home.myBatchedTransfer.textSelectTheAmount')}</Text>
      <Divider height-10 />
      <FloatingInput
        {...amount}
        label={i18n.t('home.myBatchedTransfer.inputAmountToTransfer')}
        autoCapitalize={'none'}
      />

      <Loading modalVisible={points?.isLoadingRewardsPoints} />
      <View flex-1 bottom>
      <ButtonRounded
        onPress={handleGoToSms}
        disabled={!(isValid && valueSelect !== '')}
      >
        <Text h14 semibold white>
          {i18n.t('General.buttonSend')}
        </Text>
      </ButtonRounded>
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
