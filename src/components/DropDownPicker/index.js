import React, { useState } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import { View, Text } from '@components';
import Styles from './styles';
import { useSelector } from 'react-redux';
import InputError from '@components/FloatingLabelInput/InputError';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const DropDownPicker = ({ error, label, value, options, size, onSelect, languages, onFill, ...props }) => {

  const [width, setWidth] = useState(null);
  const [open, setOpen] = useState(false);
  const [styleBackground] = useState(brandTheme?.blue03 ?? Colors.blue03);
  const [styleBorder] = useState(brandTheme?.blue02 ?? Colors.blue02);
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;

  console.log('error',error);
  const handleSelect = index => {
    onSelect(options[index]);
    if (onFill) {
      onFill(options[index]);
    }

  };


  const handleWillShowHide = () => setOpen(!open);

  const handleWrapperLayout = event => {
    const layout = event.nativeEvent.layout;
    setWidth(layout.width);
  };

  const handleAdjustFrame = (style, showInBottom) => {

    style.width = width;
    if (showInBottom) {
      style.height = verticalScale(1 * options.length + 65, 0.40);
      style.left = style.left - verticalScale(7, 0);
      style.top = Platform.OS === 'ios' ? style.top = style.top - verticalScale(3, 0.3) : style.top - verticalScale(30);
    } else {
      style.height = verticalScale(1 * options.length + 65, 0.40);
      style.left = style.left - verticalScale(7, 0);
      style.top = Platform.OS === 'ios' ? style.top = style.top - verticalScale(-14, 0.3) : style.top + style.height - verticalScale(135);
    }
    return style;
  };

  const dropdownRenderRow = ({ name, value }) => {
    return (
      <View centerV style={{ height: 45}}>
        <Text h13 white>{name}</Text>
      </View>

    );
  };

  const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    if (rowID == options.length - 1) return;
    return <View flex-1 blue04 height-1 />

  }

  const renderButtonText = (rowData) => {
    const { name, value } = rowData;
    return (
      <View width-300 marginL-2 marginB-4>
        <Text h13 white>{name}</Text>
      </View>
     
    );
  };

  return (
    <View onLayout={handleWrapperLayout}>
      {/* <View marginL-2 marginB-4>
      <Text h12 white>{label}</Text>
      </View> */}
      <View flex-1 style={[
        Styles.dropDown, { borderColor: styleBorder },
        ...(error ? [{ borderColor: brandTheme?.error ?? Colors.error }] : [])
      ]}>
        <View marginL-2 marginB-4>
          <Text h11 blue02>{label}</Text>
        </View>
        <ModalDropdown
          options={options}
          defaultValue='Select Option'
          onDropdownWillShow={handleWillShowHide}
          onDropdownWillHide={handleWillShowHide}
          renderSeparator={(rowID) => renderSeparator(rowID)}
          renderButtonText={(rowData) => renderButtonText(rowData)}
          adjustFrame={handleAdjustFrame}
          style={{ flex: 1, height: '100%', }}
          textStyle={{ color: brandTheme?.white ?? Colors.white,fontSize:14 }}
          renderRow={(rowData) => dropdownRenderRow(rowData)}
          dropdownStyle={[Styles.dropdownContainer, { backgroundColor: styleBackground, borderColor: styleBorder }]}
          isFullWidth={true}
          keyboardShouldPersistTaps={'always'}
        />
        <Text blue02 h14 style={{ position: 'absolute', right: 10, top: 16 }}>▼</Text>
      </View>
      <InputError error={error} />
    </View>
  );
};

DropDownPicker.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onFill: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['ll', 'sm', 'md', 'lg'])
};
DropDownPicker.defaultProps = {
  size: 'md',
  value: {}
};

export default DropDownPicker;