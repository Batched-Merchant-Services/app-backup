import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import rectangleConfirm from '@assets/icons/rectangleConfirm.png';
import confirmationCheck from '@assets/icons/confirmationCheckRectangle.png';
import Styles from './styles'
import i18n from '@utils/i18n';
import { formatDate, moneyFormatter } from '../../utils/formatters';
import { cleanError } from '@store/actions/auth.actions';
import { cleanErrorPoints } from '@store/actions/points.actions';
import LottieView from 'lottie-react-native';

const ConfirmationTransfer = ({ navigation, navigation: { goBack },route }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const points = redux?.points;
  const params = route?.params;
  const transferData = points?.transferData;
  const [setName, setSetName] = useState('');
  const NewDate = new Date();
  
  useEffect(() => {
    dispatch(cleanError());
    handleStateChange();
  }, [dispatch])

  function handleGoToHomeBatched() {
    navigation.navigate('Dashboard');
    dispatch(cleanErrorPoints());
  }

  function handleStateChange() {
    const sub = params?.data?.value
    switch (sub) {
      case 'rewards':
        return setSetName('Reward points to Transaction Gateway');
      case 'gateway':
        return setSetName('Gateway to Rewards point');
      case 'commission':
        return setSetName('Commission balance to Liquidity Pool Balance');
      case 'wallet':
        return setSetName('Liquidity pool Balance to Uulala Wallet');

      default:
        return setSetName('Transaction');
    }
  }

  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation}>
      <Divider height-20 />
      <View centerH >
        <LottieView source={require('../../assets/animationsLottie/IconCheck.json')} autoPlay loop style={{ width: scale(120),height:verticalScale(120) }} />
      </View>
      <Divider height-30 />
      <Text h18 regular blue02>{i18n.t('home.myBatchedTransfer.confirmation.textMovementConfirmed')}</Text>
      <Divider height-20 />
      <View blue01 width-36 height-1 />
      <Divider height-25 />
      <Text h12 white >{setName}</Text>
      <Text h16 green semibold>{moneyFormatter(params?.amount)}</Text>
      <Divider height-15 />
      <Text h12 white light>{i18n.t('home.myBatchedTransfer.confirmation.textDate')}</Text>
      <Text h16 white semibold>{formatDate(NewDate)}</Text>
      <Divider height-15 />
      <Text h12 white light>{i18n.t('home.myBatchedTransfer.confirmation.textTransactionID')}</Text>
      <Text h16 white semibold>{transferData?.id}</Text>
      <View flex-1 bottom>
        <ButtonRounded
          onPress={handleGoToHomeBatched}
          disabled={false}
          blue
        >
          <Text h14 semibold white>
            {i18n.t('home.myBatchedTransfer.confirmation.buttonBackToMyBatched')}
          </Text>
        </ButtonRounded>
        <Divider height-40 />
      </View>
    </BackgroundWrapper>
  );
}

export default ConfirmationTransfer;