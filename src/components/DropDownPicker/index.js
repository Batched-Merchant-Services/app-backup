import React, { useState, useEffect } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import { View, Text, Divider } from '@components';
import Styles from './styles';
import { useSelector } from 'react-redux';
import InputError from '@components/FloatingLabelInput/InputError';
import InputIconError from '@components/FloatingLabelInput/InputIconError';
import InputIconSuccess from '@components/FloatingLabelInput/InputIconSuccess';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import i18n from '@utils/i18n';

const DropDownPicker = ({ error, label, value, options, size, onSelect, languages, onFill, labelDefault, navigation,...props }) => {

  const [width, setWidth] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(false);
  const [styleBackground] = useState(brandTheme?.blue03 ?? Colors.blue03);
  const [styleBorder] = useState(brandTheme?.blue02 ?? Colors.blue02);
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;

  useEffect(() => {
      getTypeIdentity();
  }, [options])


  function getTypeIdentity() {
    if (options) {
      if (options?.length > 0) {
        const valueCountry = options?.filter(key => key?.name === labelDefault);
        if (valueCountry?.length > 0) {
          onSelect(valueCountry[0]);
        }
      }
    }
  }


  const handleSelect = index => {
    setSelectValue(true);
    onSelect(options[index]);
  };


  const handleWillShowHide = index => {
    setOpen(true);
  }

  const handleWrapperLayout = event => {
    const layout = event.nativeEvent.layout;
    setWidth(layout.width);
  };

  const handleAdjustFrame = (style, showInBottom) => {

    style.width = width;
    if (showInBottom) {
      style.height = verticalScale(1 * options?.length + 130, 0.40);
      style.left = style.left - verticalScale(7, 0);
      style.top = Platform.OS === 'ios' ? style.top = style.top - verticalScale(2, 0.3) : style.top - verticalScale(29);
    } else {
      style.height = style.height- verticalScale(1 * options?.length + 40, 0);
      style.left = style.left - verticalScale(7, 0);
      style.top = Platform.OS === 'ios' ? style.top = style.top - verticalScale(2, 0.3) : style.top + style.height - verticalScale(135);
    }
    return style;
  };

  const dropdownRenderRow = ({ name, value }) => {
    return (
      <View flex-1 centerV height-45 >
        <Text h13 white>{name}</Text>
      </View>

    );
  };

  const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    if (rowID == options?.length - 1) return;
    return <View flex-1 blue04 height-1 />

  }

  const renderButtonText = (rowData) => {
    const { name, value } = rowData;
    return (
      <View flex-1 marginL-2 marginB-4>
        <Text h12 white>{name}</Text>
      </View>

    );
  };

  const dropSize = { width: !size ==='lg' ? getSize(size): getSize(width) };

  return (
    <View onLayout={handleWrapperLayout}>
      <View style={[
        Styles.dropDown, dropSize, { borderColor: styleBorder, backgroundColor: styleBackground },
        ...(error === 'pending' ? [] : error ? [{ borderColor: brandTheme?.error ?? Colors.error }] : [{ borderColor: brandTheme?.success ?? Colors.success }])
      ]}>
        <View marginL-2 marginB-4>
          <Text h11 blue02>{label}</Text>
        </View>
        <ModalDropdown
          options={options}
          //defaultValue={labelDefault ? labelDefault : i18n.t('General.dropDownSelectOption')}
          defaultValue={<View height-20 style={{width:width}}><Text white h11>{labelDefault ? labelDefault : i18n.t('General.dropDownSelectOption')}</Text></View>}
          onSelect={handleSelect}
          onDropdownWillHide={handleWillShowHide}
          renderSeparator={(rowID) => renderSeparator(rowID)}
          renderButtonText={(rowData) => renderButtonText(rowData)}
          adjustFrame={handleAdjustFrame}
          style={{ flex: 1 }}
          textStyle={{ color: brandTheme?.white ?? Colors.white, fontSize: 14 }}
          renderRow={(rowData) => dropdownRenderRow(rowData)}
          dropdownStyle={[Styles.dropdownContainer, { backgroundColor: styleBackground, borderColor: styleBorder }]}
          isFullWidth={true}
          keyboardShouldPersistTaps={'always'}
        />

        <View row style={{ position: 'absolute', right: 10, top: 16 }}>
          <Text blue02 h14>▼</Text>
          <Divider width-10 />
          {error && error !== 'pending' && (
            <InputIconError error={error} />
          )}

          {!error && error !== 'pending' && (
            <InputIconSuccess error={error} />
          )}
        </View>
      </View>
      <InputError error={error} />
    </View>
  );
};
function getSize(size) {
  return {
    ll: scale(120),
    sm: scale(138),
    md: scale(280),
    lg: scale(size)
  }[size];
}

DropDownPicker.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onFill: PropTypes.func,
  labelDefault: PropTypes.string,
  size: PropTypes.oneOf(['ll', 'sm', 'md', 'lg'])
};
DropDownPicker.defaultProps = {
  size: 'lg',
  value: {},
  options:null
};

export default DropDownPicker;