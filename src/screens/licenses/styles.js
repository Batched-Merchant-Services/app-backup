import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  linearGradient: {
    height:    verticalScale(110),
    paddingLeft: verticalScale(15),
    paddingRight: verticalScale(15),
  },
  lineDiv:{
    height: verticalScale(90),
    borderWidth:1,
    marginLeft: verticalScale(8),
  },
  image: {
    width: null,
    height: verticalScale(110)
  },
  loginScreenButton:{
    width: verticalScale(100),
    height:    verticalScale(35),
    borderRadius: verticalScale(2),
    justifyContent: "center",
    alignItems:'center'
  },


});

export default styles;
