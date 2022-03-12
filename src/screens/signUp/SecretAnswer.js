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
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';
import i18n from '@utils/i18n';

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



  return (
    <BackgroundWrapper>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-15 />
      <Text h14 white>{i18n.t('Register.secretAnswer.textSecretAnswer')}</Text>
      <Text h14 white semibold>{i18n.t('Register.secretAnswer.textYouMustMemorizeIt')}<Text h14 white light>{i18n.t('Register.secretAnswer.textSinceInCaseOfUser')}</Text></Text>
      <Divider height-25 />
      <DropDownPicker
        {...answer}
        label={i18n.t('Register.secretAnswer.dropDownCountry')}
        options={items}
        //onFill={(code)=> filterPays(code)}
       />
      <Divider height-5 />
      <FloatingInput
        {...secretAnswers}
        label={i18n.t('Register.secretAnswer.inputSecretAnswer')}
        autoCapitalize={'none'}
        secureTextEntry
      />
      <Divider height-5 />
      <FloatingInput
        {...secretAnswerConfirm}
        label={i18n.t('Register.secretAnswer.inputRepeatSecretAnswer')}
        autoCapitalize={'none'}
        secureTextEntry
      />
      <Text h12 white>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-10 />
      <View flex-1 row bottom >
        <ButtonRounded
          onPress={() => goBack()}
          disabled={false}
          dark
          size='sm'
        >
          <Text h14 semibold blue02>
            {i18n.t('General.buttonBack')}
          </Text>
        </ButtonRounded>
        <Divider width-10 />
        <ButtonRounded
         onPress={() => navigation.push("TermConditions")}
          disabled={!isValid}
          blue
          size='sm'
        >
          <Text h14 semibold>
            {i18n.t('General.buttonNext')}
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>
  );
}


export default SecretAnswer;