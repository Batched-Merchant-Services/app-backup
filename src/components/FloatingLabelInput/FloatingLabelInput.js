import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextInput, TouchableHighlight,TouchableOpacity,Platform } from 'react-native';
import { scale as RnScale,verticalScale } from 'react-native-size-matters';
import { View,Text,ImageResize,Divider } from '@components';
import { useTimingValue } from '@hooks/animation-hooks';
import InputWrapper from '@components/FloatingLabelInput/InputWrapper';
import InputError from '@components/FloatingLabelInput/InputError';
import InputIconError from '@components/FloatingLabelInput/InputIconError';
import InputIconSuccess from '@components/FloatingLabelInput/InputIconSuccess';
import FloatingLabel from '@components/FloatingLabelInput/FloatingLabel';

import Colors from '@styles/Colors';
import Styles from '@components/FloatingLabelInput/styles';
import { useSelector } from 'react-redux';
import hidePassword from '@assets/icons/hidePassword.png';




const FloatingLabelInput = ({
  label,
  error,
  value,
  secureTextEntry,
  onBlur,
  onChangeText,
  onFocus,
  multiInput,
  multiline,
  numberOfLines,
  borderLight,
  style = {},
  ...props
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  // Animation value for the label
  const [scale, toMin, toMax] = useTimingValue({ min: 0, max: 1, time: 170 });
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(secureTextEntry);
  const inputRef = useRef(null);
  // On mount if theres a value, label should be up
  
  useEffect(() => {
    value && toMax({ immediately: true });
  }, []);

  // Focus handler
  const handleFocus = () => {

    setIsFocused(true);
    toMax();
    onFocus && onFocus();
  };

  // Blur handler
  const handleBlur = () => {
    setIsFocused(false);
    !value && toMin();
    onBlur && onBlur();
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleChangePass = () => {
    setShowPass(!showPass);
  };
 
  if (value) {
    toMax();
  }

  return (
    <>
        <TouchableHighlight onPress={focusInput} underlayColor={'transparent'}>
          <Fragment>
            <InputWrapper
              {...props}
              numberOfLines={numberOfLines}
              multiInput={multiInput}
              isFocused={isFocused}
              hasError={error}
              borderLight={borderLight}
              multiline={multiline}
            >
              <FloatingLabel label={label} scale={scale} />
                <View row>
                  <View flex-1>
                    <TextInput
                      {...props}
                      onChangeText={onChangeText}
                      ref={inputRef}
                      blurOnSubmit
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      selectionColor={brandTheme?.white??Colors.white}
                      style={[
                        Styles.input,{color: brandTheme?.white??Colors.white},
                        style
                      ]}
                      secureTextEntry={showPass}
                      value={value}
                      multiline={multiline}
                      numberOfLines={numberOfLines}
                    />
                  </View>
                  <View row paddingB-9 >
                     {secureTextEntry && (
                      <TouchableOpacity
                        onPress={handleChangePass}
                        style={Styles.containerShow}
                      >
                        {showPass ? 
                          <ImageResize
                            source={hidePassword}
                            height={verticalScale(12)}
                            width={RnScale(16)}
                          />:
                          <ImageResize
                            source={hidePassword}
                            height={verticalScale(12)}
                            width={RnScale(16)}
                          />
                        }
                      </TouchableOpacity>)} 
                      <Divider width-5 />
                      {error&& error !== 'pending' &&(
                        <InputIconError error={error} />
                      )}
                      
                      {!error&& error !== 'pending' &&(
                        <InputIconSuccess error={error} />
                      )}
                  </View>
                </View>
               
            </InputWrapper>
            <InputError error={error} />
          </Fragment>
        </TouchableHighlight>
    </>
  );
};

FloatingLabelInput.propTypes = {
  label          : PropTypes.string.isRequired,
  error          : PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value          : PropTypes.any,
  onBlur         : PropTypes.func,
  onChangeText   : PropTypes.func,
  onFocus        : PropTypes.func
};

export default FloatingLabelInput;
