import React, { useEffect,useState } from 'react';
import { useColorScheme,TouchableOpacity,Picker } from 'react-native';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale,verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  LinksTerms,
  ButtonRounded,
  FloatingInput,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import StepButton from './components/StepsButton';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';
import StepIndicator from '../../components/StepIndicator';


const Register = ({ navigation }) => {
  const redux = useSelector(state => state);
  const email = useValidatedInput('email', '');
  const password = useValidatedInput('password', '');
  const answer = useValidatedInput('', {name: ''}, {
    changeHandlerSelect: 'onSelect'
  });
  const [items, setItems] = useState([
    {id: '1', value: 'apple',name:'Apple'},
    {id: '2', value: 'banana',name:'Banana'}
  ]);

  useEffect(() => {
    console.log('redux', redux)
  }, [])


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
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-15 />
      <StepButton navigation={navigation}/>
      <Divider height-15 />
      <Text h18 blue02>Welcome to Batched!</Text>
      <Divider height-25 />
       <Divider height-5 />
      <FloatingInput
        {...password}
        label={'Email Address '}
        autoCapitalize={'none'}
      />
       <Divider height-5 />
       <DropDownPicker
          {...answer}
          label={'Country'}
          options={items}
          size="sm"
          //onFill={(code)=> filterPays(code)}
       />
      <Divider height-5 />
      <FloatingInput
        {...password}
        label={'Phone'}
        autoCapitalize={'none'}
      />
      <Divider height-15 />
      <StepIndicator step={1} totalSteps={5} />
      <Divider height-35 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={() => navigation.navigate("ConfirmationSms")}
          disabled={false}
          blue
          size='lg'
        >
          <Text h14 semibold>
            Next
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>
  );
}


export default Register;