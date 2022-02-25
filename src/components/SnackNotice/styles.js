import { StyleSheet } from 'react-native';
import {  Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({

  offlineContainer: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    borderRadius:5

  },
  close:{
    width: verticalScale(50),
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerClose:{
    width:'100%',
    height:'100%',
    justifyContent:'center', 
    alignItems:'center'
  }
});