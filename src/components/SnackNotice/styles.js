import { StyleSheet } from 'react-native';
import {  Platform } from 'react-native';

export default StyleSheet.create({

  offlineContainer: {
    width: '98%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0: 10,
    borderRadius:5

  },
});