import React, { useEffect,useState,useRef } from 'react';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  NavigationBar,
  ButtonRounded,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { Animated } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { cleanErrorLicenses } from '@store/actions/licenses.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import i18n from '@utils/i18n';
import Loading from '../Loading';
import { getTypeCurrenciesCrypto } from '../../store/actions/licenses.actions';



const SelectTypeLicense = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const dataUser = redux?.user;
  const [maximumLicenses, setMaximumLicenses] = useState(0);
  const [totalLicenses, setTotalLicenses] = useState(0);
  const [currencyLicense, setCurrencyLicense] = useState(0);
  const [idCurrency, setIdCurrency] = useState(0);
  const [itemTypeLicenses, setItemTypeLicenses] = useState([]);
  const [typeCurrencyCrypto, setTypeCurrencyCrypto] = useState([]);
  const [currentLicense] = useState(licensesData?.currentLicense);
  const [showDropDownLicenses,setShowDropDownLicenses] = useState(false);
  const typeLicenses = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const cryptoCurrency = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const isValid = isFormValid(typeLicenses);
  const fadeMoves = useRef(new Animated.Value(0)).current;
  const error = useSelector(state => state?.licenses?.showErrorLicenses);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());   
      //dispatch(getListLicenses()); 
      dispatch(getTypeCurrenciesCrypto('LicencesPurchaseCurrencies'));
      getInfoData();
      setShowDropDownLicenses(false);
     
    });
    return unsubscribe;
  }, []);
  
  function getInfoData() {
    const InfoBank = {...dataUser?.dataUser}
    if (InfoBank?.bachedTransaction?.length === 0) {
      setTotalLicenses(0);
    }else{
      InfoBank?.bachedTransaction?.filter(filter => filter.status !== 2)?.forEach(transaction => {
        setTotalLicenses(transaction.routingNumber??0);
      })
      InfoBank?.bachedTransaction?.filter(filter => filter.status !== 2 && filter.currencyCrypto === 'UUL')?.forEach(transaction => {
        setTotalLicenses(transaction.routingNumber??0);
      })
    }
    cryptoCurrency?.onChangeText('');
    typeLicenses?.onChangeText('');
    getArrayLicense();
  }

  useEffect(() => {
    setTypeCurrencyCrypto(licensesData?.typeCryptoCurrencies);
  }, [licensesData?.typeCryptoCurrencies]);



  function getArrayLicense(end) {
    const totalLicensesBuy =dataUser?.dataUser?.bachedTransaction? dataUser?.dataUser?.bachedTransaction[0]:[];
    console.log(totalLicensesBuy.length)
    const arrayLicenses =  Array(end??0 - 1 + 1).fill().map((_, idx) =>{
      const value = 1+idx
      return { name:1 + idx, value:value?.toString()}
    });
    setItemTypeLicenses(arrayLicenses);
  }
  

  function typeCurrency(code){
    if (licensesData?.cryptoCurrencies) {
      const rest = licensesData?.cryptoCurrencies?.filter(key => key?.value === code?.value);
      setIdCurrency(rest[0]?.id);
      setCurrencyLicense(code);
      setShowDropDownLicenses(true);
      fadeIn();
    }
   
    if (code?.value === 'UUL') {
      setMaximumLicenses(5)
      const licenseUUl = ( 5 - totalLicenses )
      setMaximumLicenses(licenseUUl)
      const validateNumber = licenseUUl >= 0 ?licenseUUl: 0
      getArrayLicense(validateNumber)
  
    }else{
      setMaximumLicenses(15)
      const licenseOthers = ( 15 - totalLicenses)
      setMaximumLicenses(licenseOthers)
      const validateNumber = licenseOthers >= 0 ?licenseOthers: 0
      getArrayLicense(validateNumber)
    }
  
  }

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeMoves, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };


  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={true} navigation={navigation}>
     <NavigationBar childrenLeft navigation={navigation}/>
      <Divider height-10 />
      <Text h16 regular blue02>{i18n.t('Licenses.textAcquireLicensesToIncrease')}</Text>
      <Text h16 bold blue02>{i18n.t('Licenses.textRewardPoints')}</Text>
      <Divider height-10 />
      <View row>
      <View flex-1 >
        <Text h12 regular blue02>{i18n.t('Licenses.textPricePerLicense')}</Text>
        <Text h16 regular white>{currentLicense?.amountStep}{' '}USD</Text>
      </View>
      <View flex-1 centerH>
        <Text h12 regular blue02>{i18n.t('Licenses.textMaximumLicenses')}</Text>
        <Text h16 regular white>{maximumLicenses}</Text>
      </View>
      <View flex-1>
        <Text h12 regular blue02>{i18n.t('Licenses.textYourLicenses')}</Text>
        <Text h16 regular white>{totalLicenses}</Text>
      </View>
      </View>
      <Divider height-20 />
      <Text h12 white light>{i18n.t('Licenses.textSelectThe')}{' '}<Text white semibold>{i18n.t('Licenses.textNumberOfLicenses')}{' '}</Text>{i18n.t('Licenses.textAnd')}{' '}<Text white semibold>{i18n.t('Licenses.textTheCryptocurrency')}{' '}</Text>{i18n.t('Licenses.textWithWhichYouWant')}</Text>
      <Divider height-10 />
      <DropDownPicker
        {...cryptoCurrency}
        label={i18n.t('Licenses.dropDownCriptocurrency')}
        options={typeCurrencyCrypto}
        onSelect={(code)=> typeCurrency(code)}
       />
      <Divider height-5 />
      {showDropDownLicenses&&(
        <Animated.View
          style={[
            {
              // Bind opacity to animated value
              opacity: fadeMoves
            }
          ]}>
        <DropDownPicker
        {...typeLicenses}
        label={i18n.t('Licenses.dropDownLicenses')}
        options={itemTypeLicenses}
        //onFill={(code)=> filterPays(code)}
       />
       </Animated.View>
      )}
      
      <Divider height-5 />
      
      <View flex-1  bottom>
      <ButtonRounded
      onPress={() => {
          navigation.push('TransferCryptoCurrency',{ id: idCurrency,currency: currencyLicense?.value,typeLicenses: typeLicenses?.value});
        }}
        disabled={!isValid}
        blue
      >
        <Text h14 semibold white>
          {i18n.t('General.buttonNext')}
        </Text>
      </ButtonRounded>
      </View>
      <SnackNotice
        visible={error}
        message={licensesData?.error?.message}
        timeout={3000}
      />
      <Loading modalVisible={licensesData?.getTypeCurrency} />
    </BackgroundWrapper>
  );
}


export default SelectTypeLicense;