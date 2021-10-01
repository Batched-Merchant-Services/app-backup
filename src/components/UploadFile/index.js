import React, { Fragment, useEffect,useState } from 'react';
import {
  Text,
  ButtonRounded,
  FloatingInput
} from '@components';
import { useValidatedInput } from '@hooks/validation-hooks';

const UploadFile = ({ navigation,labelInput,labelButton,onPressTerm, onPressPrivacy, ...props }) => {
  const fileUpload = useValidatedInput('fileUpload', '');
  return (
    <Fragment>
     <FloatingInput
        {...fileUpload}
        label={labelInput}
        keyboardType={'number-pad'}
        autoCapitalize={'none'}
        editable={false}
      />
      <ButtonRounded
        disabled={false}
        dark
        size='lg'
      >
        <Text h14 semibold blue02>
          {labelButton}
        </Text>
      </ButtonRounded>
    </Fragment>
    
  );
}


export default UploadFile;