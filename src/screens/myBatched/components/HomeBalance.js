import React, { useEffect, useState } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { View, Text, Divider, ImageResize, ButtonRounded } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import blueRow from '@assets/icons/blue-row-double-down.png';
import Styles from '../styles';
import i18n from '@utils/i18n';
import { moneyFormatter, thousandsSeparator } from '../../../utils/formatters';
import { cleanErrorPoints } from '../../../store/actions/points.actions';
import { toggleSnackbarClose } from '../../../store/actions/app.actions';
import IconLineDotted from '../../../assets/iconSVG/IconLineDotted';
import { useTheme } from '@react-navigation/native';
// import IconRowBack from '../../../assets/iconSVG/IconRowBack';
import LottieView from 'lottie-react-native';
const IconRowBack = require('../../../assets/animationsLottie/LineDown.json');

const HomeBalance = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const dataUser = redux?.user;
  const points = redux?.points;
  const brandTheme = dataUser?.Theme?.colors;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts
  const [referenceN1, setReferenceN1] = useState(0);
  const [referenceN2, setReferenceN2] = useState(0);
  const [gatewayPoints, setGatewayPoints] = useState(0);
  const [liquidPoints, setLiquidPoints] = useState(0);
  const [totalLicenses, setTotalLicenses] = useState(0);
  const [rewardsPoints, setRewardsPoints] = useState(0);
  const [commissionBalance, setCommissionBalance] = useState(0);
  const RewardsData = points?.rewardsData;
  const gatewayData = points?.gatewayData;
  const liquidData = points?.liquidData;
  const { colors } = useTheme();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorPoints());
      dispatch(toggleSnackbarClose());
    });
    return unsubscribe;

  }, []);


  useEffect(() => {
    setDataPoints();
  }, [points]);


  const copyToClipboard = () => {
    Clipboard.setString(accounts?.id);
  }


  function setDataPoints() {
    dataUser?.dataUser?.bachedTransaction?.forEach(transaction => {
      if (transaction?.status === 1 || transaction?.status === 3) setTotalLicenses(totalLicenses + transaction?.routingNumber ? parseInt(transaction?.routingNumber) : transaction?.routingNumber);
    });
  }

  function handleGetLicenses() {
    navigation.navigate('SignOut', {
      screen: 'GetLicenses',
      params: { page: 'myBatched' }
    });
  }
  return (
    <View flex-1>
      <View height-100 blue03 paddingH-10 centerV>
        <View row>
          <View flex-1>
            <Text h12 blue02>{accounts?.email}</Text>
            <Divider height-5 />
            <Text h14 white semibold>{accounts?.firstName}{' '}{accounts?.middleName || accounts?.secondLastName}{' '}{accounts?.lastName}</Text>
          </View>
          <View width-38 height-36 centerH centerV style={{borderColor:colors.blue02,borderWidth:1}}>
            {accounts?.avatarImage !== '' && (
              <ImageResize
                source={{ uri: accounts?.avatarImage }}
                height={verticalScale(33)}
                width={verticalScale(33)}
                resizeMode="stretch"
              />
            )}
            {accounts?.avatarImage === '' && (
              <Text h20 semibold>{accounts?.alias}</Text>
            )}
            
          </View>
        </View>
        <Divider height-8 />
        <View row>
          {/* <View flex-1>
            <Text h12 blue02>{i18n.t('home.myBatchedBalance.textReferenceCode')}</Text>
            <Divider height-5 />
            <Text h12 semibold green>udefinode.com/cni4w7y3u</Text>
          </View> */}
          <View >
            <Text h12 blue02>{i18n.t('home.myBatchedBalance.textUulalaID')}</Text>
            <Divider height-5 />
            <Text h12 white semibold>{accounts?.id}</Text>
          </View>
        </View>
      </View>
      <Divider height-12 />
      <View flex-1 row centerH>
        <ButtonRounded
          onPress={() => copyToClipboard}
          disabled={false}
          dark
          size='sm'
        >
          <Text h10 medium blue02>
            {i18n.t('home.myBatchedBalance.buttonCopyMyReference')}
          </Text>
        </ButtonRounded>
        <Divider width-8 />
        <ButtonRounded
          disabled={false}
          onPress={handleGetLicenses}
          success
          size='sm'
        >
          <Text h10 medium white>
            {i18n.t('home.myBatchedBalance.buttonBuyLicenses')}
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-12 />
      <IconLineDotted height={verticalScale(1)} width={'100%'} fill={brandTheme?.blue04 ?? colors.blue04} />
      <Divider height-15 />
      <Text h14 white>{i18n.t('home.myBatchedBalance.textMyBalances')}</Text>
      <Divider height-15 />
      <View row>
        <View flex-1 column>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textRewardPoints')}</Text>
          <Text h16 semibold>{thousandsSeparator(RewardsData?.total)}</Text>
        </View>
        <View flex-1 column right>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textMyLicenses')}</Text>
          <Text h16 semibold>{totalLicenses}</Text>
        </View>
      </View>
      <Divider height-10 />
      <View row>
        <View flex-1 column>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textCommissionBalance')}</Text>
          <Text h16 semibold>{thousandsSeparator(points?.commissionData?.total)}</Text>
        </View>
        <View flex-1 column right>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textMyReferred')}</Text>
          <Text h16 semibold>{dataUser?.dataUser?.licensesReferences?.length}</Text>
        </View>
      </View>
      <Divider height-15 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textRewardPointsCan')}</Text>
      <Divider height-5 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textCommissionBalanceCan')}</Text>
      <Divider height-15 />
      <LottieView source={IconRowBack} autoPlay loop style={{ width: scale(20),height:verticalScale(20) }} />
      {/* <View row centerV>
        <View flex-1 style={Styles.borderDoted} />
        <Divider width-5 />
       
        <IconRowBack height={verticalScale(18)} width={scale(18)} fill={brandTheme?.blue02 ?? colors.blue02} />
        <Divider width-5 />
        <View flex-1 style={Styles.borderDoted} />
      </View> */}
      <Divider height-15 />
      <View row>
        <View flex-1 column>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textInTransactionGateway')}</Text>
          <Text h16 semibold>{thousandsSeparator(gatewayData?.total)}</Text>
        </View>
        <View flex-1 column right>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textExecutedPoints')}</Text>
          <Text h16 semibold>{thousandsSeparator(liquidData?.total)}</Text>
        </View>
      </View>
      <Divider height-10 />
      <View flex-1>
        <Text h12 blue02>{i18n.t('home.myBatchedBalance.textLiquidityPool')}</Text>
        <Text h16 semibold>{moneyFormatter(liquidPoints * 0.1)}</Text>
      </View>
      <Divider height-15 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textLiquidityPoolBalance')}</Text>
      <Divider height-20 />
      <ButtonRounded
        onPress={() => navigation.navigate('SignIn', { screen: 'TransferOption' })}
        //onPress={() => navigation.navigate("TransferOption")}
        disabled={false}
        blue
      >
        <Text h14 semibold white>
          {i18n.t('home.myBatchedBalance.buttonTransfers')}
        </Text>
      </ButtonRounded>
    </View>
  );
};

export default HomeBalance;
