import React, { useEffect,useState } from 'react';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { scale,verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Divider,
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
import i18n from '@utils/i18n';

const Register = ({ navigation }) => {
  const redux = useSelector(state => state);
  const email = useValidatedInput('email', '');
  const phone = useValidatedInput('phone', '');
  const answer = useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });

  const [items, setItems] = useState([
    {id: '1', value: 'value1',name:'value1'},
    {id: '2', value: 'value2',name:'value2'}
  ]);
  const isValid = isFormValid(email,phone,answer);


  useEffect(() => {
    console.log('redux', redux)
  }, [])

 

  return (
    <BackgroundWrapper navigation={navigation}>
      <View row>
        <View flex-1>
          <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
        </View>
        <View flex-1 right centerV>
        <StepIndicator step={1} totalSteps={4} />
        </View>
      </View>
      <Divider height-15 />
      <StepButton navigation={navigation}/>
      <Divider height-15 />
      <Text h18 blue02>{i18n.t('Register.textWelcomeTo')}</Text>
      <Divider height-25 />
       <Divider height-5 />
      <FloatingInput
        {...email}
        label={i18n.t('Register.textInputEmail')}
        autoCapitalize={'none'}
      />
       <Divider height-5 />
       <View row>
          <DropDownPicker
            {...answer}
            label={i18n.t('Register.textDropDown')}
            options={items}
            size='sm'
            //onFill={(code)=> filterPays(code)}
          />
   
        <Divider width-8 />
        <View flex-1 right centerV>
          <FloatingInput
          {...phone}
          label={i18n.t('Register.inputPhone')}
          autoCapitalize={'none'}
          />
        </View>
      </View>
     
      <Divider height-35 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={() => navigation.navigate("CodeSms")}
          disabled={!isValid}
          blue
        >
          <Text h14 semibold>
            {i18n.t('General.buttonNext')}
          </Text>
        </ButtonRounded>
      </View>
    </BackgroundWrapper>
  );
}


export default Register;