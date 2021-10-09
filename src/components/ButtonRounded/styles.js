import { StyleSheet } from 'react-native';
import {  scale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const Styles = StyleSheet.create({
  wrapper: {
    height        : verticalScale(40),
    alignItems    : 'center',
    justifyContent: 'center',
    borderRadius  : verticalScale(2),
  },
  borderDark:{
    borderColor:Colors.blue02,
    borderWidth:1
  },
  disableColor:{
    opacity:0.5
  },
  greenBorder:{
    borderColor:Colors.green,
    borderWidth:1
  }

});

export default Styles;
