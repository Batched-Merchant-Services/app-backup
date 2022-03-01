import React from 'react';
import PropTypes from 'prop-types';
import {ImageResize,View} from '@components';
import Styles from '@components/FloatingLabelInput/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import { scale,verticalScale } from 'react-native-size-matters';
import successValidation from '@assets/icons/successValidation.png';
import IconSuccess from '../../assets/iconSVG/IconSuccess';
import { useTheme } from '@react-navigation/native';

const InputIconSuccess = ({ error }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const { colors } = useTheme();

  return (
    <View style={Styles.validations}>
      <IconSuccess  height={verticalScale(16)} width={scale(16)} fill={brandTheme?.success??colors.success} fillSecondary={brandTheme?.white??colors.white}/>
    </View>
   
  );
};

InputIconSuccess.propTypes = {
  error: PropTypes.string
};

export default InputIconSuccess;
