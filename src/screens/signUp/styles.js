import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: verticalScale(15),
    paddingRight: verticalScale(15),
    borderRadius: verticalScale(5)
  },
  fonts:{
    fontFamily: 'BaiJamjuree-SemiBold',
    fontSize  : 16,
    color:'white'
  },
  input: {
    height: verticalScale(40),
    margin: verticalScale(12),
    borderWidth: verticalScale(1),
    padding: verticalScale(10),
  },
  btn: {
    color:Colors.blue02,
    opacity:0.5
  },
  btnActive: {
   color:Colors.white
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {

    justifyContent: "center",
    alignItems:'center'
  },

});

export default styles;
