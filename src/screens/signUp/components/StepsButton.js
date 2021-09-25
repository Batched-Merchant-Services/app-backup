import React, { useEffect,useState } from 'react';
import { useColorScheme,TouchableOpacity } from 'react-native';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale,verticalScale } from 'react-native-size-matters';
import {useRoute} from '@react-navigation/native';
import {
  Text,
  View,
  Divider
} from '@components';
import Styles from '../styles'

const StepButton = ({ navigation }) => {
  const route = useRoute();
  const [loginButtonActive, setLoginButtonActive] = useState(route.name === 'Login'?true:false);
  const [registerButtonActive, setRegisterButtonActive] = useState(route.name === 'Login'?false:true);
 
  console.log('route.name',route.name);

  function handleLoginActiveButton() {
    navigation.navigate("Login");
  }
  function handleRegisterActiveButton() {
    navigation.navigate("Register");
  }
 
  return (
   <View>
      <TouchableOpacity activeOpacity={0.3} onPress={handleLoginActiveButton} style={{justifyContent:'center'}}>
        <View row centerV>
          {loginButtonActive &&(<Text blue02 h5>{'\u2B24'}</Text>)}
          <Divider width-5/>
          <Text h24 style={loginButtonActive ? Styles.btnActive : Styles.btn}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterActiveButton}>
        <View row centerV>
          {registerButtonActive &&(<Text blue02 h5>{'\u2B24'}</Text>)}
          <Divider width-5/>
          <Text h24 style={registerButtonActive ? Styles.btnActive : Styles.btn}>Register</Text>
        </View>
      </TouchableOpacity>
   </View>
  );
}


export default StepButton;