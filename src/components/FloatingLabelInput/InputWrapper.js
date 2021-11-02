import React from 'react';
import PropTypes from 'prop-types';
import View from '@components/View';
import Colors from '@styles/Colors';
import Styles from '@components/FloatingLabelInput/styles';
import { useSelector } from 'react-redux';

const InputWrapper = ({ multiInput, numberOfLines, children, isFocused, hasError,borderLight,multiline,styleMultiline,...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <View
      {...props}
      row
      bottom
      style={[
        Styles.wrapper,{borderColor: brandTheme?.blue02??Colors.blue02},
        ...(borderLight ?[{ borderColor: brandTheme?.blue02??Colors?.blue02 }]:[]),
        ...(multiInput ? [{height: 50 * (numberOfLines || 2)}] : []),
        ...(multiline ? [styleMultiline?styleMultiline:{height: 80 }] : []),
        ...(isFocused ? [{ backgroundColor:'transparent',borderColor: brandTheme?.blue02?? Colors.blue02}] : []),
        ...(hasError  === 'pending' ? [] : hasError ? [{borderColor: brandTheme?.error??Colors.error}] : [{borderColor: brandTheme?.success??Colors.success}]),
        
      ]}
    >
      {children}
    </View>
  );
};

InputWrapper.propTypes = {
  children : PropTypes.any,
  hasError : PropTypes.any,
  isFocused: PropTypes.bool,
};

export default InputWrapper;
