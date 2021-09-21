import React,{useEffect} from 'react';
import { Text,View,Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector,useDispatch } from 'react-redux';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import { useTheme } from '@react-navigation/native';

const Register = ({ navigation }) => {
  const redux = useSelector(state => state);

  useEffect(() => {
    console.log('redux',redux)
  }, [])




  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
 
  const backgroundStyle = {
    backgroundColor: colors.white,
    flex:1
  }; 
  return (
    <SafeAreaView
      style={backgroundStyle}
    >
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex:1,alignItems:'center'}}>
         <Text>Hello, I am your Register!</Text>
         <Button
            title="Open drawer"
            onPress={() => navigation.navigate('Dashboard')} // We added an onPress event which would navigate to the About screen
          />
      </View>
    </SafeAreaView>
    
    
  );
}


export default Register;