import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  buttons:{
    flexDirection:'row',
    height: verticalScale(25)
  },
  borderDoted:{
    height:1,
    borderRadius:0.1,
    borderStyle: 'dashed' ,
    borderWidth: 1,
    borderColor: Colors.blue04,
  },
  borderViewDoted:{
    flex:1,
    borderRadius:0.1,
    borderStyle: 'dashed' ,
    borderWidth: 1,
    borderColor: Colors.blue04,
  },
  borderImages:{
    borderWidth:1, 
    borderColor:Colors.blue02,
  },
  image: {
    justifyContent: "center",
    alignItems:'center'
  },
});

export default styles;
