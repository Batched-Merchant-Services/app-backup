import React from 'react';
import { Text,View,Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@react-navigation/native';

const Login = ({ navigation }) => {
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
         <Text>Hello, I am your Login!</Text>
         <Button
        title="Go to About Screen"
        onPress={() => navigation.navigate("Register")} // We added an onPress event which would navigate to the About screen
      />
      </View>
    </SafeAreaView>
    
    
  );
}

export default Login;