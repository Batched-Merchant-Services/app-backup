import React, { useEffect,useState } from 'react';
import {
  Text,
  View,
  Divider,
  ButtonRounded,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import QRCode from 'react-native-qrcode-svg';
import { scale} from 'react-native-size-matters';


const QrCodeTransaction = ({ navigation,navigation: { goBack }  }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('referenceCode', '');

  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={true} navigation={navigation}>
      <Text h18 regular blue02>QR code for transaction</Text>
      <Divider height-10 />
      <Text h12 white light>Scan the following QR code from your crypto wallet to make the transfer.</Text>
      <Divider height-20 />
      <View centerH>
        <View blue02 width-320 height-30 centerH centerV ><Text h12 white semibold>Ethereum QR Code</Text></View>
        <QRCode
          value="http://awesome.link.qr"
          size={scale(320)}
          quietZone={scale(30)}
        />
      </View>
      <Divider height-30 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            Back
          </Text>
        </ButtonRounded>
        <Divider width-10 />
        
        <ButtonRounded
          onPress={() => navigation.navigate("ConfirmationLicenses")}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            Download
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>


  );
}


export default QrCodeTransaction;