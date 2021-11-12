import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex         : 1,
    alignItems   : 'center',
    justifyContent: 'center',
    paddingTop   : verticalScale(83),
    backgroundColor:'rgba(63, 82, 158, 0.50)'
  }
});

export default styles;
