import React from 'react';
import { View, Text, Divider, ImageResize, ButtonRounded } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import empty from '@assets/icons/empty.png';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import i18n from '@utils/i18n';
import EmptySectionImage from '../assets/iconSVG/EmptySectionImage';

const EmptyState = ({ navigation, step, onPress, label }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const { colors } = useTheme();
  return (
    <View flex-1 centerH centerV marginH-30>
      <Text h16 blue02 regular center>{i18n.t('General.textEmptyState')}</Text>
      <Divider height-30 />
      <EmptySectionImage  height={verticalScale(180)} width={scale(180)} fill={brandTheme?.blue02??colors.blue02}/>
    </View>
  );
};

export default EmptyState;
