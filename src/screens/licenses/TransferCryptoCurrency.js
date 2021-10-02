import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  UploadFile,
  NavigationBar,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';


const TransferCryptoCurrency = ({ navigation }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('referenceCode', '');
  const [items, setItems] = useState([
    { id: '1', name: 'Bitcoin', value: 'BTC' },
    { id: '2', name: 'Litecoin', value: 'LT' },
    { id: '3', name: 'ChaiLink', value: 'CH' },
    { id: '3', name: 'Ethereum', value: 'ET' }
  ]);
  const typeLicenses = useValidatedInput('', {
    changeHandlerSelect: 'onSelect'
  });
  const cryptoCurrency = useValidatedInput('', {
    changeHandlerSelect: 'onSelect'
  });

  useEffect(() => {
    console.log('redux', redux)
  }, [])


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={true} navigation={navigation}>
      <NavigationBar childrenLeft navigation={navigation} />
      <Divider height-10 />
      <Text h16 regular blue02>Acquire licenses to increase</Text>
      <Text h16 bold blue02>reward points</Text>
      <Divider height-10 />
      <Text h12 white light>Make the transfer<Text white semibold>of Cryptocurrencies to the address </Text> shown here and save the transfer receipt to validate the transaction.</Text>
      <Divider height-10 />
      <FloatingInput
        {...referenceCode}
        label={'Amount required'}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-10 />
      <FloatingInput
        {...referenceCode}
        label={'Address Ethereum to transfer'}
        keyboardType={'default'}
        autoCapitalize={'none'}
      />
      <Divider height-10 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            Copy Address
          </Text>
        </ButtonRounded>
        <Divider width-10 />
        <ButtonRounded
          onPress={() => navigation.navigate("TermConditions")}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            View QR Code
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-10 />
      <Text h12 white>3. Submit a screenshot of the transfer receipt.</Text>
      <Divider height-10 />
      <UploadFile 
        labelInput={'PNG, JPG, PDF (Less than 1 MB)'} 
        labelButton={'Choose file'}/>
      <Divider height-10 />
      <ButtonRounded
        onPress={() => navigation.navigate("QrCodeTransaction")}
        disabled={false}
        size='lg'
      >
        <Text h14 semibold white>
          Check transaction
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>
  );
}


export default TransferCryptoCurrency;