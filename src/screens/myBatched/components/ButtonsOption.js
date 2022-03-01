import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Text, Divider, ImageResize } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector,useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Styles from '../styles';

const ButtonsOption = ({ status, onPress, label,IconImage, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const { colors } = useTheme();
  return (
      <View flex-1 row paddingH-3>
        <View flex-1 column>
          <TouchableOpacity style={Styles.buttons} onPress={onPress}>
            <IconImage  height={verticalScale(18)} width={scale(18)} fill={status ? brandTheme?.white??colors.white : brandTheme?.blue02??colors.blue02}/>
            {/* <ImageResize
              tintColor={status  ? brandTheme?.white??colors.white : brandTheme?.blue02??colors.blue02} 
              source={image}
              height={verticalScale(18)}
              width={scale(18)}
            /> */}
            <Divider width-10 />
            <Text h12 regular style={{color:status  ? brandTheme?.white??colors.white : brandTheme?.blue02??colors.blue02}}>{label}</Text>
          </TouchableOpacity>
          <Divider height-2 />
          <View height-3 style={{backgroundColor:status  ? brandTheme?.white??colors.white : 'transparent'}} />
        </View>
      </View>
  );
};

export default ButtonsOption;
