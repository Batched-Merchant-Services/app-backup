import React, { useEffect,useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput } from '@hooks/validation-hooks';
import { cleanErrorLicenses,getListLicenses,getTotalLicenses,getCryptoCurrency } from '@store/actions/licenses.actions';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import i18n from '@utils/i18n';
import Loading from '../Loading';

const SelectTypeLicense = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const [items, setItems] = useState([]);
  const [currentLicense] = useState(licensesData?.currentLicense);
  const typeLicenses = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const cryptoCurrency = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const error = useSelector(state => state?.licenses?.showErrorLicenses);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());   
      dispatch(getListLicenses()); 
      dispatch(getTotalLicenses());
      dispatch(getCryptoCurrency());
      
    });
    return unsubscribe;
  }, []);
  

  console.log('licensesData',licensesData?.currentLicense)
  if (licensesData?.isLoadingLicenses) {
    return <Loading />;
  }

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
        <Text h16 regular white>{currentLicense?.amountStep*currentLicense?.numberStep}{' '}USD</Text>
      </View>
      <View flex-1 centerH>
        <Text h12 regular blue02>{i18n.t('Licenses.textMaximumLicenses')}</Text>
        <Text h16 regular white>05</Text>
      </View>
      <View flex-1>
        <Text h12 regular blue02>{i18n.t('Licenses.textYourLicenses')}</Text>
        <Text h16 regular white>0</Text>
      </View>
      </View>
      <Divider height-20 />
      <Text h12 white light>{i18n.t('Licenses.textSelectThe')}{' '}<Text white semibold>{i18n.t('Licenses.textNumberOfLicenses')}{' '}</Text>{i18n.t('Licenses.textAnd')}{' '}<Text white semibold>{i18n.t('Licenses.textTheCryptocurrency')}{' '}</Text>{i18n.t('Licenses.textWithWhichYouWant')}</Text>
      <Divider height-10 />
      <DropDownPicker
        {...typeLicenses}
        label={'Licenses'}
        options={licensesData?.getListLicenses}
        //onFill={(code)=> filterPays(code)}
       />
      <Divider height-5 />
      <DropDownPicker
        {...cryptoCurrency}
        label={'Criptocurrency'}
        options={licensesData?.cryptoCurrencies}
        //onFill={(code)=> filterPays(code)}
       />
      <Divider height-5 />
      <View flex-1  bottom>
      <ButtonRounded
        onPress={() => navigation.navigate("TransferCryptoCurrency")}
        disabled={false}
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
    </BackgroundWrapper>
  );
}


export default SelectTypeLicense;