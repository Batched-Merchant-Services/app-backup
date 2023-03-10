import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import ButtonsOption from './components/ButtonsOption';
import HomeBalance from './components/HomeBalance';
import History from './History';
import Referred from './Referred';
import Styles from './styles';
import i18n from '@utils/i18n';
import Loading from '../Loading';
import IconBalance from '@assets/iconSVG/IconBalance';
import IconReferred from '@assets/iconSVG/IconReferred';
import IconHistory from '@assets/iconSVG/IconHistory';
// import IconCycle from '@assets/iconSVG/IconCycle';
import IconLineDotted from '../../assets/iconSVG/IconLineDotted';
import { useTheme } from '@react-navigation/native';
import { cleanErrorPoints } from '@store/actions/points.actions';
import { scale, verticalScale } from 'react-native-size-matters';
import { toggleSnackbarClose } from '../../store/actions/app.actions';
const Balance = require('../../assets/animationsLottie/IconBalanceEnabled.json');
const ReferredImage = require('../../assets/animationsLottie/IconReferred.json');
const HistoryIcon = require('../../assets/animationsLottie/IconHistoryEnable.json');
const IconCycle = require('../../assets/animationsLottie/IconCycle.json');



const HomeMyBatched = ({ navigation }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const userData = redux.user;
  const app = redux?.app;
  const brandTheme = userData?.Theme?.colors;
  const points = redux?.points;
  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const { colors } = useTheme();
  const error = useSelector(state => state?.points?.errorPoints);


  useEffect(() => {
    dispatch(toggleSnackbarClose());
    const unsubscribe = navigation.addListener('focus', () => {
      setShowStep1(true);
      setShowStep2(false);
      setShowStep3(false);
    });
    return unsubscribe;

  }, [showStep1])


  function showBalance() {
    setShowStep1(true);
    setShowStep2(false);
    setShowStep3(false);
  }
  function showReferred() {
    setShowStep1(false);
    setShowStep2(true);
    setShowStep3(false);
  }
  function showHistory() {
    setShowStep1(false);
    setShowStep2(false);
    setShowStep3(true);
  }

  const handleDashboard = () => {
    navigation.navigate("Dashboard")
  }
  return (
    <View flex-1 blue04>
      <BackgroundWrapper showNavigation={true} childrenLeft childrenRight={IconCycle} onPressRight={handleDashboard} menu navigation={navigation}>
        <Divider height-10 />
        <View row>
          <ButtonsOption label={i18n.t('home.myBatchedBalance.buttonBalances')} IconImage={IconBalance} Animation={Balance} onPress={showBalance} status={showStep1} />
          <ButtonsOption label={i18n.t('home.myBatchedBalance.buttonReferred')} IconImage={IconReferred} Animation={ReferredImage} onPress={showReferred} status={showStep2} />
          <ButtonsOption label={i18n.t('home.myBatchedBalance.buttonHistory')} IconImage={IconHistory} Animation={HistoryIcon} onPress={showHistory} status={showStep3} />
        </View>
        {/* <Divider style={Styles.borderDoted} /> */}
        <Divider height-1 />
        <IconLineDotted height={verticalScale(1)} width={'100%'} fill={brandTheme?.blue04 ?? colors.blue04} />
        <Divider height-15 />
        {showStep1 && (
          <HomeBalance navigation={navigation} />
        )}
        {showStep2 && (
          <Referred navigation={navigation} />
        )}
        {showStep3 && (
          <History navigation={navigation} />
        )}
        <Loading modalVisible={points?.isLoadingRewardsPoints} />
      </BackgroundWrapper>
      <View centerH paddingH-20 style={{marginBottom: app?.toggleSnackbar ? 20: 0}}>
        <SnackNotice
          visible={error}
          message={points?.error?.message}
          timeout={3000}
        />
      </View>
    </View>


  );
}


export default HomeMyBatched;