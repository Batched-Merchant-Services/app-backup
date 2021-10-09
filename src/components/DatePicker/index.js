import React, { useEffect, useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Divider,ButtonRounded } from '@components';
import InputError from '@components/FloatingLabelInput/InputError';
import PropTypes from 'prop-types';
import { Button, Modal,TouchableOpacity } from 'react-native';
import ModalDate from './modalDate';
import { useSelector} from 'react-redux';
import { formatDate } from '@utils/formatters';
import Colors from '@styles/Colors';
import Styles from './styles';
const DatePicker = ({ error, label, value, onSelect, languages, onFill, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const [showModalDates, setShowModalDates] = useState(false);
  const [valueData, setValueData] = useState('');
  const [date, setDate] = useState(new Date());

  
  const getData =(data) =>{
    onSelect(data);
    setValueData(data)
  }
 
  return (
    <View>
      <TouchableOpacity  style={Styles.containerBirth}  onPress={() => setShowModalDates(!showModalDates)}>
        <Text blue02 h10 medium>{label}</Text>
        <Text white h13 medium>{valueData?formatDate(valueData):'MM/DD/YYYY'}</Text>
      </TouchableOpacity>
      <InputError error={error} />
      <ModalDate visible={showModalDates} 
        onRequestClose={()=>{
          setShowModalDates(false)
        }} 
        onPressOverlay={()=>{
          setShowModalDates(!showModalDates);
        }}
        getData={(data)=>getData(data)}
        />
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

export default DatePicker ;
