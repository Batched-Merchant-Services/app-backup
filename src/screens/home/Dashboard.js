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
import Menu from '@assets/icons/hamburgerMenu.png';
import Wallet from '@assets/icons/blue-wallet.png';
import CircleTimer from '@assets/home/CircleTimer.png';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Styles from './styles';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import Loading from '../Loading';
//actions
import { toggleSnackbarClose,changeStatusTimers } from '@store/actions/app.actions';
import { cleanErrorLicenses, getTotalLicensesInNetwork } from '@store/actions/licenses.actions';
import { getValidateRewardsByUser, getRewardsConfig } from '@store/actions/rewards.actions';
import { thousandsSeparator } from '@utils/formatters';
import CountDownSeconds from './components/CountDownSeconds';
import CountDownDates from './components/CountDownDates';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { verticalScale } from 'react-native-size-matters';
//import moment from 'moment';




const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const infoUser = redux?.user;
  const appResources = redux?.app;
  const rewardsData = redux?.rewards;
  const [statusAvailable, setStatusAvailable] = useState(false);
  const [statusParticipate, setStatusParticipate] = useState(false);
  const [statusStayOnline, setStatusStayOnline] = useState(false);
  const [totalLicenses, setTotalLicenses] = useState(0);
  const [timeLeft, setTimeLeft] = useState([]);
  const [statusActive, setsStatusActive] = useState(false);
  const [statusFinish, setsStatusFinish] = useState(false);
  const [starTimer, setStarTimer] = useState(false);
  const [showButtonStart, setShowButtonStart] = useState(true);
  const error = useSelector(state => state?.licenses?.showErrorLicenses);
  const startDate = rewardsData?.configRewards?.startDate
  const endDate = rewardsData?.configRewards?.endDate
  //const arrivalDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());
      dispatch(getTotalLicensesInNetwork());
      dispatch(getValidateRewardsByUser());
      dispatch(changeStatusTimers(1));
      dispatch(getRewardsConfig());
      
      getBatchedTransaction();
      if (appResources?.changeStatus === 0) {
        setStatusAvailable(true)
        setsStatusActive(false)
      } else if (appResources?.changeStatus === 1) {
        setStatusAvailable(false);
        setsStatusActive(false);
        setStatusParticipate(true);
      }


    });
    return unsubscribe;
  }, []);

  function getBatchedTransaction() {
    infoUser?.dataUser?.bachedTransaction?.forEach(transaction => {
      if (transaction.status === 1 || transaction.status === 3) setTotalLicenses(totalLicenses + transaction.routingNumber ? parseInt(transaction.routingNumber) : transaction.routingNumber);
    });
  }

  function handleNavigationWallet() {
    navigation.navigate("HomeMyBatched")
  }

  function handleStateChange(value) {
    setsStatusActive(value);
    setStatusAvailable(false);
  }


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={Menu} childrenRight={Wallet} menu onPressRight={handleNavigationWallet} navigation={navigation}>
      {statusParticipate && (
        <>
          <View style={Styles.borderBlue}>
            <View style={Styles.borderGreen}>
              <ButtonRounded style={{ height:verticalScale(50)}}>
                <Text h11 white center medium>
                  {i18n.t('home.textTimeRemaining')}:
                </Text>
                <CountDownDates startDate={startDate} endDate={endDate}/>
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
      {statusActive && (
        <>
          <View height-65 green centerH centerV>
            <Text h14 white bold>You are fully active today!</Text>
            <Text h12 white>Come back tomorrow from 06:00 to 12:00 UTC.</Text>
          </View>
          <Divider height-10 />
        </>
      )}

      {statusFinish && (
        <>
          <View height-65 blue03 centerH centerV style={{ borderColor: Colors.blue04, borderWidth: 1 }}>
            <Text h14 white light>Distribution Cycle has finished today,</Text>
            <Text h14 white bold>come back tomorrow to participate.</Text>
          </View>
          <Divider height-10 />
        </>
      )}
      {statusAvailable && (
        <>
          <View blue03 height-45 centerH centerV>
            <Text h12 white>{i18n.t('home.textValidationOfReward')}</Text>
            <CountDownDates startDate={startDate} endDate={endDate} changeStateBuy={(value) => handleStateChange(value)} />
          </View>
          <Divider height-10 />
        </>
      )}

      <Text h14 blue02 center>{i18n.t('home.textValidatingReward')}</Text>
      <Text h18 white semibold center>{thousandsSeparator(rewardsData?.configRewards?.amount)}</Text>
      <Divider height-10 />
      <View row>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h12 blue02 right>{i18n.t('home.textLicensesInNetwork')}</Text>
          <Text h16 white right semibold>{licensesData?.totalLicensesNetwork}</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingL-12>
          <Text h12 blue02 left>{i18n.t('home.textTotalActiveLicenses')}</Text>
          <Text h16 white left semibold>{totalLicenses}</Text>
        </View>
        <Divider style={Styles.borderDoted} />
      </View>
      <View flex-1 height-280>
        <ImageBackground source={CircleTimer} resizeMode="cover" style={Styles.image}>
          {showButtonStart && (
            <TouchableOpacity onPress={() => setStarTimer(true)}>
              <View error centerV marginT-20 style={Styles.containerTime}>
                <Text h20 white bold>Start</Text>
              </View>
            </TouchableOpacity>
          )}
          {!showButtonStart && (
            <View blue03 centerV marginT-20 style={Styles.containerTime}>
              <Text h30 white>00</Text>
              <Text h20 blue02>%</Text>
            </View>
          )}
        </ImageBackground>
        <View centerH>
          <Text h14 blue02 center>{i18n.t('home.textDistributionCycle')}</Text>
          <CountDownSeconds startTime={starTimer} valueInfo={(value) => setShowButtonStart(value)} />
        </View>
      </View>
      <Divider height-10 />
      <View flex-1 row>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h10 blue02 right>{i18n.t('home.textDistributedPerDay')}</Text>
          <Text h15 white right semibold>{thousandsSeparator(rewardsData?.configRewards?.amount)}</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h10 blue02 center>{i18n.t('home.textPointsPerLicence')}</Text>
          <Text h15 white center semibold>00</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h10 blue02 left>{i18n.t('home.textAvailableThisMonth')}</Text>
          <Text h15 white left semibold>12 000 000</Text>
        </View>
        <Divider style={Styles.borderDoted} />
      </View>
      <Divider height-10 />
      <ButtonRounded
        green
        onPress={() => navigation.navigate("ActivationConfirmation")}
        disabled={false}
      >
        <Text h14 green>
          {i18n.t('home.buttonLicensesActivation')}
        </Text>
      </ButtonRounded>
      <Loading modalVisible={licensesData?.isLoadingLicenses} />
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