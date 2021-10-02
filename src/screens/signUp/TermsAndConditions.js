import React, { useEffect, useState } from 'react';
import { useValidatedInput } from '@hooks/validation-hooks';
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
import { useQuery } from '@apollo/client';
import { FETCH_TODOS } from '@utils/api/queries/example';
import Logo from '@assets/brandBatched/logo.svg';
import { useSelector } from 'react-redux';


const TermAndConditions = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const privacy = useValidatedInput(null, true, {
    changeHandlerName: 'onChange'
  });
  const term = useValidatedInput(null, true, {
    changeHandlerName: 'onChange'
  });
  const privacy2 = useValidatedInput(null, false, {
    changeHandlerName: 'onChange'
  });

  const term2 = useValidatedInput(null, false, {
    changeHandlerName: 'onChange'
  });

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
      <Text h16 blue02>Just one more step.</Text>
      <Divider height-25 />
      <Checkbox {...privacy} label='I agree with the Privacy Notice.*' />
      <Divider height-10 />
      <Checkbox {...term} label='I agree with the Terms and Conditions.*' />
      <Divider height-10 />
      <Checkbox {...privacy2} label='I agree with the Privacy Notice.*' />
      <Divider height-10/>
      <Checkbox {...term2} label='I agree with the Terms and Conditions.*' />
      <Divider height-20 />
      <Text h12 white light>* Required fields</Text>
      <Divider height-20 />
      <View flex-1 bottom>
        <ButtonRounded
            onPress={() => navigation.navigate("Dashboard")}
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


export default TermAndConditions;