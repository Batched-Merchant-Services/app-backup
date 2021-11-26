import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    alignItems:'center',
    width:verticalScale(120),
    height:verticalScale(120),
  },
  imageSecond: {
    justifyContent: "center",
    alignItems:'center',
    width:verticalScale(60),
    height:verticalScale(60),
  },
  borderDoted:{
    borderRadius:0.1,
    borderStyle: 'dashed' ,
    borderWidth: 1,
    borderColor: Colors.blue04,
  },
  imageBackground:{
    
    justifyContent: "center",
    alignItems:'center'
  },

  containerTime:{
    width:verticalScale(70), 
    height:verticalScale(70),
    justifyContent: "center",
    alignItems:'center',
    borderRadius:verticalScale(40)
  },
  borderBlue:{
    borderColor:Colors.blue04,
    borderWidth:1,
  },
  borderGreen:{
    borderColor:Colors.green,
    borderWidth:1,
    margin:10,
  },
  
  box: {
    position:'absolute',
    left: verticalScale(18),
    top: -verticalScale(11)
  },
});

export default styles;
