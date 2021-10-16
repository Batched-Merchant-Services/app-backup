import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
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
    margin:10
  }
});

export default styles;
