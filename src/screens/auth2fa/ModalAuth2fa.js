import React, { useEffect, useState } from 'react';
import { View, Text, ButtonRounded, Divider,Link } from '@components';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDate } from '@utils/formatters';
import i18n from '@utils/i18n';
import IconKey from '@assets/iconSVG/IconAuth2fa/IconKey';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import IconWarning from '@assets/iconSVG/IconWarning';
import Styles from './styles';

const ModalAuth2fa = ({ visible, onRequestClose, getData, onPressOverlay, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(true);
  const [clabe, setClabe] = useState('BCWFNUJDXPOLQW4E5LEITVS');
  const { colors } = useTheme();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const format = formatDate(currentDate);
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    getData(format)

  };

  useEffect(() => {
    setTimeout(() => {
      setShowButtonModal(false);
    }, 5000);
   
  }, [showButtonModal]);
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View flex-1 centerV centerH>
        <View centerH centerV blue04 padding-20 style={{ width: '92%', height: '83%' }}>
          <Divider height-30 />
          <IconKey width={scale(80)} height={verticalScale(80)} fill={brandTheme?.blue02 ?? colors?.blue02} fillSecondary={brandTheme?.white ?? colors?.white} />
          <Divider height-20 />
          <Text h18 regular blue02>No olvides respaldar tu llave antes de irte!</Text>
          <Divider height-10 />
          <Text h12 light white>Es la forma de{' '}<Text white semibold>recuperar tu autenticación en caso de que cambies de dispositivo o aplicación.</Text></Text>
          <Divider height-10 />
          <View row padding-10 centerV style={{ borderColor: colors.blue02, borderWidth: 1 }}>
            <Text white h13 medium>{clabe}</Text>
            <Divider width-8 />
            <Link>
              <Text h12 blue02>copiar</Text>
            </Link>
          </View>
          <Divider height-20 />
          <View row paddingH-10 centerV warning height-55>
            <IconWarning width={scale(18)} height={verticalScale(18)} fill={brandTheme?.white ?? colors?.white} fillSecondary={brandTheme?.warning ?? colors?.warning} />
            <Divider width-10 />
            <View flex-1>
              <Text h12 semibold white>Guarda tu llave donde puedas recuperarla,{' '}<Text regular white>se requerirá en caso de que cambies tu dispositivo.</Text></Text>
            </View>
          </View>
          <Divider height-20 />
          <Text h12 regular white>Nunca compartas tu llave con nadie.</Text>
          <Divider height-20 />
          <View flex-1 bottom centerH >
            <ButtonRounded
              onPress={onPressOverlay}
              disabled={showButtonModal}
              dark
            >
              <Text h14 semibold white>
                Ya respaldé mi clave
              </Text>
            </ButtonRounded>
          </View>
        </View>

      </View>
    </Modal>

  )
};

export default ModalAuth2fa;
