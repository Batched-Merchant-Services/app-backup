import React,{useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar,
  useColorScheme,
  Button
} from 'react-native';
import {
  Text,
  View,
  ButtonRounded
} from '@components';
import Colors from '@styles/Colors'
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import LinearGradient from 'react-native-linear-gradient';
import Style from './styles'

const Login = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const { data, error, loading } = useQuery(FETCH_TODOS);
  console.log('data',data, error, loading)

    if (error) {
      console.error(error);
    }
    
    if (loading) {
      console.log('loading');
    }
 
  const backgroundStyle = {
    flex:1
  }; 



  return (
    
    
    <LinearGradient colors={[Colors.background,Colors.blue04]} start={{x: 1, y: 0}} end={{x: 1, y: 1}} locations={[0.9,1]} style={Style.linearGradient}>
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
    </LinearGradient>
    
    
  );
}

export default Login;