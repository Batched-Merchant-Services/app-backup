import React from 'react';
import { View, Text, Divider, ImageResize, ButtonRounded } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import empty from '@assets/icons/empty.png';

import Styles from './styles';
import i18n from '@utils/i18n';

const EmptyState = ({ navigation, step, onPress, label }) => {
  return (
    <View flex-1 centerH centerV marginH-30>
      <Text h16 blue02 regular center>{i18n.t('General.textEmptyState')}</Text>
      <Divider height-30 />
      <ImageResize
        source={empty}
        height={verticalScale(180)}
        width={scale(180)}
      />
    </View>
  );
};

export default EmptyState;
