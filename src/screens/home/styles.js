import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    alignItems: 'center',
    width: verticalScale(140),
    height: verticalScale(140),
  },
  imageContainer:{
    flex:1,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageSecond: {
    justifyContent: "center",
    alignItems: 'center',
    width: verticalScale(75),
    height: verticalScale(75),
    marginTop: verticalScale(13)
  },
  borderDoted: {
    borderRadius: 0.1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.blue04,
  },
  imageBackground: {
    justifyContent: "center",
    alignItems: 'center' 
  },
  containerTime: {
    width: verticalScale(70),
    height: verticalScale(70),
    alignItems: 'center',
    borderRadius: verticalScale(40)
  },
  borderBlue: {
    borderColor: Colors.blue04,
    borderWidth: 1,
  },
  borderGreen: {
    borderColor: Colors.green,
    borderWidth: 1,
    margin: 10,
  },
  box: {
    position: 'absolute',
    left: verticalScale(18),
    top: -verticalScale(11)
  },
  containerArrow:{
    width: verticalScale(11),
    height: verticalScale(40),
    position:'absolute',
    top:verticalScale(30)
  }
});

export default styles;
