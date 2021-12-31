import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  containerProfile: {
    width: verticalScale(45),
    height: verticalScale(45),
    alignItems:'center',
    justifyContent:'center',
    paddingRight: verticalScale(10)
  }
});

export default styles;

