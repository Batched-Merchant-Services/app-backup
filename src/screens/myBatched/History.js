import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Divider, ButtonRounded, DropDownPicker, SnackNotice, Link } from '@components';
import { Animated } from "react-native";
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../EmptyState';
import i18n from '@utils/i18n';
import { formatDateSend, moneyFormatter } from '../../utils/formatters';
import { pointsConstants } from '../../store/constants';
import { getExecutedPointsTransactions } from '../../store/actions/points.actions';
import { cleanHistoryPagination, saveHistoryPagination, toggleSnackbarClose } from '../../store/actions/app.actions';
import { useTheme } from '@react-navigation/native';
import Loading from '../Loading';
import { verticalScale } from 'react-native-size-matters';

const DataHistory = (dataHistory) => {
  if (dataHistory?.dataHistory) {
    return (dataHistory?.dataHistory?.map((i, index) => {
      return (
        <>
          <View key={i.id} row >
            <View flex-1><Text h10 blue02 white center>{formatDateSend(i.createdDate)}</Text></View>
            <View flex-1><Text h10 blue02 white center>{moneyFormatter(i?.amount)}</Text></View>
            <View flex-1><Text h10 blue02 white center>{i?.transactionId || i?.note?.transactionId}</Text></View>
            <View flex-1><Text h10 blue02 white center>{i?.description || i?.note?.noteDescription}</Text></View>
          </View>
        </>
      );
    }));
  } else return null;

};

const History = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const infoUser = redux?.user;
  const dataHistoryArray = redux?.app?.dataHistorySave;
  const brandTheme = infoUser?.Theme?.colors;
  const userProfile = infoUser?.dataUser?.usersProfile ? infoUser?.dataUser?.usersProfile[0] : '';
  const points = redux?.points;
  const kindOfData = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const month = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const year = useValidatedInput('select', '', {
    changeHandlerSelect: 'onSelect'
  });
  const [showData, setShowData] = useState(true);
  const [showLastMovement, setShowLastMovement] = useState(true);
  const [showDowland, setShowDowland] = useState(false);
  const [dataHistory, setDataHistory] = useState(infoUser?.dataUser?.bachedTransaction?.length > 0?infoUser?.dataUser?.bachedTransaction:[]);
  const [showFilter, setShowFilter] = useState(false);
  const [valuePool, setValuePool] = useState(0);
  const [newArray, setNewArray] = useState([]);
  const [showNewPagination, setShowNewPagination] = useState(false);
  const [sendPdf, setSendPdf] = useState(true);
  const [monthSelect, setMonthSelect] = useState('');
  const [yearSelect, setYearSelect] = useState('');
  const [offset, setOffset] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const [data] = useState([
    { id: '1', name: 'Old transactions', value: pointsConstants.POOLS.TOKENS },
    { id: '2', name: 'Commission transactions', value: pointsConstants.POOLS.COMMISSION },
    { id: '3', name: 'Reward points transactions', value: pointsConstants.POOLS.REWARDS },
    { id: '4', name: 'Liquidity points transactions', value: pointsConstants.POOLS.LIQUIDITY },
    { id: '5', name: 'Gateway points transactions', value: pointsConstants.POOLS.GATEWAY },
    { id: '6', name: 'Buy transactions', value: 6 }
  ]);
  const fadeDownlands = useRef(new Animated.Value(0)).current;
  const fadeMoves = useRef(new Animated.Value(0)).current;

  const { colors } = useTheme();
  const isValid = isFormValid(kindOfData);



  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeDownlands, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeMoves, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    dispatch(cleanHistoryPagination());
    dispatch(toggleSnackbarClose());
    someFetchActionCreator();
  }, []);



  const someFetchActionCreator = () => {
    const commissions = pointsConstants.POOLS.COMMISSION;
    const id = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.id : 0;
    dispatch(getExecutedPointsTransactions({ id, pool: commissions, offset }));

  }

  useEffect(() => {
    fadeOut();
  }, []);



  useEffect(() => {
    var arrayBuy = [];
    var newArrayExecute = [];
    if (infoUser?.dataUser?.bachedTransaction) {
      if (infoUser?.dataUser?.bachedTransaction?.length > 0) {
        if (points?.executeDataCommission?.length > 0 || points?.executeData?.length > 0) {
          arrayBuy.push(...infoUser?.dataUser?.bachedTransaction);
          if (points?.executeDataCommission?.length > 0) {
            const newBuy = [...arrayBuy, ...points?.executeDataCommission];
            setDataHistory(newBuy);
            if (points?.executeDataCommission?.length < 9) setShowMore(false)
            else setShowMore(true)
          }
          if (points?.executeData?.length > 0) {
            newArrayExecute?.push(...points?.executeData, ...dataHistory)
          }
          setShowData(true);
        }
      }
    }

    if (showNewPagination && points?.executeData?.length > 0) {
      dispatch(saveHistoryPagination({ data: points?.executeData, page: offset }));
      const newData = [...newArrayExecute];
      const sort = newData.sort((a, b) => a?.id?.toString()?.localeCompare(b.id?.toString()));
      const filter = sort.filter(function (item, pos) {
        return sort.indexOf(item) == pos;
      })
      setShowMore(true)
      setDataHistory(filter);
    }
  }, [points?.executeData, showNewPagination, points?.executeDataCommission]);



  useEffect(() => {
    if (showFilter) {
      if (points?.executeData) {
        if (points?.executeData?.length > 0) {
          if (points?.executeData?.length < 9) setShowMore(false)
          else setShowMore(true)
          const newData = [...points?.executeData]
          setDataHistory(newData);
          setShowData(true);
        } else {
          setDataHistory(dataHistory);
          setShowData(false);
          setShowMore(false)
        }
      }
    }
  }, [points?.executeData, showFilter]);

  const [months] = useState([
    { id: '1', name: i18n.t('General.months.january'), value: '01' },
    { id: '2', name: i18n.t('General.months.february'), value: '02' },
    { id: '3', name: i18n.t('General.months.march'), value: '03' },
    { id: '4', name: i18n.t('General.months.april'), value: '04' },
    { id: '5', name: i18n.t('General.months.may'), value: '05' },
    { id: '6', name: i18n.t('General.months.june'), value: '06' },
    { id: '7', name: i18n.t('General.months.july'), value: '07' },
    { id: '8', name: i18n.t('General.months.august'), value: '08' },
    { id: '9', name: i18n.t('General.months.september'), value: '09' },
    { id: '10', name: i18n.t('General.months.october'), value: '10' },
    { id: '11', name: i18n.t('General.months.november'), value: '11' },
    { id: '12', name: i18n.t('General.months.december'), value: '12' }
  ]);
  const [years] = useState([
    { id: '01', name: '2021', value: '2021' },
    { id: '02', name: '2022', value: '2022' },
    { id: '03', name: '2023', value: '2023' },
    { id: '04', name: '2024', value: '2024' },
    { id: '05', name: '2025', value: '2025' },
    { id: '06', name: '2026', value: '2026' },
    { id: '07', name: '2027', value: '2027' },
    { id: '08', name: '2028', value: '2028' },
    { id: '09', name: '2029', value: '2029' },
    { id: '10', name: '2030', value: '2030' },
    { id: '11', name: '2031', value: '2031' }
  ]);

  function showMovements() {
    fadeOut();
    setShowLastMovement(true);
    setShowDowland(false);
  }

  function showDownlands() {
    fadeIn();
    setShowLastMovement(false);
    setShowDowland(true);
  }

  async function filterPays(value) {
    setSendPdf(value === undefined ? true : false);
    const id = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.id : 0;
    const pool = value?.value ?? 0;
    setValuePool(pool);
    if (pool === 6) {
      setDataHistory(infoUser?.dataUser?.bachedTransaction);
      setShowData(true);
      setShowFilter(false);
    } else {
      const offSet = 1
      setOffset(offSet);
      dispatch(getExecutedPointsTransactions({ id, pool: pool, offset: offSet }));
      setShowFilter(true);
    }
  }

  const pagination = () => {
    const id = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.id : 0;
    setOffset((offset) => offset + 1);
    setShowFilter(false);
    const offSet = offset + 1
    dispatch(getExecutedPointsTransactions({ id, pool: valuePool, offset: offSet }));
    setShowNewPagination(true);
  }

  function monthFilter(month) {
    setMonthSelect(month?.value)
  }

  function yearFilter(year) {
    setYearSelect(year?.value)
  }


  function sendReport() {
    const events = dataHistory?.filter(e => {
      const date = new Date(e?.createdDate);
      const year = date.getFullYear();
      const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
      const ls = month === monthSelect;
      const lsyear = year.toString() === yearSelect;
      return ls && lsyear;

    });
  }

  return (
    <View flex-1>
      <Text h14 white regular>{i18n.t('home.history.textRegisterOfMovements')}</Text>
      <Divider height-15 />
      <View row padding-2 style={{ borderColor: brandTheme?.blue02 ?? colors.blue02, borderWidth: 1 }}>
        <View flex-1>
          <ButtonRounded
            style={{ borderWidth: 0, borderRadius: 0, height: verticalScale(34) }}
            disabled={false}
            changeColor={showLastMovement ? 'blue' : 'dark'}
            onPress={showMovements}
          >
            <Text h11 semibold white>
              {i18n.t('home.history.buttonLastMovements')}
            </Text>
          </ButtonRounded>
        </View>
        <View flex-1>
          <ButtonRounded
            style={{ borderWidth: 0, borderRadius: 0, height: verticalScale(34) }}
            onPress={showDownlands}
            disabled={false}
            changeColor={showDowland ? 'blue' : 'dark'}
          >
            <Text h11 semibold white>
              {i18n.t('home.history.buttonDownloadReport')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
      <Divider height-15 />
      <DropDownPicker
        {...kindOfData}
        label={i18n.t('home.history.dropDownKindOfData')}
        options={data}
        onSelect={(code) => filterPays(code)}
      />
      {!showData && !showDowland && (
        <EmptyState />
      )}
      {showLastMovement && showData && (
        <Animated.View
          style={[
            {
              // Bind opacity to animated value
              opacity: fadeMoves
            }
          ]}>
          <View row>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textDate/Hour')}</Text></View>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textRPAmount')}</Text></View>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textTransactionID')}</Text></View>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textDescription')}</Text></View>
          </View>
          <DataHistory dataHistory={dataHistory} />
          <Divider height-10 />
          {points?.executeData?.length > 0 && (
            showMore && (
              <Link onPress={pagination}>
                <Text h12 white>{i18n.t('home.history.linkShowMore')}</Text>
              </Link>
            )
          )}
        </Animated.View>
      )}
      {showDowland && (
        <Animated.View
          style={[
            {
              // Bind opacity to animated value
              opacity: fadeDownlands
            }
          ]}
        >
          <View>
            <Text h12 white light>{i18n.t('home.history.textSelectTheKindOf')}</Text>
            <Divider height-15 />
            <View row flex-1>
              <View width-130>
                <DropDownPicker
                  {...month}
                  label={i18n.t('home.history.dropDownMonth')}
                  options={months}
                  onSelect={(code) => monthFilter(code)}
                />
              </View>
              <Divider width-10 />
              <View width-130>
                <DropDownPicker
                  {...year}
                  label={i18n.t('home.history.dropDownYear')}
                  options={years}
                  onSelect={(code) => yearFilter(code)}
                />
              </View>
            </View>
            <Divider height-10 />
            <View bottom>
              <ButtonRounded
                onPress={sendReport}
                disabled={sendPdf}
                blue
              >
                <Text h14 semibold white>
                  {i18n.t('home.history.buttonDownloadPDF')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default History;
