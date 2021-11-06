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
import i18n from '@utils/i18n';

const TransferCryptoCurrency = ({ navigation }) => {
  const redux = useSelector(state => state);
  const referenceCode = useValidatedInput('referenceCode', '');




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
        {...referenceCode}
        label={i18n.t('Licenses.inputAmountRequired')}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
      />
      <Divider height-10 />
      <FloatingInput
        {...referenceCode}
        label={i18n.t('Licenses.inputAddressToTransfer')}
        keyboardType={'default'}
        autoCapitalize={'none'}
      />
      <Divider height-10 />
      <View row  >
        <ButtonRounded
          onPress={() => goBack()}
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
          onPress={() => navigation.navigate("TermConditions")}
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
      <Divider height-10 />
      <UploadFile 
        labelInput={i18n.t('Licenses.textFormatUpload')}
        labelButton={i18n.t('Licenses.textChooseFile')}/>
      <Divider height-10 />
      <ButtonRounded
        onPress={() => navigation.navigate("QrCodeTransaction")}
        disabled={false}
      >
        <Text h14 semibold white>
          {i18n.t('Licenses.buttonCheckTransaction')}
        </Text>
      </ButtonRounded>
    </BackgroundWrapper>
  );
}


export default TransferCryptoCurrency;