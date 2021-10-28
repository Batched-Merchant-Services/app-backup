import React, { useEffect, useState } from 'react';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  DropDownPicker,
  ButtonRounded,
  FloatingInput,
  BackgroundWrapper

} from '@components';
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';


const SecretAnswer = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const [items, setItems] = useState([
    {id: '1', value: 'My favorite food',name:'food'},
    {id: '2', value: 'Name',name:'name'},
    {id: '3', value: 'Your years',name:'years'}
  ]);
  const answer = useValidatedInput('select','',{
    changeHandlerSelect: 'onSelect'
  });
  const secretAnswers = useValidatedInput('secretAnswers', '');
  const secretAnswerConfirm = useValidatedInput('secretAnswerConfirm', '',{
    validationParams: [secretAnswers.value]
  });
  const isValid = isFormValid(answer,secretAnswers,secretAnswerConfirm);


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
      <Text h14 white>Secret answer</Text>
      <Text h14 white semibold>You must memorize it, <Text h14 white light>since in case of user authentication, this will be required:</Text></Text>
      <Divider height-25 />
      <DropDownPicker
        {...answer}
        label={'Country'}
        options={items}
        //onFill={(code)=> filterPays(code)}
       />
      <Divider height-5 />
      <FloatingInput
        {...secretAnswers}
        label={'Secret answer*'}
        autoCapitalize={'none'}
        secureTextEntry
      />
      <Divider height-5 />
      <FloatingInput
        {...secretAnswerConfirm}
        label={'Repeat secret answer*'}
        autoCapitalize={'none'}
        secureTextEntry
      />
      <Text h12 white light>* Required fields</Text>
      <Divider height-15 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            Back
          </Text>
        </ButtonRounded>
        <Divider width-10 />
        <ButtonRounded
          onPress={() => navigation.navigate("TermConditions")}
          disabled={!isValid}
          blue
          size='sm'
        >
          <Text h14 semibold>
            Next
          </Text>
        </ButtonRounded>
      </View> 
    </BackgroundWrapper>
  );
}


export default SecretAnswer;