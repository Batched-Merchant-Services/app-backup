import React, { Fragment, useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  UploadFile,
  SnackNotice,
  NavigationBar,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import i18n from '@utils/i18n';
import Loading from '../Loading';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorLicenses } from '@store/actions/licenses.actions';
import { generateAddressCryptoLicenses, getPriceCrypto } from '@store/actions/licenses.actions';
import { toggleSnackbarOpen } from '@store/actions/app.actions';
import { getFees, getTypeCurrenciesCrypto } from '../../store/actions/licenses.actions';

const TransferCryptoCurrency = ({ navigation, route }) => {
  const id = route?.params?.id;
  const currency = route?.params?.currency;
  const totalLicenses = route?.params?.typeLicenses;
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const authData = redux?.auth;
  const user = redux?.user;
  const userProfile = user?.dataUser?.clients ? user?.dataUser?.clients[0] : '';
  const accountCrypto = userProfile?.accountCrypto ? userProfile?.accountCrypto[0] : '';
  const amount = useValidatedInput('amount', '');
  const address = useValidatedInput('address', '');
  const transactionIdValue = useValidatedInput(currency === 'BTC'  ? 'transactionIdBTC' : currency === 'ETH' ? 'transactionIdETH' : 'transactionId', '');
  const file = useValidatedInput('file', '');
  const isValidId = isFormValid(amount, file);
  const isValid = isFormValid(amount, address, transactionIdValue, file);
  const [addressCurrency, setAddressCurrency] = useState(licensesData?.addressCurrency?.address);
  const [currentLicense] = useState(licensesData?.currentLicense);
  const [twoFactors, setTwoFactors] = useState(authData?.user?.isTwoFactor);
  const error = useSelector(state => state?.licenses?.showErrorLicenses);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());
      dispatch(getPriceCrypto(currency === 'BTC' ? `XBTUSD` : 'XETHZUSD'));
      dispatch(getTypeCurrenciesCrypto('LicensePurchaseFee'));
      getGenerateAddress();

    });
    return unsubscribe;
  }, []);

  function getGenerateAddress() {
    if (accountCrypto?.address === '' && currency === 'BTC' || currency === 'ETH') dispatch(generateAddressCryptoLicenses(currency));
    if (accountCrypto?.address !== '' && currency === 'BTC' || currency === 'ETH') address?.onChangeText(accountCrypto?.address ?? '')
    else address?.onChangeText(licensesData?.dataAddress?.address ?? '')

  }

  useEffect(() => {
    if (currency === 'FIAT') dispatch(getFees(licensesData?.feeCurrency));
  }, [licensesData?.feeCurrency]);

  useEffect(() => {
    if (currency === 'FIAT') amount?.onChangeText((currentLicense?.amountStep * totalLicenses?.name) + licensesData?.totalFee + ' ' + currency);
  }, [licensesData?.totalFee]);



  useEffect(() => {
    const uul = 18000 * totalLicenses?.name;
    const otherCurrency = (1 / licensesData?.priceCrypto?.bestAsks?.price) * (currentLicense?.amountStep + 15) * totalLicenses?.name;
    if (currency === 'UUL') amount?.onChangeText(uul.toString() + ' ' + currency);
    if (currency === 'BTC' || currency === 'ETH') amount?.onChangeText(otherCurrency.toString() + ' ' + currency);
  }, [licensesData?.priceCrypto]);


  useEffect(() => {
    setTwoFactors(authData?.user?.isTwoFactor || authData?.type2fa)
  }, [authData]);

  async function handleBuyLicense() {
    console.log('licensesData?.dataAddress', currentLicense)
    const typeId = currentLicense?.numberStep
    const createLicenses = {
      total: amount?.value ? parseInt(amount?.value) : amount?.value ?? 0,
      address: addressCurrency ?? '',
      currency: currency ?? '',
      type: typeId ?? 0,
      voucherCrypto: file?.value ?? null,
      transactionId: transactionIdValue?.value ?? ''
    }
    if (!twoFactors || twoFactors === 0) {
      navigation.push("Auth2fa");
    } else {
      navigation.push("ConfirmSms", { page: 'BuyLicenses', data: createLicenses })
    }

  }

  const copyToClipboard = () => {
    Clipboard.setString(licensesData?.addressCurrency?.address)
    dispatch(toggleSnackbarOpen(i18n.t('General.snackCopiedReferenceCode'), 'warning'));
  }




  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={true} navigation={navigation}>
      <NavigationBar childrenLeft navigation={navigation} />
      <Divider height-10 />
      <Text h16 regular blue02>{i18n.t('Licenses.textAcquireLicensesToIncrease')}</Text>
      <Text h16 bold blue02>{i18n.t('Licenses.textRewardPoints')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('Licenses.textMakeTheTransfer')}<Text white semibold>{i18n.t('Licenses.textOfCryptocurrenciesToTheAddress')}</Text>{i18n.t('Licenses.textShownHereAndSaveThe')}</Text>
      <Divider height-10 />
      <FloatingInput
        {...amount}
        label={i18n.t('Licenses.inputAmountRequired')}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
        editable={false}
      />
      <Divider height-10 />
        {(currency === 'BTC' || currency === 'ETH') && (
        <Fragment>
          <FloatingInput
            {...address}
            label={i18n.t('Licenses.inputAddressToTransfer')}
            editable={false}
            keyboardType={'default'}
            autoCapitalize={'none'}
          />
          <Divider height-10 />
          <FloatingInput
            {...transactionIdValue}
            label={i18n.t('Licenses.inputTransactionId')}
            keyboardType={'default'}
            autoCapitalize={'none'}
          />
          <Divider height-10 />
          <View row  >
            <ButtonRounded
              onPress={copyToClipboard}
              dark
              size='sm'
            >
              <Text h14 semibold blue02>
                {i18n.t('Licenses.buttonCopyAddress')}
              </Text>
            </ButtonRounded>
            <Divider width-10 />
            <ButtonRounded
              onPress={() => navigation.navigate("QrCodeTransaction")}
              disabled={false}
              dark
              size='sm'
            >
              <Text h14 semibold blue02>
                {i18n.t('Licenses.buttonViewQRCode')}
              </Text>
            </ButtonRounded>
          </View>
          <Divider height-20 />
          <Text h12 white>{i18n.t('Licenses.textSubmitAScreenshot')}</Text>
          <Divider height-20 />
          <UploadFile
            labelInput={i18n.t('Licenses.textFormatUpload')}
            labelButton={i18n.t('Licenses.textChooseFile')}
            {...file}
          />
        </Fragment>
      )}
      <Divider height-10 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={handleBuyLicense}
          disabled={false}
        >
          <Text h14 semibold white>
            {i18n.t('Licenses.buttonCheckTransaction')}
          </Text>
        </ButtonRounded>
        <Loading modalVisible={licensesData?.generateAddress} />
        <SnackNotice
          visible={error}
          message={licensesData?.error?.message}
          timeout={3000}
        />
      </View>
    </BackgroundWrapper>
  );
}


export default TransferCryptoCurrency;