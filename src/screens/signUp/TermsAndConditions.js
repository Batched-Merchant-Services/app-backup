import React, { useEffect, useState } from 'react';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Link,
  Divider,
  Checkbox,
  SnackNotice,
  ButtonRounded,
  BackgroundWrapper
} from '@components';

import Logo from '@assets/brandBatched/logo.svg';
import i18n from '@utils/i18n';
import LocalStorage from '@utils/localStorage';

//Redux
import { useSelector, useDispatch } from 'react-redux';

//actions
import { toggleSnackbarClose } from '@store/actions/app.actions';
import { cleanErrorRegister } from '@store/actions/register.actions';
import { showAppResources } from '@store/actions/app.actions';
import Loading from '../Loading';
import { regexTermsAndConditions } from '@utils/formatters';



const TermAndConditions = ({ navigation, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const registerData = redux?.register;
  const userData = redux?.user;
  const userApp = redux?.app;
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

  const error = useSelector(state => state?.app?.showError);


  const valid = () => {
    if (privacy?.value && term?.value) {
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
      dispatch(showAppResources());
    });
    return unsubscribe;

  }, []);

  
  


  return (
    <BackgroundWrapper>
      <Logo width={scale(169)} height={verticalScale(24)} fill="green" />
      <Divider height-15 />
      <Text h9 white>{regexTermsAndConditions(userApp?.getAppResources?.privacyPolice)}</Text>
      <Divider height-10 />
      {/* <Checkbox {...privacy} label='I agree with the Privacy Notice.*' />
      <Divider height-10 />
      <Checkbox {...term} label='I agree with the Terms and Conditions.*' />
      <Divider height-10 />
      <Checkbox {...privacy2} label='I agree with the Privacy Notice.*' />
      <Divider height-10/>
      <Checkbox {...term2} label='I agree with the Terms and Conditions.*' />
      <Divider height-20 />
      <Text h12 white light>{i18n.t('General.textRequiredFields')}</Text>
      <Divider height-20 />
      <View flex-1 bottom> */}
      <Text h9 white>{regexTermsAndConditions(userApp?.getAppResources?.termsAndConditions)}</Text>
      <Checkbox {...privacy} label={i18n.t('General.textIAgreeWithThePrivacy')} />
      <Checkbox {...term} label={i18n.t('General.textIAgreeWithTheTerms')} />
      <ButtonRounded
        //onPress={() => navigation.navigate("RegisterProfileBasic")}
        onPress={() => navigation.navigate("ReferralCode")}
        disabled={valid()}
        blue
      >
        <Text h14 semibold>
          {i18n.t('General.buttonNext')}
        </Text>
      </ButtonRounded>
      <SnackNotice
        visible={error}
        message={userApp?.error?.message}
        timeout={3000}
      />
    </BackgroundWrapper>
  );
}


export default TermAndConditions;