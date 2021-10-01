import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';

const Styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor:  Colors.blue04,
    backgroundColor: 'transparent',
  },
  
  checkboxChecked: {
    backgroundColor: Colors.green,
    borderColor:  Colors.green,
  },
  
});

export default Styles;


