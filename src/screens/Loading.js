import React from 'react'
import { ActivityIndicator, Modal } from 'react-native'
import Colors from '@styles/Colors'
import Styles from './styles';
import LottieView from 'lottie-react-native';
import {
  View
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';

const Loading = ({ modalVisible, ...props }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={modalVisible}>
      <View flex-1 style={Styles.container}>
        <LottieView source={require('../assets/animationsLottie/LottieLoader.json')} autoPlay loop style={{ width: scale(60),height:verticalScale(60) }} />
      </View>
    </Modal>
  );
}

export default Loading;
