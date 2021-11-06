import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import Styles from './styles';
import { ImageResize, View, Text } from '@components';
import check from '@assets/icons/white-check.png';
import InputError from '@components/FloatingLabelInput/InputError';
import { Divider } from '..';

const Checkbox = ({ checkedValue, error, onChange, onSelect, label, value, ...props }) => {
  const [checked, setOnchange] = useState(value);

  function onCheckmarkPress() {
    setOnchange(!checked);
    onSelect(!checked);
  }

  return (
    <>
      <View row >
        <Pressable
          style={[Styles.checkboxBase, checked && Styles.checkboxChecked]}
          onPress={onCheckmarkPress}>
          {checked && <ImageResize source={check} width={verticalScale(13)} height={verticalScale(13)} />}
        </Pressable>
        <Divider width-10 />
        <Text h12 white>{label}</Text>
      </View>
      <InputError error={error} />
    </>
  )
};

export default Checkbox;