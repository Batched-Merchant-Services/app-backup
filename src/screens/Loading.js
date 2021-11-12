import React from 'react'
import { ActivityIndicator, Modal } from 'react-native'
import Colors from '@styles/Colors'
import Styles from './styles';
import {
  View
} from '@components';

const Loading = ({ modalVisible, ...props }) => {
  return (
    <Modal animationType='slide' animationType="slide" transparent={true} visible={modalVisible}>
      <View flex-1 style={Styles.container}>
        <ActivityIndicator size="large" color="#3F529E" />
      </View>
    </Modal>
  );
}

export default Loading;
