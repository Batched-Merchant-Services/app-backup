import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  containerProfile: {
    width: verticalScale(45),
    height: verticalScale(42),
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:verticalScale(0),
    bottom:verticalScale(0),
  },
  containerMini: {
    width: verticalScale(30),
    height: verticalScale(30),
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:verticalScale(0),
    bottom:verticalScale(0),
  }
});

export default styles;

