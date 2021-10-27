import { StyleSheet, Platform, StatusBar } from "react-native";

import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
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
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});



export default styles;
