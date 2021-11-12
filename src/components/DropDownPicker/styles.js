import { StyleSheet } from 'react-native';
import { moderateScale,verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  dropDown: {
   flex:1,
    borderWidth            : moderateScale(1, 0.3),
    height                 : moderateScale(50),
    alignItems             : 'flex-start',
    justifyContent         : 'center',
    borderRadius           : verticalScale(2),
    paddingLeft            : verticalScale(6),
  },
  dropdownOpen: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius : 0,
    borderBottomWidth      : 0
  },
  dropdownContainer: {
    width:'100%',
    borderTopWidth         : 0 ,
    borderWidth            : verticalScale(1, 0.3),
    paddingLeft            : verticalScale(6),
  },

  option: {
    flex       : 1,
    borderWidth: 0
  },

  container: {
    flex           : 1,
    backgroundColor: 'red'
  },

  arrow: { position: 'absolute', bottom: verticalScale(12, 0.3), right: verticalScale(10, 0.3) },
});
