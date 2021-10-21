import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({

  image: {
    width:'100%',
    justifyContent: "center",
    alignItems:'center'
  },
  borderCircle:{
    borderWidth:1,
    borderRadius:verticalScale(60),
    height: verticalScale(94),
    width:verticalScale(94)
  }
});

export default styles;
