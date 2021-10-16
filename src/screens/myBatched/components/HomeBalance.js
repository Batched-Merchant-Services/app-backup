import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewBase } from 'react-native';
import { View, Text, Divider, ImageResize, ButtonRounded } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';

import whiteWallet from '@assets/icons/white-wallet.png';
import blueReferred from '@assets/icons/blue-referred.png';
import blueRow from '@assets/icons/blue-row-double-down.png';
import Styles from '../styles';
import i18n from '@utils/i18n';

const HomeBalance = ({ navigation, step, onPress, label }) => {
  return (
    <View flex-1>
      <View height-100 blue03 paddingH-10 centerV>
        <View row>
          <View flex-1>
            <Text h12 blue02>oscargarcia@uulala.io</Text>
            <Divider height-5 />
            <Text h16 white semibold>Oscar García Lorem Ipsum</Text>
          </View>
          <View width-34 height-34 centerH centerV style={Styles.borderImages}>
            <ImageResize
              source={blueRow}
              height={verticalScale(16)}
              width={scale(14)}
            />
          </View>
        </View>
        <Divider height-8 />
        <View row>
          <View flex-1>
            <Text h12 blue02>{i18n.t('home.myBatchedBalance.textReferenceCode')}</Text>
            <Divider height-5 />
            <Text h12 semibold green>udefinode.com/cni4w7y3u</Text>
          </View>
          <View right>
            <Text h12 blue02>{i18n.t('home.myBatchedBalance.textUulalaID')}</Text>
            <Divider height-5 />
            <Text h12 white>IMCG4WHEIILNM</Text>
          </View>
        </View>
      </View>
      <Divider height-12 />
      <View flex-1 row centerH>
        <ButtonRounded

          disabled={false}
          dark
          size='sm'
        >
          <Text h10 medium blue02>
            {i18n.t('home.myBatchedBalance.buttonCopyMyReference')}
          </Text>
        </ButtonRounded>
        <Divider width-15 />
        <ButtonRounded

          disabled={false}
          success
          size='sm'
        >
          <Text h10 medium white>
            {i18n.t('home.myBatchedBalance.buttonBuyLicenses')}
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-12 />
      <Divider style={Styles.borderDoted} />
      <Divider height-15 />
      <Text h14 white>{i18n.t('home.myBatchedBalance.textMyBalances')}</Text>
      <Divider height-15 />
      <View row>
        <View flex-1 column>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textRewardPoints')}</Text>
          <Text h16 semibold>5,765,085</Text>
        </View>
        <View flex-1 column right>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textMyLicenses')}</Text>
          <Text h16 semibold>03</Text>
        </View>
      </View>
      <Divider height-10 />
      <View row>
        <View flex-1 column>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textCommissionBalance')}</Text>
          <Text h16 semibold>123,456</Text>
        </View>
        <View flex-1 column right>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textMyReferred')}</Text>
          <Text h16 semibold>12</Text>
        </View>
      </View>
      <Divider height-15 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textRewardPointsCan')}</Text>
      <Divider height-5 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textCommissionBalanceCan')}</Text>
      <Divider height-15 />
      <View row centerV>
        <View flex-1 style={Styles.borderDoted} />
        <Divider width-5 />
        <ImageResize
          source={blueRow}
          height={verticalScale(16)}
          width={scale(16)}
        />
        <Divider width-5 />
        <View flex-1 style={Styles.borderDoted} />
      </View>
      <Divider height-15 />
      <View row>
        <View flex-1 column>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textInTransactionGateway')}</Text>
          <Text h16 semibold2>100,000</Text>
        </View>
        <View flex-1 column right>
          <Text h12 blue02>{i18n.t('home.myBatchedBalance.textExecutedPoints')}</Text>
          <Text h16 semibold>30,000</Text>
        </View>
      </View>
      <Divider height-10 />
      <View flex-1>
        <Text h12 blue02>{i18n.t('home.myBatchedBalance.textLiquidityPool')}</Text>
        <Text h16 semibold>$1,236.00 USD</Text>
      </View>
      <Divider height-15 />
      <Text h10 white>{i18n.t('home.myBatchedBalance.textLiquidityPoolBalance')}</Text>
      <Divider height-20 />
      <ButtonRounded
        onPress={() => navigation.navigate('SignIn', { screen: 'TransferOption' })}
        //onPress={() => navigation.navigate("TransferOption")}
        disabled={false}
        blue
      >
        <Text h14 semibold white>
          {i18n.t('home.myBatchedBalance.buttonTransfers')}
        </Text>
      </ButtonRounded>
    </View>
  );
};

export default HomeBalance;
