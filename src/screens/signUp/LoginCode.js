import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Animated} from 'react-native';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import {
  Text,
  View,
  Link,
  Divider,
  PinInput,
  ImageResize,
  BackgroundWrapper
} from '@components';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';

import { useSelector } from 'react-redux';

//Styles
import Styles from './styles';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';
//Images
import Back from '@assets/icons/backBlue.png';
import codeInvalid from '@assets/icons/codeInvalid.png';


const LoginCode = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const codeSms = useValidatedInput('sms', '');
  const pinCode = useValidatedInput('pinCode', '');
  const [codeValid, setCodeValid] = useState(false);
  var isValid = isFormValid(pinCode);

  useEffect(() => {
    console.log('redux', redux)
  }, [])

  if(isValid ){
    console.log('isValid',isValid,codeValid);
    if ( !codeValid) {
      getInfo();
    }
  }else if (!codeValid & !isValid) {
    //setDontSnac();
  } 

  function getInfo() {
    const Code = pinCode.value;
    setCodeValid(true);
     
  }


  const { data, error, loading } = useQuery(FETCH_TODOS);
  //console.log('data', data, error, loading)

  if (error) {
    console.error(error);
  }

  // if (loading) {
  //   console.log('loading');
  // }


  return (
    <BackgroundWrapper>
      <View blue03 flex-1 padding-15 >
        <View row centerV>
          <TouchableOpacity
            style={{
              width: scale(32),
              height: verticalScale(32),
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1e3,
              borderColor: Colors?.blue02,
              borderWidth: 1
            }}
            onPress={() => goBack()}
          >
            <ImageResize source={Back} height={verticalScale(20)} width={scale(20)} />
          </TouchableOpacity>
          <Divider width-10 />
          <View style={{ width: '80%' }}>
            <Text h18 white light center>Código de Ingreso</Text>
          </View>
        </View>
        <Divider height-20 />
        <View flex-1>
          <Text h12 white light center>Ingresa el código de tu empresa</Text>
          <Divider height-50 />
          <View centerV>
            <PinInput {...pinCode}/>
            <Divider height-30 />
            {codeValid &&(
              <View centerH centerV>
                <Animated.Image
                  style={[Styles.shoe]}
                  source={require("@assets/icons/codeInvalid.png")}
                />
                <Divider height-10 />
                <Text h12 regular white>Código inválido</Text>
              </View>
              
            )}
          </View>
          <Divider height-30 />
          <View flex-1 >
            <Text h12 white semibold center>Tu perfíl en Uulala será ligado a esta compañía.</Text>
            <Divider height-10 />
            <Text h12 white light center>La información solicitada tiene la finalidad de crear un perfíl de usuario y poder ofrecerte los mejores beneficios a tu medida.</Text>
          </View>
        </View>
        <Link>
          <Text h12 white>No cuento con código</Text>
        </Link>
        <Divider height-30 />
      </View>
    </BackgroundWrapper>
  );
}


export default LoginCode;