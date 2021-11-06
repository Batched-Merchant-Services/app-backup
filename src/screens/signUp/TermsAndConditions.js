import React, { useEffect, useState } from 'react';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  Checkbox,
  LinksTerms,
  ButtonRounded,
  BackgroundWrapper
} from '@components';

import Logo from '@assets/brandBatched/logo.svg';
import i18n from '@utils/i18n';
import LocalStorage from '@utils/localStorage';

//Redux
import { useSelector, useDispatch } from 'react-redux';

//actions
import { toggleSnackbarClose,toggleSnackbarOpen } from '@store/actions/app.actions';
import { cleanErrorRegister, setPassword,setRegister } from '@store/actions/register.actions';
import Loading from '../Loading';


const TermAndConditions = ({ navigation, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const registerData = redux?.register;
  const userData = redux?.user;
  const brandTheme = userData?.Theme?.colors;

  const privacy = useValidatedInput(null, false, {
    changeHandlerSelect: 'onSelect'
  });
  const term = useValidatedInput(null, false, {
    changeHandlerSelect: 'onSelect'
  });
  const privacy2 = useValidatedInput(null, false, {
    changeHandlerSelect: 'onSelect'
  });

  const term2 = useValidatedInput(null, false, {
    changeHandlerSelect: 'onSelect'
  });

  const valid = () => {
    if (privacy?.value && term?.value && privacy2?.value && term2?.value) {
      return false;
    }
    return true;
  }
 
  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cleanErrorRegister());
      dispatch(toggleSnackbarClose());
      LocalStorage.remove('password');
      LocalStorage.remove('pinConfirmation');
    });
    return unsubscribe;

  }, []);

  return (
    <BackgroundWrapper>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-15 />
      <Text h16 blue02>{i18n.t('Register.textJustOneMoreStep')}</Text>
      <Divider height-25 />
      <Checkbox {...privacy} label='I agree with the Privacy Notice.*' />
      <Divider height-10 />
      <Checkbox {...term} label='I agree with the Terms and Conditions.*' />
      <Divider height-10 />
      <Checkbox {...privacy2} label='I agree with the Privacy Notice.*' />
      <Divider height-10/>
      <Checkbox {...term2} label='I agree with the Terms and Conditions.*' />
      <Divider height-20 />
      <Text h12 white light>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-20 />
      <View flex-1 bottom>
        <ButtonRounded
            onPress={() => navigation.navigate("RegisterProfileBasic")}
            disabled={valid()}
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


export default TermAndConditions;