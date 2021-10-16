import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import Menu from '@assets/icons/hamburgerMenu.png';
import Wallet from '@assets/icons/blue-wallet.png';
import CircleTimer from '@assets/home/CircleTimer.png';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Styles from './styles';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import {
  useColorScheme,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const redux = useSelector(state => state);
  const [statusAvailable, setStatusAvailable] = useState(true);
  const [statusParticipate, setStatusParticipate] = useState(false);
  const [statusStayOnline, setStatusStayOnline] = useState(false);
  const [statusActive, setsStatusActive] = useState(false);
  const [statusFinish, setsStatusFinish] = useState(false);

  useEffect(() => {
    console.log('redux', redux)
  }, [])




  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: colors.white,
    flex: 1
  };
  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={Menu} childrenRight={Wallet} menu navigation={navigation}>
      {statusParticipate && (
        <>
          <View style={Styles.borderBlue}>
            <View style={Styles.borderGreen}>
              <ButtonRounded>
                <Text h14 white center medium>
                  {i18n.t('home.textParticipateInToday')}
                </Text>
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
            <Text h18 semibold white>30D 12H 47M 18S</Text>
          </View>
          <Divider height-10 />
        </>
      )}

      <Text h14 blue02 center>{i18n.t('home.textValidatingReward')}</Text>
      <Text h18 white semibold center>00,000</Text>
      <Divider height-10 />
      <View row>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h12 blue02 right>{i18n.t('home.textLicensesInNetwork')}</Text>
          <Text h16 white right semibold>00</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h12 blue02 left>{i18n.t('home.textLicensesInNetwork')}</Text>
          <Text h16 white left semibold>00</Text>
        </View>
        <Divider style={Styles.borderDoted} />
      </View>
      <View flex-1 height-280>
        <ImageBackground source={CircleTimer} resizeMode="cover" style={Styles.image}>
          <View blue03 centerV marginT-20 style={Styles.containerTime}>
            <Text h30 white>00</Text>
            <Text h20 blue02>%</Text>
          </View>
        </ImageBackground>
        <View>
          <Text h14 blue02 center>{i18n.t('home.textDistributionCycle')}</Text>
          <Text h16 white center semibold>00:00:00</Text>
        </View>
      </View>
      <Divider height-10 />
      <View flex-1 row>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h12 blue02 right>{i18n.t('home.textDistributedPerDay')}</Text>
          <Text h16 white right semibold>00</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h12 blue02 center>{i18n.t('home.textPointsPerLicence')}</Text>
          <Text h16 white center semibold>00</Text>
        </View>
        <Divider style={Styles.borderDoted} />
        <View flex-1 paddingH-15>
          <Text h12 blue02 left>{i18n.t('home.textAvailableThisMonth')}</Text>
          <Text h16 white left semibold>00</Text>
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
    </BackgroundWrapper>
  );
}


export default Dashboard;