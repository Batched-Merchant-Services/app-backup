import { StyleSheet, Dimensions, Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';


export default StyleSheet.create({
  container: {
    flex: 1,
    width : Dimensions.get('window').width,
    //height      : Platform.OS === 'ios' ? Dimensions.get('window').height + verticalScale(90) : Dimensions.get('window').height + verticalScale(0),
    shadowColor : '#000000',
    shadowOffset: {
      width : -300,
      height: 300
    },
    shadowRadius: 40,
    elevation   : 40,
  },
  containerSideMenu: {
    flex : 1,
    width: Dimensions.get('window').width * 0.717,
  },

  imageContainer: {
    flex:1,
    borderRadius:16,
    //marginVertical: 8,
  },

  drawerImage: {
    width: 10,
    height: 10
  },

  imageStyle: {
    borderRadius: 16
  },

  imageGradient: {
    flex: 1,
    borderRadius: 16
  },

  activeContainer: {
    borderLeftWidth: 1,
    borderLeftColor: '#00b8d4',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 1,
    marginTop: 0
  },

  activeText: {
    fontWeight: 'bold',
    color: '#00b8d4',
    backgroundColor: 'transparent'
  },

  inActiveContainer: {
    borderLeftWidth: 1,
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
    borderRadius: 1,
    marginTop: 0
  },

  inactiveText: {
    fontWeight: 'bold',
    color: 'red',
    backgroundColor: 'transparent'
  }
});
