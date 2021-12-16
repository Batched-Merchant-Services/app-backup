import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewBase } from 'react-native';
import { View, Text, Divider, ImageResize, ButtonRounded, DropDownPicker } from '@components';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import whiteWallet from '@assets/icons/white-wallet.png';
import blueReferred from '@assets/icons/blue-referred.png';
import blueRow from '@assets/icons/blue-row-double-down.png';
import EmptyState from '../EmptyState';
import Styles from './styles';
import i18n from '@utils/i18n';
import { convertUtc, formatDate, formatDateGMT, formatDateSend, getLocalDateFromUTC } from '../../utils/formatters';

const Referred = ({ navigation, step, onPress, label }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile? dataUser?.dataUser?.usersProfile[0]:''
  const accounts = userProfile?.accounts
  const dateSelect =useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const levelSelect =useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const [showData, setShowData] = useState(false);
  const [dataInfo, setDataInfo] = useState([]);

  useEffect(() => {
    if (dataUser?.dataUser?.licensesReferences) 
      if (dataUser?.dataUser?.licensesReferences.length > 0) {
        setShowData(true);
        setDataInfo(dataUser?.dataUser?.licensesReferences);
      }
      else setShowData(false);

  }, []);


  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const orderByDate=()=>{
    const sortedActivities = dataInfo.slice().sort((a, b) => b.referenceDate - a.referenceDate)
    setDataInfo(sortedActivities);
  }
  const orderByLevel=()=>{
    const sortedActivities = dataInfo.slice().sort((a, b) => b.level - a.level)
    setDataInfo(sortedActivities);
  }

  console.log('dataUser',dataUser);

  return (
    <View flex-1>
      <View row>
        <View flex-1>
          <Text h14 blue02 light>{i18n.t('home.referred.textMyReferrenceCode')}</Text>
          <Text h13 green semibold>{accounts?.id}</Text>
        </View>
        <View>
          <ButtonRounded
            disabled={false}
            green
          >
            <Text h11 semibold white>
              {i18n.t('home.referred.buttonCopyCode')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
      {!showData && (
        <EmptyState />
      )}

      {showData && (
        <>
          <Divider height-25 />
          <View row>
            <View centerV>
              <Text h12 regular white>{i18n.t('home.referred.textMyReferredUsers')}</Text>
            </View>
            <Divider width-10 />
            <View flex-1>
              <ButtonRounded
                onPress={orderByDate}
                disabled={false}
                dark
              >
                <View row>
                  <>
                    <Text h14 light blue02>
                      {i18n.t('home.referred.dropDownDate')}
                    </Text>
                    <Divider width-10 />
                    <Text blue02 h14>▼</Text>
                  </>
                </View>
              </ButtonRounded>
            </View>
            <Divider width-10 />
            <View flex-1>
              <ButtonRounded
              onPress={orderByLevel}
                disabled={false}
                dark
              >
                <View row>
                  <>
                    <Text h14 light blue02>
                      {i18n.t('home.referred.dropDownLevel')}
                    </Text>
                    <Divider width-10 />
                    <Text blue02 h14>▼</Text>
                  </>
                </View>
              </ButtonRounded>
            </View>
          </View>
          <Divider height-10 />
          <Divider style={Styles.borderDoted} />
          <Divider height-10 />
          {dataInfo.length ? (
            dataInfo.map((data) => (
            <View style={Styles.borderViewDoted} padding-15 marginB-10>
            <View row>
              <View flex-1 >
                <Text h12 light blue02>{i18n.t('General.textUulalaId')} {data?.uuid}</Text>
                <Text h12 semibold>{data?.name}</Text>
              </View>
              {data?.avatarImage !== '' && (
                <View width-35 height-34 centerH centerV style={Styles.borderImages}>
                  <ImageResize
                    source={{uri:data?.avatarImage}}
                    height={verticalScale(32)}
                    width={verticalScale(30)}
                  />
                </View>
              )}
              {data?.avatarImage === '' && (
                <View width-35 height-34 centerH centerV style={{ backgroundColor: generateColor() }}>
                  <Text h16 white bold></Text>
                </View>
              )}
            </View>
            <Divider height-10 />
            <View row >
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textLevel')}</Text>
                <Text h12 white regular>{data?.level}</Text>
              </View>
              <View marginH-15>
                <Text h12 blue02 light>{i18n.t('home.referred.textIncome')}</Text>
                <Text h12 white regular>{data?.percentageReferrer}</Text>
              </View>
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textReferred')}</Text>
                <Text h12 white regular>{formatDate(data?.referenceDate)}</Text>
              </View>
            </View>
          </View>
            ))
          ) : (
            null
          )}
        </>
      )}
    </View>
  );
};

export default Referred;
