import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Divider,ButtonRounded } from '@components';
import { Modal } from 'react-native';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import { formatDate } from '@utils/formatters';

const modalDate = ({ visible,onRequestClose,getData,onPressOverlay, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
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
      <View blue01 height-250 marginT-250 marginH-20 style={{ borderRadius: 5 }}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          textColor={brandTheme?.blue03??Colors.blue03}
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
    </Modal>

  )
};

export default modalDate ;
