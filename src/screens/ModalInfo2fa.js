import React, { useEffect, useState } from 'react';
import { View, Text, ButtonRounded, Divider, Link } from '@components';
import { Modal } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { formatDate } from '@utils/formatters';
import i18n from '@utils/i18n';
import IconKey from '@assets/iconSVG/IconAuth2fa/IconKey';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '@assets/iconSVG/IconWarning';
import Styles from './styles';
import LottieView from 'lottie-react-native';
import { saveStateModal2fa } from '../store/actions/app.actions';

const ModalInfo2fa = ({ visible, onRequestClose, getData, onPressOverlay,navigation, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const authData = redux?.auth;
  const brandTheme = appData?.Theme?.colors;
  const [showButtonModal, setShowButtonModal] = useState(true);
  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');
  const { colors } = useTheme();


  useEffect(() => {
    setClabe(authData?.dataQrCode?.secretCode)
  }, [authData?.dataQrCode]);

  function handleGoToDashboard() {
    console.log('appData?.successDataUser',appData?.dataUser?.bachedTransaction?.length)
    if(appData?.successDataUser){
      if (appData?.dataUser?.bachedTransaction?.length > 0) {
       navigation.navigate('Dashboard');
      } else {
       navigation.navigate('GetLicenses');
      }
      dispatch(saveStateModal2fa(true));
      onPressOverlay();
    }
   
  }

  function handleGoToActivate() {
    navigation.navigate('Auth2fa');
    onPressOverlay();
  }



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible }
      onRequestClose={onRequestClose}>
      <View flex-1 centerV centerH  style={{backgroundColor:'rgba(46, 58, 110, 0.72)'}}>
        <View centerV blue04 style={{ width: '92%', height: '80%' }}>
          <Divider height-30 />
          <View centerH>
            <LottieView source={require('../assets/animationsLottie/IconSecurityLock.json')} autoPlay loop style={{ width: '90%' }} />
          </View>
          <Divider height-40 />
          <View flex-1 padding-20>
            <Text h12 regular white left>{i18n.t('General.modal2fa.textAddMoreSecurity')}</Text>
            <Divider height-30 />
            <Text h12 regular white left>{i18n.t('General.modal2fa.textInCaseOfTransferring')}</Text>
            <View flex-1 bottom centerH >
              <ButtonRounded
                onPress={handleGoToActivate}
                size='280'
                blue
              >
                <Text h14 semibold white>
                  {i18n.t('General.modal2fa.buttonActivateNow')}
                </Text>
              </ButtonRounded>
            </View>
            <Divider height-20 />
            <Link onPress={handleGoToDashboard}>
              <Text h12 blue02>{i18n.t('General.modal2fa.buttonActivateNow')}</Text>
            </Link>
          </View>
          <Divider height-25 />
        </View>

      </View>
    </Modal>

  )
};

export default ModalInfo2fa;
