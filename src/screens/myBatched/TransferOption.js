import React, { useState,useEffect } from 'react';
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
import Styles from './styles';
import i18n from '@utils/i18n';
import { thousandsSeparator } from '../../utils/formatters';
import { cleanErrorPoints, setCommissionBalanceToLiquidityPool, setGatewayPointsToTransactionRewards, setLiquidityPoolToUulalaWallet, setRewardsPointsToTransactionGateway } from '../../store/actions/points.actions';
import Loading from '../Loading';
import { toggleSnackbarClose } from '../../store/actions/app.actions';
import { validateCodeSms } from '../../store/actions/auth.actions';

const TransferOption = ({ navigation, step, onPress, label }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const [showPointAvailable, setShowPointAvailable] = useState(true);
  const [valueSelect, setValueSelect] = useState('');
  const amount = useValidatedInput('amount', '');
  const codeSecurity = useValidatedInput('code', '');
  const points = redux?.points;
  const infoUser = redux?.user;
  const userProfile = infoUser?.dataUser;
  const typeTransfer = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const [items, setItems] = useState([
    { id: '1', name: 'Rewards points to Transaction Gateway', value: 'rewards' },
    { id: '2', name: 'Gateway to Rewards point', value: 'gateway' },
    { id: '3', name: 'Commission Balance to Liquidity Pool', value: 'commission' },
    { id: '4', name: 'Liquidity Pool to Uulala Wallet', value: 'wallet' },
  ]);

  const isValid = isFormValid(amount);
  const RewardsData = points?.rewardsData;
  const error = useSelector(state => state?.points?.errorPoints);

  useEffect(() => {
    dispatch(cleanErrorPoints());
    dispatch(toggleSnackbarClose());
    //dispatch(validateCodeSms())
  }, []);

  const selectTypeTransfer = (code) => {
    const value = code?.value;
    setValueSelect(value);
  }

  // const handleCreateTransfer = () => {
  //   const address = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.address : 0;
  //   if (valueSelect === 'rewards') {
  //     dispatch(setRewardsPointsToTransactionGateway({ address: address, amount: amount?.value,code: auth?.dataCode}));
  //   } else if (valueSelect === 'commission') {
  //     dispatch(setCommissionBalanceToLiquidityPool({ address: address, amount: amount?.value,code: auth?.dataCode }));
  //   } else if (valueSelect === 'wallet') {
  //     dispatch(setLiquidityPoolToUulalaWallet({ address: address, amount: amount?.value,code: auth?.dataCode }));
  //   }else if (valueSelect === 'gateway') {
  //     dispatch(setGatewayPointsToTransactionRewards({ address: address, amount: amount?.value,code: auth?.dataCode }));
  //   } else return null;
  // };

  console.log('infoUser',userProfile)

  function handleGoToSms(){
    if (!userProfile.isTwoFactor) {
      navigation.navigate('Auth2fa');
    }
    //navigation.navigate('ConfirmSms',{ amount: amount,valueSelect:valueSelect});
  }
  

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft navigation={navigation}>
      <Text h16 blue02 regular>{i18n.t('home.myBatchedTransfer.textTransferOptions')}</Text>
      <Divider height-10 />
      <Text h12 white>{i18n.t('home.myBatchedTransfer.textSelectTheKind')}</Text>
      <Divider height-10 />
      <DropDownPicker
        {...typeTransfer}
        label={i18n.t('home.myBatchedTransfer.dropDownTransfers')}
        options={items}
        onSelect={(code) => selectTypeTransfer(code)}
      />
      <Divider height-10 />
      {showPointAvailable && (
        <View>
          <Text h12 blue02>{i18n.t('home.myBatchedTransfer.textRewardPoints')}</Text>
          <Text h16 white semibold>{thousandsSeparator(RewardsData?.total)}</Text>
          <Divider height-20 />
        </View>
      )}

      <Text h10 white>{i18n.t('home.myBatchedBalance.textCommissionBalanceCan')}</Text>
      <Divider height-5 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textLiquidityPoolBalance')}</Text>
      <Divider height-15 />
      <View row centerV>
        <View flex-1 style={Styles.borderDoted} />
        <Divider width-5 />
        <ImageResize
          source={blueRow}
          height={verticalScale(16)}
          width={scale(16)}
        />
        <Divider width-5 />
        <View flex-1 style={Styles.borderDoted} />
      </View>
      <Divider height-10 />
      <Text h12 white>{i18n.t('home.myBatchedTransfer.textSelectTheAmount')}</Text>
      <Divider height-10 />
      <FloatingInput
        {...amount}
        label={i18n.t('home.myBatchedTransfer.inputAmountToTransfer')}
        autoCapitalize={'none'}
      />
        <Divider height-15 />
      <ButtonRounded
        onPress={handleGoToSms}
        disabled={!(isValid && valueSelect !== '')}
      >
        <Text h14 semibold white>
         send
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
