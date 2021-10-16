import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewBase } from 'react-native';
import { View, Text, Divider, ImageResize, ButtonRounded, DropDownPicker } from '@components';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';

import whiteWallet from '@assets/icons/white-wallet.png';
import blueReferred from '@assets/icons/blue-referred.png';
import blueRow from '@assets/icons/blue-row-double-down.png';
import EmptyState from '../EmptyState';
import Styles from './styles';
import i18n from '@utils/i18n';

const DataHistory = () => {
  // note addition of `return` statement

  return (Array.from({ length: 15 }).map((i, index) => {

    return (
      <>

        <View row>
          <View flex-1><Text h10 blue02 white center>06/08/202212:45</Text></View>
          <View flex-1><Text h10 blue02 white center>+12,345</Text></View>
          <View flex-1><Text h10 blue02 white center>ICW7U5G4IG</Text></View>
          <View flex-1><Text h10 blue02 white center>Refered points</Text></View>
        </View>
      </>
    );
  }));
};


const Referred = ({ navigation, step, onPress, label }) => {
  const kindOfData = useValidatedInput('select', {
    changeHandlerSelect: 'onSelect'
  });
  const month = useValidatedInput('select', {
    changeHandlerSelect: 'onSelect'
  });
  const year = useValidatedInput('select', {
    changeHandlerSelect: 'onSelect'
  });

  const [showData, setShowData] = useState(true);
  const [showLastMovement, setShowLastMovement] = useState(true);
  const [showDowland, setShowDowland] = useState(false);

  const [data, setData] = useState([
    { id: '1', name: 'Global distribution cycling record', value: '1' },
    { id: '2', name: 'Global distribution cycling record', value: '2' },
    { id: '3', name: 'Global distribution cycling record', value: '3' }
  ]);


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

  return (
    <View flex-1>
      <Text h14 white regular>{i18n.t('home.history.textRegisterOfMovements')}</Text>
      <View row >
        <View flex-1>
          <ButtonRounded
            disabled={false}
            onPress={showMovements}
            blue={showLastMovement?true:false}
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
            dark={!showDowland?true:false}
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
      //onFill={(code)=> filterPays(code)}
      />
      {!showData && (
        <EmptyState />
      )}
      {showLastMovement && (
        <>
          <View row>
            <View flex-1><Text h11 blue02 light center>{i18n.t('home.history.textDate/Hour')}</Text></View>
            <View flex-1><Text h11 blue02 light center>{i18n.t('home.history.textRPAmount')}</Text></View>
            <View flex-1><Text h11 blue02 light center>{i18n.t('home.history.textTransactionID')}</Text></View>
            <View flex-1><Text h11 blue02 light center>{i18n.t('home.history.textDescription')}</Text></View>
          </View>
          <DataHistory />
        </>

      )}
      {showDowland && (
        <View>
          <Text h12 white light>{i18n.t('home.history.textSelectTheKindOf')}</Text>
          <Divider height-15/>
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

export default Referred;
