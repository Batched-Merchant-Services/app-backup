import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { verticalScale } from 'react-native-size-matters';
const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 3,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  containerBirth:{
    borderColor: Colors.blue02,
    borderWidth:1,
    borderRadius:verticalScale(5),
    padding:verticalScale(6)
  },
  backgroundIOS:{
   height:verticalScale(250),
   marginHorizontal:verticalScale(20),
   borderRadius: 5,
  }
});

export default Styles;


