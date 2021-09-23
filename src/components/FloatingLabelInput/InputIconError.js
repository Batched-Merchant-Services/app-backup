import React from 'react';
import PropTypes from 'prop-types';
import {ImageResize,View} from '@components';
import Styles from '@components/FloatingLabelInput/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import { scale,verticalScale } from 'react-native-size-matters';
import errorValidations from '@assets/icons/errorValidations.png';


const InputIconError = ({ error }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <View style={Styles.validations}>
      <ImageResize
        source={errorValidations}
        height={verticalScale(12)}
        width={scale(16)}
      />
    </View>
   
  );
};

InputIconError.propTypes = {
  error: PropTypes.string
};

export default InputIconError;
