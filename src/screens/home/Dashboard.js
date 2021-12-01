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
import Styles from './styles';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import Loading from '../Loading';
//actions
import { toggleSnackbarClose, changeStatusTimers } from '@store/actions/app.actions';
import { cleanErrorLicenses, getTotalLicensesInNetwork } from '@store/actions/licenses.actions';
import { getValidateRewardsByUser, getRewardsConfig } from '@store/actions/rewards.actions';
import { getDataUser } from '@store/actions/user.action';
import { thousandsSeparator } from '@utils/formatters';
import { verticalScale } from 'react-native-size-matters';
import CountDownDateGreen from './components/CountDownDateGreen';
import CountDownSeconds from './components/CountDownSeconds';
import CountDownDates from './components/CountDownDates';
//import moment from 'moment';



 
const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const infoUser = redux?.user;
  const appResources = redux?.app;
  const rewardsData = redux?.rewards;
  const [percent, setPercent] = useState(0);
  const [statusAvailable, setStatusAvailable] = useState(rewardsData?.inProcess?false:true);
  const [statusParticipate, setStatusParticipate] = useState(appResources?.changeStatus === 1?true:false);
  const [statusStayOnline, setStatusStayOnline] = useState(false);
  const [totalLicenses, setTotalLicenses] = useState(0);
  const [timeLeft, setTimeLeft] = useState([]);
  const [statusActive, setsStatusActive] = useState(rewardsData?.inProcess);
  const [statusFinish, setsStatusFinish] = useState(false);
  const [starTimer, setStarTimer] = useState(false);
  const [showButtonStart, setShowButtonStart] = useState(true);
  const error = useSelector(state => state?.licenses?.showErrorLicenses);


  
  useEffect(() => {
    console.log('inProcess',rewardsData?.inProcess)
    console.log('appResources?.changeStatus',appResources?.changeStatus)
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());
      dispatch(getTotalLicensesInNetwork());
      dispatch(getValidateRewardsByUser());
      dispatch(getRewardsConfig());
      getBatchedTransaction();
      dispatch(getDataUser());
    });
    return unsubscribe;
  }, []);

  function getBatchedTransaction() {
    console.log('transaction',infoUser)
    infoUser?.dataUser?.bachedTransaction?.forEach(transaction => {
      if (transaction.status === 1 || transaction.status === 3) setTotalLicenses(totalLicenses + transaction.routingNumber ? parseInt(transaction.routingNumber) : transaction.routingNumber);
    });
  }


  function handleNavigationWallet() {
    navigation.navigate("HomeMyBatched")
  }

  function handleStateChange(value) {
    console.log('value',value)
    switch (value) {
      case 'blueDark':
          return  dispatch(changeStatusTimers(0,'blueDark'));
      case 'blueLight':
        return  dispatch(changeStatusTimers(1,'blueLight')); 
      default:
          return dispatch(changeStatusTimers(0,'blueDark'));
    }
  }
  // function showPercent(value) {
  //   if (value) {
  //     const parse = parseInt(value);
  //     if (parse === 0) {
  //       setPercent(0)
  //       setShowButtonStart(true);
  //       setStarTimer(false);
  //     }else{
  //       setPercent(value)
  //       setShowButtonStart(false);
  //     }
      
  //   }
   
  // }
  
  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={Menu} childrenRight={Wallet} menu onPressRight={handleNavigationWallet} navigation={navigation}>
      {appResources?.showStatusTimers === 'blueLight' && statusAvailable &&(
        <>
          <View style={Styles.borderBlue}>
            <View style={Styles.borderGreen}>
              <ButtonRounded style={{ height: verticalScale(50) }}>
                <Text h11 white center medium>
                  {i18n.t('home.textTimeRemaining')}:
                </Text>
                <CountDownDateGreen show={true} changeStateColor={(value) => handleStateChange(value)} navigation={navigation} />
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
      { appResources?.showStatusTimers === 'green'  && (
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
      { appResources?.showStatusTimers === 'blueDark' && statusAvailable && (
        <>
          <View blue03 height-45 centerH centerV>
            <Text h12 white>{i18n.t('home.textValidationOfReward')}</Text>
            <CountDownDates showBlue={true} changeStateColor={(value) => handleStateChange(value)} navigation={navigation} />
          </View>
          <Divider height-10 />
        </>
      )}

      <Text h14 blue02 center>{i18n.t('home.textValidatingReward')}</Text>
      <Text h13 white semibold center>{thousandsSeparator(rewardsData?.configRewards?.amount)}</Text>
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
      <CountDownSeconds navigation={navigation}/>
      {/* <View flex-1 height-280>
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
              <Text h24 white>{percent}</Text>
              <Text h20 blue02>%</Text>
            </View>
          )}
        </ImageBackground>
        <View centerH>
          <Text h14 blue02 center>{i18n.t('home.textDistributionCycle')}</Text>
          <CountDownSeconds startTime={starTimer} valueInfo={(value) => showPercent(value)} />
        </View>
      </View> */}
      <Divider height-10 />
      <View marginV-5 row>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h9 blue02 right>{i18n.t('home.textDistributedPerDay')}</Text>
          <Text h11 white right semibold>{thousandsSeparator(parseInt(rewardsData?.configRewards?.amount))}</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h9 blue02 center>{i18n.t('home.textPointsPerLicence')}</Text>
          <Text h11 white center semibold>00</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h9 blue02 left>{i18n.t('home.textAvailableThisMonth')}</Text>
          <Text h11 white left semibold>12 000 000</Text>
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