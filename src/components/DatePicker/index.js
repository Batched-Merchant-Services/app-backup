import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { View, Text, ImageResize, Divider } from '@components';
import InputError from '@components/FloatingLabelInput/InputError';
import InputIconError from '@components/FloatingLabelInput/InputIconError';
import InputIconSuccess from '@components/FloatingLabelInput/InputIconSuccess';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import ModalDate from './modalDate';
import { useSelector } from 'react-redux';
import { formatDate } from '@utils/formatters';
import blueCalendar from '@assets/icons/blue-calendar.png';
import Styles from './styles';
import Colors from '@styles/Colors';
import IconCalendar from '../../assets/iconSVG/IconsKYC/IconCalendar';
import { useTheme } from '@react-navigation/native';


const DatePicker = ({ error, label, value, onSelect, languages, onFill, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const [mode, setMode] = useState('date');
  const [showModalDates, setShowModalDates] = useState(false);
  const [valueData, setValueData] = useState(value);
  const [date, setDate] = useState(new Date());
  const { colors } = useTheme();

  const getData = (data) => {
    onSelect(data?data:{name:'select',value:''});
    setValueData(data)
    
  }
  const onChangeAndroid = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowModalDates(Platform.OS === 'ios');
    setDate(currentDate);
    setValueData(currentDate);
    onSelect(currentDate);
  };
  const handleClose = () => {
    setShowModalDates(!showModalDates);
    if (!valueData&&showModalDates) {
      onSelect({name:'select',value:''});
    }
  };
 
  
  return (
    <View>
      <TouchableOpacity style={[Styles.containerBirth,
        ...(error === 'pending' ? [] : error ? [{ borderColor: brandTheme?.error ?? Colors.error }] : [{ borderColor: brandTheme?.success ?? Colors.success }])]} 
        onPress={() => setShowModalDates(!showModalDates)}
      >
        <View row>
          <View flex-1 column>
            <Text blue02 h10 medium>{label}</Text>
            <Text white h13 medium>{valueData ? formatDate(valueData) : 'MM/DD/YYYY'}</Text>
          </View>
          <View row right centerH centerV>
            <IconCalendar  height={verticalScale(23)} width={scale(23)} fill={brandTheme?.blue02??colors.blue02}/>
            <Divider width-10 />
            {error && error !== 'pending' && (
              <InputIconError error={error} />
            )}

            {!error && error !== 'pending' && (
              <InputIconSuccess error={error} />
            )}
          </View>

        </View>

      </TouchableOpacity>
      {Platform.OS === 'android' && (
        showModalDates && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={onChangeAndroid}
          />
        ))}
      {Platform.OS === 'ios' && (
        <ModalDate visible={showModalDates}
          onRequestClose={() => { setShowModalDates(false)}}
          onPressOverlay={handleClose}
          getData={(data) => getData(data)}
        />
      )}
      <InputError error={error} />
    </View>

  )
};

DatePicker.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string
};
DatePicker.defaultProps = {
  value: {}
};

export default DatePicker;
