import React from 'react'
import { ActivityIndicator } from 'react-native'
import  Colors  from '@styles/Colors'
import Styles from './styles';
import {
  View
} from '@components';

const Loading = () => (
  <View style={Styles.container}>
    <ActivityIndicator size="large" color="#3F529E" />
  </View>
);

export default Loading;