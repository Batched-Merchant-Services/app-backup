import React, { useEffect, useState } from 'react';
import { View, Text, ButtonRounded, Divider, Link } from '@components';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDate } from '@utils/formatters';
import i18n from '@utils/i18n';
import IconKey from '@assets/iconSVG/IconAuth2fa/IconKey';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '@assets/iconSVG/IconWarning';
import Styles from './styles';
import LottieView from 'lottie-react-native';

const ModalInfo2fa = ({ visible, onRequestClose, getData, onPressOverlay, ...props }) => {
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

  useEffect(() => {
    setTimeout(() => {
      setShowButtonModal(false);
    }, 1000);
  }, [showButtonModal]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View flex-1 centerV centerH>
        <View centerV blue04 style={{ width: '92%', height: '80%' }}>
          <Divider height-30 />
          <View centerH>
            <LottieView source={require('../assets/animationsLottie/IconSecurityLock.json')} autoPlay loop style={{ width: '90%' }} />
          </View>
          <Divider height-40 />
          <View flex-1 padding-20>
            <Text h12 regular white left>Agrega mayor seguridad a tu cuenta.</Text>
            <Divider height-30 />
            <Text h12 regular white left>En caso de realizar una transferencia de puntos la autenticación será requerida.</Text>
            <View flex-1 bottom centerH >
              <ButtonRounded
                onPress={onPressOverlay}
                disabled={showButtonModal}
                size='280'
                blue
              >
                <Text h14 semibold white>
                  Activar ahora
                </Text>
              </ButtonRounded>
            </View>
          </View>
          <Divider height-25 />
        </View>

      </View>
    </Modal>

  )
};

export default ModalInfo2fa;
