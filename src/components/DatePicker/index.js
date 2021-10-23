import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { View, Text, ImageResize } from '@components';
import InputError from '@components/FloatingLabelInput/InputError';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import ModalDate from './modalDate';
import { useSelector} from 'react-redux';
import { formatDate } from '@utils/formatters';
import blueCalendar from '@assets/icons/blue-calendar.png';
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
        <View row>
          <View flex-1 column>
            <Text blue02 h10 medium>{label}</Text>
            <Text white h13 medium>{valueData?formatDate(valueData):'MM/DD/YYYY'}</Text>
          </View>
          <View right centerH centerV>
            <ImageResize
              source={blueCalendar}
              height={verticalScale(21)}
              width={scale(21)}
            />
          </View>
          
        </View>
        
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
