import { StyleSheet } from 'react-native';
import {  verticalScale } from 'react-native-size-matters';

const Styles = StyleSheet.create({
  wrapper: {
    height        : verticalScale(30),
    alignItems    : 'center',
    justifyContent: 'center',
    borderRadius  : verticalScale(30)
  }
});

export default Styles;
