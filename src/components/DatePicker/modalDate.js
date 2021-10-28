import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Divider, ButtonRounded } from '@components';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import { formatDate } from '@utils/formatters';
import Styles from './styles';

const modalDate = ({ visible, onRequestClose, getData, onPressOverlay, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log('event',event,selectedDate);
    const currentDate = selectedDate || date;
    const format = formatDate(currentDate);
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    getData(format)

  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View flex-1 centerV>
        <View style={[Styles.backgroundIOS, { backgroundColor: Colors.blue01 }]} >
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            textColor={brandTheme?.blue03 ?? Colors.blue03}
            mode={mode}
            display="spinner"
            onChange={onChange}
          />
              <Divider height-15 />
              <View centerH>
                <ButtonRounded
                  onPress={onPressOverlay}
                  disabled={false}
                  dark
                  size='sm'
                >
                  <Text h14 semibold blue02>
                    Close
                  </Text>
                </ButtonRounded>
              </View>
        </View>
      </View>
    </Modal>

  )
};

export default modalDate;
