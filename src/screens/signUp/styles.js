import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  fonts:{
    fontFamily: 'BaiJamjuree-SemiBold',
    fontSize  : 16,
    color:'white'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    color:Colors.blue02,
    opacity:0.5
  },
  btnActive: {
   color:Colors.white
  }
});

export default styles;
