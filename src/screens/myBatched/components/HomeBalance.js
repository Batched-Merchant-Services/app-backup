import React from 'react';

import { Clipboard } from 'react-native'
import { View, Text, Divider, ImageResize, ButtonRounded } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import blueRow from '@assets/icons/blue-row-double-down.png';
import Styles from '../styles';
import i18n from '@utils/i18n';

const HomeBalance = ({ navigation, step, onPress, label }) => {
  const redux = useSelector(state => state);
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile[0]
  const accounts = userProfile?.accounts
  console.log('dataUser',dataUser);

  const copyToClipboard = () => {
    Clipboard.setString(accounts?.id)
  }


  return (
    <View flex-1>
      <View height-100 blue03 paddingH-10 centerV>
        <View row>
          <View flex-1>
            <Text h12 blue02>{accounts?.email}</Text>
            <Divider height-5 />
            <Text h16 white semibold>{accounts?.firstName}{' '}{accounts?.middleName}{' '}{accounts?.lastName}</Text>
          </View>
          <View width-38 height-36 centerH centerV style={Styles.borderImages}>
            {accounts?.avatarImage&&(
              <ImageResize
              source={{uri:accounts?.avatarImage}}
              height={'100%'}
              width={'100%'}
            />
            )}
            {!accounts?.avatarImage&&(
             <Text h20 semibold>{accounts?.alias}</Text>
            )}
          </View>
        </View>
        <Divider height-8 />
        <View row>
          {/* <View flex-1>
            <Text h12 blue02>{i18n.t('home.myBatchedBalance.textReferenceCode')}</Text>
            <Divider height-5 />
            <Text h12 semibold green>udefinode.com/cni4w7y3u</Text>
          </View> */}
          <View >
            <Text h12 blue02>{i18n.t('home.myBatchedBalance.textUulalaID')}</Text>
            <Divider height-5 />
            <Text h12 white semibold>{accounts?.id}</Text>
          </View>
        </View>
      </View>
      <Divider height-12 />
      <View flex-1 row centerH>
        <ButtonRounded
          onPress={() => copyToClipboard}
          disabled={false}
          dark
          size='sm'
        >
          <Text h10 medium blue02>
            {i18n.t('home.myBatchedBalance.buttonCopyMyReference')}
          </Text>
        </ButtonRounded>
        <Divider width-8 />
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
