import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  Text,
  View,
  Divider
} from '@components';
import Styles from '../styles'
import i18n from '@utils/i18n';


const StepButton = ({ navigation }) => {
  const route = useRoute();
  const [loginButtonActive] = useState(route.name === 'Login'?true:false);
  const [registerButtonActive] = useState(route.name === 'Login'?false:true);
 


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
          <Text h24 style={loginButtonActive ? Styles.btnActive : Styles.btn}>{i18n.t('Login.linkLogin')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterActiveButton}>
        <View row centerV>
          {registerButtonActive &&(<Text blue02 h5>{'\u2B24'}</Text>)}
          <Divider width-5/>
          <Text h24 style={registerButtonActive ? Styles.btnActive : Styles.btn}>{i18n.t('Login.linkRegister')}</Text>
        </View>
      </TouchableOpacity>
   </View>
  );
}


export default StepButton;