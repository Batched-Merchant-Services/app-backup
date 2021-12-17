import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Divider, ButtonRounded, DropDownPicker, SnackNotice, Link } from '@components';
import { useValidatedInput } from '@hooks/validation-hooks';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../EmptyState';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import { formatDate, getLocalDateFromUTC, moneyFormatter } from '../../utils/formatters';
import { pointsConstants } from '../../store/constants';
import { cleanErrorPoints, getExecutedPointsTransactions } from '../../store/actions/points.actions';
import { useIsFocused } from "@react-navigation/native";
import { toggleSnackbarClose } from '../../store/actions/app.actions';
import Loading from '../Loading';

const DataHistory = (dataHistory) => {
  if (dataHistory?.dataHistory) {
    console.log('dataHistory',dataHistory)
    return (dataHistory?.dataHistory?.map((i, index) => {
      return (
        <>
          <View key={i.id} row height-28>
            <View flex-1><Text h10 blue02 white center>{formatDate(i.createdDate)}</Text></View>
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
  const [showData, setShowData] = useState(false);
  const [showLastMovement, setShowLastMovement] = useState(true);
  const [showDowland, setShowDowland] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [valuePool, setValuePool] = useState(0);
  const [newArray, setNewArray] = useState([]);
  const [showNewPagination, setShowNewPagination] = useState(false);
  const [offset, setOffset] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const [data] = useState([
    { id: '1', name: 'Old transactions', value: pointsConstants.POOLS.TOKENS },
    { id: '2', name: 'Commission transactions', value: pointsConstants.POOLS.COMMISSION },
    { id: '3', name: 'reward points transactions', value: pointsConstants.POOLS.REWARDS },
    { id: '4', name: 'Liquidity points transactions', value: pointsConstants.POOLS.LIQUIDITY },
    { id: '5', name: 'Gateway points transactions', value: pointsConstants.POOLS.GATEWAY },
    { id: '6', name: 'Buy transactions', value: 6 }
  ]);



  useEffect(() => {
    dispatch(cleanErrorPoints());
    dispatch(toggleSnackbarClose());
    someFetchActionCreator();
  }, []);



  const someFetchActionCreator = () => {
    const tokens = pointsConstants.POOLS.TOKENS;
    const commissions = pointsConstants.POOLS.COMMISSION;
    const rewards = pointsConstants.POOLS.REWARDS;
    const liquidity = pointsConstants.POOLS.LIQUIDITY;
    const gateway = pointsConstants.POOLS.GATEWAY;
    const id = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.id : 0;
    dispatch(getExecutedPointsTransactions({ id, pool: tokens, offset }));
    dispatch(getExecutedPointsTransactions({ id, pool: commissions, offset }));
    dispatch(getExecutedPointsTransactions({ id, pool: rewards, offset }));
    dispatch(getExecutedPointsTransactions({ id, pool: liquidity, offset }));
    dispatch(getExecutedPointsTransactions({ id, pool: gateway, offset }));

    //getTransactionsPoints();
  }


  useEffect(() => {
    var arrayTransactions = [];
    if (infoUser?.dataUser?.bachedTransaction) {
      if (infoUser?.dataUser?.bachedTransaction?.length > 0) {
        arrayTransactions.push(...infoUser?.dataUser?.bachedTransaction);
        if (points?.executeData.length > 0 ) {
          console.log('true poinst 1')
          arrayTransactions.push(...points?.executeData)
          setDataHistory(arrayTransactions);
          setShowMore(true)
        }else{
          console.log('false poinst 1')

          setDataHistory(dataHistory);
        }
        if (points?.executeData.length > 0 ) {
          setNewArray(points?.executeData)
          console.log('true new array')
        }
        setShowData(true);
      }
    }
   
    if (showNewPagination  && points?.executeData.length > 0 ) {
      const newData = [...points?.executeData,...newArray];
      console.log('newData',newData.length)
      //setShowMore(false)
      setDataHistory(newData);
    }
  }, [points?.executeData,showNewPagination]);


  useEffect(() => {
  
    if (showFilter) {
      if (points?.executeData) {
        if (points?.executeData.length > 0) {
          console.log(' true newArray filter',newArray)
          const newData = [...points?.executeData]
          setDataHistory(newData);
          setShowData(true);
        } else {
          setDataHistory(dataHistory);
          setShowData(false);
        }
      }
    }
  }, [points?.executeData, showFilter]);

  



  const [months, setMonths] = useState([
    { id: '1', name: 'January', value: 'January' },
    { id: '2', name: 'January', value: 'January' },
    { id: '3', name: 'January', value: 'January' }
  ]);
  const [years, setYears] = useState([
    { id: '1', name: '2023', value: '2023' },
    { id: '2', name: '2024', value: '2024' },
    { id: '3', name: '2025', value: '2025' }
  ]);

  function showMovements() {
    setShowLastMovement(true);
    setShowDowland(false);
  }

  function showDownlands() {
    setShowLastMovement(false);
    setShowDowland(true);
  }

  async function filterPays(value) {
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
      dispatch(getExecutedPointsTransactions({ id, pool: pool, offset:offSet }));
      setShowFilter(true);
    }
  }

  const pagination = () => {
    console.log('offset',offset);
    const id = infoUser?.dataUser?.clients ? infoUser?.dataUser?.clients[0]?.account?.id : 0;
    setOffset((offset) => offset + 1);
    setShowFilter(false);
    const offSet = offset + 1
    dispatch(getExecutedPointsTransactions({ id, pool: valuePool, offset: offSet }));
    setShowNewPagination(true);
    if (showNewPagination  && points?.executeData.length > 0 ) {
        setShowMore(false)
    }
  }


  return (
    <View flex-1>
      <Text h14 white regular>{i18n.t('home.history.textRegisterOfMovements')}</Text>
      <View row >
        <View flex-1>
          <ButtonRounded
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
        onFill={(code) => filterPays(code)}
      />
      {!showData && (
        <EmptyState />
      )}
      {showLastMovement && showData && (
        <>
          <View row>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textDate/Hour')}</Text></View>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textRPAmount')}</Text></View>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textTransactionID')}</Text></View>
            <View flex-1><Text h11 blue02 semibold center>{i18n.t('home.history.textDescription')}</Text></View>
          </View>
          <DataHistory dataHistory={dataHistory} />
          <Divider height-10 />
          {dataHistory && (
            showMore && (
              <Link onPress={pagination}>
                <Text h12 white>{i18n.t('home.history.linkShowMore')}</Text>
              </Link>
            )
          )}
        </>
      )}
      {showDowland && (
        <View>
          <Text h12 white light>{i18n.t('home.history.textSelectTheKindOf')}</Text>
          <Divider height-15 />
          <View row >
            <DropDownPicker
              {...month}
              label={i18n.t('home.history.dropDownMonth')}
              options={months}
            //onFill={(code)=> filterPays(code)}
            />
            <Divider width-10 />
            <DropDownPicker
              {...year}
              label={i18n.t('home.history.dropDownYear')}
              options={years}
            //onFill={(code)=> filterPays(code)}
            />
          </View>
          <Divider height-10 />
          <ButtonRounded
            disabled={false}
            blue
          >
            <Text h14 semibold white>
              {i18n.t('home.history.buttonDownloadPDF')}
            </Text>
          </ButtonRounded>
        </View>
      )}
    </View>
  );
};

export default History;
