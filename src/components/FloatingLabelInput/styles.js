import { Platform, StyleSheet } from 'react-native';
import { scale,verticalScale,moderateScale } from 'react-native-size-matters';
import { Typography } from '@styles/Typography';
import Colors from '@styles/Colors';

const Styles = StyleSheet.create({
  wrapper: {
    borderRadius     : moderateScale(4, 0.2),
    borderWidth      : moderateScale(1, 0.2),
    height           : moderateScale(50, 0.2),
    paddingTop       : moderateScale(5, 0.2),
    paddingHorizontal: moderateScale(10, 0.2),
  },
  label: {
    left    : moderateScale(10, 0.2),
    position: 'absolute',
  },
  input: {
    ...Typography.weight.medium,
    ...Typography.sizes.h14,
    height      : '100%',
    top: verticalScale(Platform.OS === 'ios' ? 1 : 5),
  },
  inputSecure: {
    color        : 'transparent',
    fontSize     : moderateScale(Platform.OS === 'ios' ? 16 : 20, 0.2),
    letterSpacing: 3
  },
  secureText: {
    letterSpacing: moderateScale(3, 0.2),
    ...Typography.weight.regular,
    ...Typography.sizes.h16
  },
  error: {
    ...Typography.weight.regular,
    ...Typography.sizes.h11,
    left: moderateScale(2, 0.2),
    top : moderateScale(2, 0.2),
  },
  imagePass: {
    width : verticalScale(24),
    height: verticalScale(24),

  },
  validations:{
   
    alignItems:'center',
    justifyContent:'center'
  },
  containerShow:{
    width   : verticalScale(23),
    height  : verticalScale(23),
    backgroundColor:Colors.blue02,
    borderRadius:verticalScale(30), 
    alignItems:'center',
    justifyContent:'center'
  }
});

export default Styles;
