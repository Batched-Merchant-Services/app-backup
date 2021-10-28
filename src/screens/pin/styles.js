import { StyleSheet, Platform, StatusBar } from "react-native";

import Colors from '@styles/Colors';
import { verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
 
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? verticalScale(10) : 0
  }
});



export default styles;
