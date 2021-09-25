import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
	circle: {
    width:scale(8),
    height:scale(8),
		borderRadius: verticalScale(30),
		backgroundColor: Colors.white
	},
	circleDisable: {
    width:scale(8),
    height:scale(8),
		borderRadius: verticalScale(30),
		backgroundColor:Colors.blue02
	},

});
