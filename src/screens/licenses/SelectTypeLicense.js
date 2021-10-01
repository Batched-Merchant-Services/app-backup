import React, { useEffect,useState } from 'react';
import {
  Text,
  View,
  Divider,
  NavigationBar,
  ButtonRounded,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';


const SelectTypeLicense = ({ navigation }) => {
  const redux = useSelector(state => state);
  const [items, setItems] = useState([
    {id: '1', name: 'Bitcoin',value:'BTC'},
    {id: '2', name: 'Litecoin',value:'LT'},
    {id: '3', name: 'ChaiLink',value:'CH'},
    {id: '3', name: 'Ethereum',value:'ET'}
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
    <BackgroundWrapper showNavigation={true} childrenLeft={true} >
     <NavigationBar childrenLeft navigation={navigation}/>
      <Divider height-10 />
      <Text h16 regular blue02>Acquire licenses to increase</Text>
      <Text h16 bold blue02>reward points</Text>
      <Divider height-10 />
      <View flex-1 row>
      <View flex-1 >
        <Text h12 regular blue02>Price per license</Text>
        <Text h16 regular white>900USD</Text>
      </View>
      <View flex-1 centerH>
        <Text h12 regular blue02>Maximum Licenses</Text>
        <Text h16 regular white>05</Text>
      </View>
      <View flex-1>
        <Text h12 regular blue02>Your Licenses</Text>
        <Text h16 regular white>0</Text>
      </View>
      </View>
      <Divider height-10 />
      <Text h12 white light>Select the <Text white semibold>number of Licenses</Text> and <Text white semibold>the cryptocurrency</Text> with which you want to make the payment.</Text>
      <Divider height-10 />
      <DropDownPicker
        {...typeLicenses}
        label={'Licenses'}
        options={items}

        //onFill={(code)=> filterPays(code)}
       />
      <Divider height-5 />
      <DropDownPicker
        {...cryptoCurrency}
        label={'Criptocurrency'}
        options={items}

        //onFill={(code)=> filterPays(code)}
       />
      <Divider height-5 />
      <View flex-1 >
      <ButtonRounded
        onPress={() => navigation.navigate("TransferCryptoCurrency")}
        disabled={false}
        blue
        size='lg'
      >
        <Text h14 semibold white>
          Next
        </Text>
      </ButtonRounded>
      </View>
    </BackgroundWrapper>
  );
}


export default SelectTypeLicense;