import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './styles';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import Loading from '../Loading';
//actions
import { toggleSnackbarClose, changeStatusTimers } from '@store/actions/app.actions';
import { getTotalLicensesInNetwork } from '@store/actions/licenses.actions';
import { getValidateRewardsByUser, getRewardsConfig } from '@store/actions/rewards.actions';
import { thousandsSeparator } from '@utils/formatters';
import { verticalScale } from 'react-native-size-matters';
import CountDownDateGreen from './components/CountDownDateGreen';
import CountDownSeconds from './components/CountDownSeconds';
import CountDownDates from './components/CountDownDates';
import { cleanErrorPoints, getCommissionPoints, getGatewayPointsBalance, getLiquidPointsBalance, getRewardsPoints } from '@store/actions/points.actions';
import { getLocalDateFromUTC } from '@utils/formatters';
import { cleanError } from '@store/actions/auth.actions';
import IconLineVertical from '../../assets/iconSVG/IconLineVertical';
import { useTheme } from '@react-navigation/native';
const MenuWallet = require('../../assets/animationsLottie/MenuWallet.json');
import { useWindowDimensions } from 'react-native';

//import moment from 'moment';


const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const infoUser = redux?.user;
  const appResources = redux?.app;
  const rewardsData = redux?.rewards;
  const brandTheme = infoUser?.Theme?.colors;
  const [statusAvailable, setStatusAvailable] = useState(false);
  const [statusStayOnline, setStatusStayOnline] = useState(false);
  const [totalLicenses, setTotalLicenses] = useState(0);
  const [statusFinish, setsStatusFinish] = useState(false);
  const [inRange, setInRange] = useState(false);
  const [rewardsPerUser, setRewardsPerUser] = useState(0);
  const error = useSelector(state => state?.licenses?.showErrorLicenses);
  const currentDate = new Date();
  const { height, width } = useWindowDimensions();
  const { colors } = useTheme();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanError());
      dispatch(toggleSnackbarClose());
      dispatch(getTotalLicensesInNetwork());
      dispatch(getValidateRewardsByUser());
      dispatch(getRewardsConfig());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getBatchedTransaction();
  }, [infoUser?.successDataUser]);


  function getBatchedTransaction() {
    const startDate = rewardsData?.configRewards?.startDate ? getLocalDateFromUTC(rewardsData?.configRewards?.startDate) : 0;
    const endDate = rewardsData?.configRewards?.endDate ? getLocalDateFromUTC(rewardsData?.configRewards?.endDate) : 0;
    infoUser?.dataUser?.bachedTransaction?.forEach(transaction => {
      if (transaction.status === 1 || transaction.status === 3) setTotalLicenses(totalLicenses + transaction.routingNumber ? parseInt(transaction.routingNumber) : transaction.routingNumber);
    });
    const id = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.id : 0;
    dispatch(getRewardsPoints({ id }));
    if (totalLicenses !== 0) setRewardsPerUser(rewardsData?.configRewards?.amount) / totalLicenses;
    if (currentDate <= endDate) setInRange(currentDate <= endDate)
    if (currentDate >= startDate) setInRange(currentDate >= startDate)
    setStatusAvailable(rewardsData?.inProcess);

  }


  function handleNavigationWallet() {
    navigation.navigate("HomeMyBatchedB")
  }

  function handleStateChange(value) {
    switch (value) {
      case 'blueDark':
        return dispatch(changeStatusTimers(0, 'blueDark'));
      case 'blueLight':
        return dispatch(changeStatusTimers(1, 'blueLight'));
      default:
        return dispatch(changeStatusTimers(0, 'blueDark'));
    }
  }


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft childrenRight={MenuWallet} menu onPressRight={handleNavigationWallet} navigation={navigation}>
      <Divider height-5 />
      {appResources?.showStatusTimers === 'blueLight' && inRange && (
        <>
          <View style={Styles.borderBlue}>
            <View style={Styles.borderGreen}>
              <ButtonRounded style={{ height: verticalScale(50) }}>
                <Text h11 white center medium>
                  {i18n.t('home.textTimeRemaining')}:
                </Text>
                <CountDownDateGreen show={rewardsData?.successReward} changeStateColor={(value) => handleStateChange(value)} navigation={navigation} />
              </ButtonRounded>
            </View>
          </View>
          <Divider height-10 />
        </>
      )}
      {statusStayOnline && (
        <>
          <ButtonRounded>
            <Text h14 white center medium>
              {i18n.t('home.textStayOnlineTo')}
            </Text>
          </ButtonRounded>
          <View height-5 blue02>
            <View style={{ width: '40%' }} height-5 white />
          </View>
          <Divider height-10 />
        </>
      )}
      {appResources?.showStatusTimers === 'green' && statusAvailable && (
        <>
          <View height-65 green centerH centerV>
            <Text h14 white bold>{i18n.t('home.textYouAreFullyActive')}</Text>
            <Text h12 white>{i18n.t('home.textComeBackTomorrowFrom')} 06:00 to 12:00 UTC.</Text>
          </View>
          <Divider height-10 />
        </>
      )}

      {statusFinish && (
        <>
          <View height-65 blue03 centerH centerV style={{ borderColor: Colors.blue04, borderWidth: 1 }}>
            <Text h14 white light>{i18n.t('home.textDistributionCycleHasFinished')}</Text>
            <Text h14 white bold>{i18n.t('home.textComeBackTomorrow')}</Text>
          </View>
          <Divider height-10 />
        </>
      )}
      {appResources?.showStatusTimers === 'blueDark' && !inRange && (
        <>
          <View blue03 height-45 centerH centerV>
            <Text h12 white>{i18n.t('home.textValidationOfReward')}</Text>
            <CountDownDates showBlue={rewardsData?.successReward} changeStateColor={(value) => handleStateChange(value)} navigation={navigation} />
          </View>
          <Divider height-10 />
        </>
      )}

      <Text h14 blue02 center>{i18n.t('home.textValidatingReward')}</Text>
      <Divider height-5 />
      <Text h16 white semibold center>{thousandsSeparator(rewardsData?.configRewards?.amount)}</Text>
      <Divider height-10 />
      <View row>
        <IconLineVertical height={'100%'} width={verticalScale(1)} fill={brandTheme?.blue04 ?? colors.blue04} />
        <View flex-1 >
          <Text h12 blue02 right>{i18n.t('home.textLicensesInNetwork')}</Text>
          <Text h16 white right semibold>{licensesData?.totalLicensesNetwork}</Text>
        </View>
        <Divider width-10 />
        <IconLineVertical height={'100%'} width={verticalScale(1)} fill={brandTheme?.blue04 ?? colors.blue04} />
        {/* <Divider style={Styles.borderDoted} /> */}
        <Divider width-10 />
        <View flex-1 >
          <Text h12 blue02 left>{i18n.t('home.textTotalActiveLicenses')}</Text>
          <Text h16 white left semibold>{totalLicenses}</Text>
        </View>
        <IconLineVertical height={'100%'} width={verticalScale(1)} fill={brandTheme?.blue04 ?? colors.blue04} />
      </View>
      <Divider height-10 />
      <CountDownSeconds navigation={navigation} />
      <Divider height-10 />
      <View marginV-5 row>
        <IconLineVertical height={'100%'} width={verticalScale(1)} fill={brandTheme?.blue04 ?? colors.blue04} />
        <View flex-1 paddingH-15 centerV>
          <Text h9 blue02 right>{i18n.t('home.textDistributedPerDay')}</Text>
          <Text h11 white right semibold>{thousandsSeparator(parseInt(rewardsData?.configRewards?.amount))}</Text>
        </View>
        <IconLineVertical height={'100%'} width={verticalScale(1)} fill={brandTheme?.blue04 ?? colors.blue04} />
        <View flex-1 paddingH-15 centerV>
          <Text h9 blue02 center>{i18n.t('home.textPointsPerLicence')}</Text>
          <Text h11 white center semibold>{thousandsSeparator(rewardsPerUser)}</Text>
        </View>
        <IconLineVertical height={'100%'} width={verticalScale(1)} fill={brandTheme?.blue04 ?? colors.blue04} />
        <View flex-1 paddingH-15 centerV>
          <Text h9 blue02 left>{i18n.t('home.textAvailableThisMonth')}</Text>
          <Text h11 white left semibold>12 000 000</Text>
        </View>
        <IconLineVertical height={'100%'} width={verticalScale(1)} fill={brandTheme?.blue04 ?? colors.blue04} />
      </View>
      <Divider height-20 />
      <ButtonRounded
        green
        onPress={() => navigation.navigate('GetLicenses', { page: 'dashboard' })}
        disabled={false}
      >
        <Text h14 green>
          {i18n.t('home.buttonLicensesActivation')}
        </Text>
      </ButtonRounded>
      {/* <Loading modalVisible={licensesData?.isLoadingLicenses} /> */}
      <View flex-1 bottom>
        <SnackNotice
          visible={error}
          message={licensesData?.error?.message}
          timeout={3000}
        />
      </View>
    </BackgroundWrapper>
  );
}


export default Dashboard;