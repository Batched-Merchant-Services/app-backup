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
import { thousandsSeparator } from '../../utils/formatters';
import IconLineDotted from '../../assets/iconSVG/IconLineDotted';
import { verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

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
  const accountCrypto = userProfile?.accountCrypto?.length > 0 ? userProfile?.accountCrypto : [];
  const accountCryptoData = accountCrypto?.length > 0 ? userProfile?.accountCrypto[0] : [];
  const brandTheme = user?.Theme?.colors;
  const amount = useValidatedInput('amount', '');
  const address = useValidatedInput('address', '');
  const transactionIdValue = useValidatedInput(currency === 'BTC' ? 'transactionIdBTC' : currency === 'ETH' ? 'transactionIdETH' : 'transactionId', '');
  const file = useValidatedInput('file', '');
  const isValidId = isFormValid(amount);
  const isValid = isFormValid(amount, address, transactionIdValue, file);
  const [valueLicenses, setValueLicenses] = useState('');
  const [showGenerateAddress, setShowGenerateAddress] = useState(false);
  const [validateButton, setValidateButton] = useState(true);
  const [currentLicense] = useState(licensesData?.currentLicense);
  const [twoFactors, setTwoFactors] = useState(authData?.user?.isTwoFactor);
  const error = useSelector(state => state?.licenses?.showErrorLicenses);
  const { colors } = useTheme();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());
      dispatch(getPriceCrypto(currency === 'BTC' ? `XBTUSD` : 'XETHZUSD'));
      dispatch(getTypeCurrenciesCrypto('LicensePurchaseFee'));
      getStatusAddress();
    });
    return unsubscribe;
  }, []);


  function getStatusAddress() {
    if (accountCrypto?.length > 0) {
      if (accountCryptoData?.address !== '') {
        getAddressCrypto();
        setShowGenerateAddress(false);
      }
    } else {
      if (licensesData?.dataAddress !== null) {
        if (licensesData?.dataAddress?.address !== '' || licensesData?.dataAddress?.address !== undefined) {
          address?.onChangeText(licensesData?.dataAddress?.address ?? '')
          setShowGenerateAddress(false);
        } else {
          setShowGenerateAddress(true);
        }
      } else {
        setShowGenerateAddress(true);
      }
    }
    if (currency === 'UUL') setValidateButton(userProfile?.account?.balanceTokens?.total === 0 ? true : false)
    if (currency === 'FIAT') setValidateButton(userProfile?.account?.balance?.total === 0 ? true : false)
  }

  function getAddressCrypto() {
    if (accountCryptoData?.address !== '' && currency === 'BTC' || currency === 'ETH') address?.onChangeText(accountCryptoData?.address)
    else address?.onChangeText(licensesData?.dataAddress?.address ?? '')
    setShowGenerateAddress(false);
  }

  function getGenerateAddress() {
    if (accountCrypto?.length === 0) {
      if (currency === 'BTC' || currency === 'ETH') dispatch(generateAddressCryptoLicenses(currency));
      setShowGenerateAddress(false);
    } else {
      setShowGenerateAddress(true);
    }
  }

  useEffect(() => {
    if (currency === 'FIAT') dispatch(getFees(licensesData?.feeCurrency));
  }, [licensesData?.feeCurrency]);


  useEffect(() => {
    if (currency === 'FIAT') amount?.onChangeText((currentLicense?.amountStep * totalLicenses?.name) + licensesData?.totalFee + ' ' + 'USD');
  }, [licensesData?.totalFee]);


  useEffect(() => {
    console.log('licensesData?.dataAddress',licensesData?.successGenerateAddress)
    if (licensesData?.successGenerateAddress) {
      if (licensesData?.dataAddress?.address !== '' || licensesData?.dataAddress?.address !== undefined) { } setShowGenerateAddress(false);
      address?.onChangeText(licensesData?.dataAddress?.address ?? '')
    }else{
      console.log()
      setShowGenerateAddress(true);
    }
  }, [licensesData?.dataAddress]);



  useEffect(() => {
    const uul = 18000 * totalLicenses?.name;
    const otherCurrency = (1 / licensesData?.priceCrypto?.bestAsks?.price) * (currentLicense?.amountStep + 15) * totalLicenses?.name;
    setValueLicenses(currency === 'UUL' ? uul : currency === 'BTC' || currency === 'ETH' ? otherCurrency : (currentLicense?.amountStep * totalLicenses?.name) + licensesData?.totalFee);
    if (currency === 'UUL') amount?.onChangeText(uul.toString() + ' ' + currency);
    if (currency === 'BTC' || currency === 'ETH') amount?.onChangeText(otherCurrency.toString() + ' ' + currency);
  }, [licensesData?.priceCrypto]);


  useEffect(() => {
    setTwoFactors(authData?.user?.isTwoFactor || authData?.type2fa)
  }, [authData]);

  async function handleBuyLicense() {
    const typeId = currentLicense?.typeLicenses
    const createLicenses = {
      total: totalLicenses?.name,
      address: currency === 'UUL' ? userProfile?.account?.address : currency !== 'FIAT' ? address?.value : '',
      currency: currency ?? '',
      type: typeId ?? 0,
      voucherCrypto: file?.value ?? null,
      transactionId: transactionIdValue?.value ?? '',
      isDisabled: false
    }
    if (!twoFactors || twoFactors === 0) {
      navigation.push("Auth2fa");
    } else {
      navigation.push("ConfirmSms", { page: 'BuyLicenses', data: createLicenses })
    }
  }

  const copyToClipboard = () => {
    Clipboard.setString(licensesData?.addressCurrency?.address || accountCryptoData?.address)
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
      {(currency === 'UUL' || currency === 'FIAT') && (
        <Fragment>
          <View row>
            <View>
              <Text h13 light white>{i18n.t('Licenses.textCheckout')}</Text>
            </View>
            <View flex-1 right>
              <Text h13 semibold white>{currency}</Text>
            </View>
          </View>
          <Divider height-20 />
          <View height-1 width-35 white />
          <Divider height-20 />
          <View row>
            <View>
              <Text h12 light white>{i18n.t('Licenses.textYourWalletBalance')}</Text>
            </View>
            {currency === 'UUL' && (
              <View flex-1 right>
                <Text h16 semibold style={{ color: userProfile?.account?.balanceTokens?.total === 0 ? colors.error : colors.blue02 }}>{thousandsSeparator(userProfile?.account?.balanceTokens?.total)}</Text>
              </View>
            )}
            {currency === 'FIAT' && (
              <View flex-1 right>
                <Text h16 semibold style={{ color: userProfile?.account?.balance?.total === 0 ? colors.error : colors.blue02 }}>{thousandsSeparator(userProfile?.account?.balance?.total) + ' ' + 'USD'}</Text>
              </View>
            )}

          </View>
          <Divider height-20 />
          <View row>
            <View >
              <Text h12 light white>{i18n.t('Licenses.textLicenses')}</Text>
            </View>
            {currency === 'UUL' && (
              <View flex-1 right>
                <Text h16 semibold white>{valueLicenses}</Text>
              </View>
            )}
            {currency === 'FIAT' && (
              <View flex-1 right>
                <Text h16 semibold white>{valueLicenses - licensesData?.totalFee + ' ' + 'USD'}</Text>
              </View>
            )}
          </View>
          <Divider height-20 />
          <View row>
            <View>
              <Text h12 light white>{i18n.t('Licenses.textTransactionFees')}</Text>
            </View>
            {currency === 'UUL' && (
              <View flex-1 right>
                <Text h16 semibold white>{thousandsSeparator(0)}</Text>
              </View>
            )}
            {currency === 'FIAT' && (
              <View flex-1 right>
                <Text h16 semibold white>{thousandsSeparator(licensesData?.totalFee) + ' ' + 'USD'}</Text>
              </View>
            )}

          </View>
          <Divider height-20 />
          <IconLineDotted height={verticalScale(1)} width={'100%'} fill={brandTheme?.blue04 ?? colors.blue04} />
          <Divider height-20 />
          <View row>
            <View>
              <Text h12 light white>{i18n.t('Licenses.textRemanentBalance')}</Text>
            </View>
            <View flex-1 right>
              <Text h16 semibold white>{amount?.value}</Text>
            </View>
          </View>
          <Divider height-15 />
        </Fragment>
      )}


      {(currency === 'BTC' || currency === 'ETH') && (
        <Fragment>
          {showGenerateAddress && (
            <View>
              <ButtonRounded
                onPress={getGenerateAddress}
                blue
              >
                <Text h14 semibold white>
                  {i18n.t('Licenses.textGenerateAddress')}
                </Text>
              </ButtonRounded>
              <Divider height-15 />
            </View>
          )}
          {!showGenerateAddress && (
            <FloatingInput
              {...address}
              label={i18n.t('Licenses.inputAddressToTransfer')}
              editable={false}
              keyboardType={'default'}
              autoCapitalize={'none'}
            />
          )}
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
          disabled={currency === 'BTC' || currency === 'ETH' ? !isValid : validateButton}
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