import React, { useEffect, useState } from 'react';
import { View, Text, ButtonRounded, Divider,Link,SnackBar } from '@components';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDate } from '@utils/formatters';
import i18n from '@utils/i18n';
import IconKey from '@assets/iconSVG/IconAuth2fa/IconKey';
import Clipboard from '@react-native-community/clipboard';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '@assets/iconSVG/IconWarning';
import Styles from './styles';

const ModalAuth2fa = ({ visible, onRequestClose, getData, onPressOverlay, ...props }) => {
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
    }, 5000);
  }, [showButtonModal]);
  
  const copyToClipboard = () => {
    Clipboard.setString(clabe);
    
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View flex-1 centerV centerH  style={{backgroundColor:'rgba(46, 58, 110, 0.72)'}}>
        <View centerH centerV blue04 padding-20 style={{ width: '92%', height: '83%' }}>
          <Divider height-30 />
          <IconKey width={scale(80)} height={verticalScale(80)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
          <Divider height-20 />
          <Text h18 regular blue02>{i18n.t('Auth2fa.textDontForgetTo')}!</Text>
          <Divider height-10 />
          <Text h12 light white>{i18n.t('Auth2fa.textIsTheFormOf')}{' '}<Text white semibold>{i18n.t('Auth2fa.textRecoverYourAuthenticationIn')}</Text></Text>
          <Divider height-10 />
          <View row padding-10 centerV style={{ borderColor: colors.blue02, borderWidth: 1 }}>
            <Text white h10 medium>{clabe}</Text>
            <Divider width-8 />
            <Link onPress={copyToClipboard}>
              <Text h12 blue02>{i18n.t('Auth2fa.linkCopy')}</Text>
            </Link>
          </View>
          <Divider height-20 />
          <View row paddingH-10 centerV warning height-55>
            <IconWarning width={scale(18)} height={verticalScale(18)} fill={brandTheme?.white ?? colors?.white} fillSecondary={brandTheme?.warning ?? colors?.warning} />
            <Divider width-10 />
            <View flex-1>
              <Text h12 semibold white>{i18n.t('Auth2fa.textKeepYourKeyWhere')},{' '}<Text regular white>{i18n.t('Auth2fa.textItWillBeRequired')}</Text></Text>
            </View>
          </View>
          <Divider height-20 />
          <Text h12 regular white>{i18n.t('Auth2fa.textNeverShareYour')}</Text>
          <Divider height-20 />
          <View flex-1 bottom centerH >
            <ButtonRounded
              onPress={onPressOverlay}
              disabled={showButtonModal}
              dark
            >
              <Text h14 semibold white>
                {i18n.t('Auth2fa.textIAlreadyBackedUpPassword')}
              </Text>
            </ButtonRounded>
          </View>
        </View>
      </View>
    </Modal>

  )
};

export default ModalAuth2fa;
