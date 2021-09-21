import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-animatable';
import Styles from '@components/FloatingLabelInput/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const InputError = ({ error }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  return (
    <Text allowFontScaling={false} animation="fadeIn" style={[Styles.error,{color: brandTheme.red??Colors.red}]}>
      {error}
    </Text>
  );
};

InputError.propTypes = {
  error: PropTypes.string
};

export default InputError;
