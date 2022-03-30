import React, { useEffect,useState } from 'react';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import QRCode from 'react-native-qrcode-svg';
import { scale} from 'react-native-size-matters';
import i18n from '@utils/i18n';

const QrCodeTransaction = ({ navigation,navigation: { goBack }  }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const user = redux?.user;
  const userProfile = user?.dataUser?.clients ? user?.dataUser?.clients[0] : '';
  const accountCrypto = userProfile?.accountCrypto ? userProfile?.accountCrypto[0] : '';

  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={true} navigation={navigation}>
      <Text h18 regular blue02>{i18n.t('Licenses.textQRCodeForTransaction')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('Licenses.textScanTheFollowingQR')}</Text>
      <Divider height-20 />
      <View centerH>
        <View blue02 width-320 height-30 centerH centerV><Text h12 white semibold>Ethereum{' '}{i18n.t('Licenses.textQRCode')} </Text></View>
        <QRCode
          value={licensesData?.dataAddress?.address || accountCrypto?.address}
          size={scale(320)}
          quietZone={scale(30)}
        />
      </View>
      <Divider height-30 />
      <View flex-1  bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('General.buttonBack')}
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}


export default QrCodeTransaction;