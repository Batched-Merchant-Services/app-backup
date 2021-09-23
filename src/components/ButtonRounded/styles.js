import { StyleSheet } from 'react-native';
import {  scale,verticalScale } from 'react-native-size-matters';

const Styles = StyleSheet.create({
  wrapper: {
    height        : scale(40),
    alignItems    : 'center',
    justifyContent: 'center',
    borderRadius  : scale(2)
  },

});

export default Styles;
