import React, { useState } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import {
  View,
  Text,
  Divider,
  ImageResize,
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

const TransferOption = ({ navigation, step, onPress, label }) => {
  const redux = useSelector(state => state);
  const [showPointAvailable, setShowPointAvailable] = useState(true);
  const amount = useValidatedInput('amount', '');
  const points = redux?.points;
  const typeTransfer = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const [items, setItems] = useState([
    { id: '1', name: 'Transfer from Gateway to Rewards', value: 'q1' },
    { id: '2', name: 'Transfer rewards to Gateway', value: 'q2' },
    { id: '3', name: 'Transfer commission amount to liquid', value: 'q3' },
  ]);
  const isValid = isFormValid(typeTransfer, amount);
  const RewardsData = points?.rewardsData;

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
      //onFill={(code)=> filterPays(code)}
      />
       <Divider height-10 />
       {showPointAvailable&&(
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
        <View  flex-1 style={Styles.borderDoted} />
        <Divider width-5 />
        <ImageResize
          source={blueRow}
          height={verticalScale(16)}
          width={scale(16)}
        />
        <Divider width-5 />
        <View  flex-1 style={Styles.borderDoted} />
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
        onPress={() => {
          navigation.navigate('SignOut',{
            screen: 'PinConfirmation',
            params: { page: 'transferOption' }
          });
        }}
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
    </BackgroundWrapper>
  );
};

export default TransferOption;
