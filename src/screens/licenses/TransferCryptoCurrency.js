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

import { validateReference } from '@store/actions/licenses.actions';
import Loading from '../Loading';
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorLicenses } from '@store/actions/licenses.actions';
import { createLicense, getAddressCurrency } from '../../store/actions/licenses.actions';

const TransferCryptoCurrency = ({ navigation, route }) => {
  const id = route?.params?.id;
  const currency = route?.params?.currency;
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const licensesData = redux?.licenses;
  const amount = useValidatedInput('amount', '');
  const address = useValidatedInput('address', licensesData?.addressCurrency?.address);
  const transactionIdValue = useValidatedInput(id === 1 ? 'transactionId' : id === 2 ? 'transactionIdETH' : 'transactionId', '');
  const file = useValidatedInput('file', '');
  const isValidId = isFormValid(amount, file);
  const isValid = isFormValid(amount, address, transactionIdValue, file);
  const error = useSelector(state => state?.licenses?.showErrorLicenses);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorLicenses());
      dispatch(toggleSnackbarClose());
      dispatch(getAddressCurrency(id))
    });
    return unsubscribe;
  }, []);


  async function handleBuyLicense() {

    const typeId = licensesData?.getLicenses?.id
    const createLicenses = {
      total: parseInt(amount?.value) ?? 0,
      address: address?.value ?? '',
      currency: currency ?? '',
      type: typeId ?? 0,
      voucherCrypto: file?.value ?? '',
      transactionId: transactionIdValue?.value ?? ''
    }
    dispatch(createLicense({ createLicenses }));
  }

  const copyToClipboard = () => {
    Clipboard.setString(licensesData?.addressCurrency?.address)
  }

  if (licensesData?.successCreateLicense) {
    navigation.navigate("ConfirmationLicenses")
  }

  console.log('licensesData?.addressCurrency?.address', licensesData?.addressCurrency?.address)

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
      />
      <Divider height-10 />
      {id !== 'undefined' && (
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
        </Fragment>
      )}
      <View row  >
        <ButtonRounded
          onPress={() => copyToClipboard}
          disabled={false}
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
      <Divider height-10 />
      <ButtonRounded
        onPress={handleBuyLicense}
        disabled={id ? !isValid : !isValidId}
      >
        <Text h14 semibold white>
          {i18n.t('Licenses.buttonCheckTransaction')}
        </Text>
      </ButtonRounded>
      <Loading modalVisible={licensesData?.isLoadingLicenses} />
      <View flex-1 bottom>
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