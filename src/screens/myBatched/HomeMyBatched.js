import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import menu from '@assets/icons/hamburgerMenu.png';
import clock from '@assets/icons/blue-clock.png';
import history from '@assets/icons/blue-history.png';
import whiteWallet from '@assets/icons/white-wallet.png';
import blueReferred from '@assets/icons/blue-referred.png';
import ButtonsOption from './components/ButtonsOption';
import HomeBalance from './components/HomeBalance';

import History from './History';
import Referred from './Referred';
import Styles from './styles';
import i18n from '@utils/i18n';

const HomeMyBatched = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);

  function showBalance(){
    setShowStep1(true);
    setShowStep2(false);
    setShowStep3(false);
  }
  function showReferred(){
    setShowStep1(false);
    setShowStep2(true);
    setShowStep3(false);
  }
  function showHistory(){
    setShowStep1(false);
    setShowStep2(false);
    setShowStep3(true);
  }

  function handleDashboard(){
    navigation.navigate("Dashboard")
  }

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={menu} childrenRight={clock} onPressRight={handleDashboard} menu navigation={navigation}>
      <Divider height-10 />
      <View row>
        <ButtonsOption label={i18n.t('home.myBatchedBalance.buttonBalances')} image={whiteWallet} onPress={showBalance} status={showStep1}/>
        <ButtonsOption label={i18n.t('home.myBatchedBalance.buttonReferred')} image={blueReferred} onPress={showReferred} status={showStep2}/>
        <ButtonsOption label={i18n.t('home.myBatchedBalance.buttonHistory')}  image={history} onPress={showHistory} status={showStep3}/>
      </View>
      <Divider style={Styles.borderDoted} />
      <Divider height-15 />
      {showStep1&&(
        <HomeBalance navigation={navigation}/>
      )}
      {showStep2&&(
        <Referred navigation={navigation}/>
      )}
      {showStep3&&(
        <History navigation={navigation}/>
      )}
     
    </BackgroundWrapper>


  );
}


export default HomeMyBatched;