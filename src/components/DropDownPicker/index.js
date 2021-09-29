import React,{useState} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import { View,Text } from '@components';
import Styles from './styles';
import { useSelector} from 'react-redux';
import InputError from '@components/FloatingLabelInput/InputError';
import { moderateScale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const DropDown = ({ error, label, value, options, size,onSelect, languages,onFill , ...props }) => {

  const [width, setWidth] = useState(null);
  const [open, setOpen] = useState(false);
  const [styleBackground] = useState( brandTheme?.blue03??Colors.blue03);
  const [styleBorder] = useState( brandTheme?.blue02??Colors.blue02);
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;
  

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
      style.top = Platform.OS === 'ios' ? style.top = style.top - verticalScale(3, 0.3) :  style.top - verticalScale(30);
    } else {
      style.height = verticalScale(1 * options.length + 65, 0.40);
      style.left = style.left - verticalScale(7, 0);
      style.top = Platform.OS === 'ios' ? style.top = style.top - verticalScale(-17, 0.3) :  style.top + style.height - verticalScale(135);
    }
    return style;
  };

  const dropdownRenderRow = ({ name,value }) => {
    return (
      <View centerV style={{height:40 }}>
         <Text h12 blue02>{name}</Text>
      </View>
    
    );
  };

  const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    if (rowID == options.length - 1) return;
    return <View flex-1 blue04 height-1/>
    
  }

  const renderButtonText = (rowData) => {
    const {name, value} = rowData;
    return  (<Text h12 blue02>{name}</Text>);
  };

  return (
    <View onLayout={handleWrapperLayout}>
      {/* <View marginL-2 marginB-4>
      <Text h12 white>{label}</Text>
      </View> */}
      <View row style={[
            Styles.dropDown,{ borderColor: styleBorder},
            ...(error ? [{ borderColor: brandTheme?.error??Colors.error}] : [])
          ]}>
        <ModalDropdown
          options={options}
          defaultValue={label}
          onDropdownWillShow={handleWillShowHide}
          onDropdownWillHide={handleWillShowHide}
          renderSeparator={(rowID) => renderSeparator(rowID)}
          renderButtonText={(rowData) => renderButtonText(rowData)}
          adjustFrame={handleAdjustFrame}
          style={{flex:1,height:'100%',justifyContent:'center'}}
          textStyle={{color: brandTheme?.blue02??Colors.blue02}}
          renderRow={(rowData)=> dropdownRenderRow(rowData)}
          dropdownStyle={[Styles.dropdownContainer,{backgroundColor: styleBackground,borderColor: styleBorder}]}
        />
        <Text blue02 h14 style={{position:'absolute',right:10,top:16}}>▼</Text>
      </View>
      
      <InputError error={error} />
    </View>
  );
};

DropDown.propTypes = {
  label   : PropTypes.string,
  error   : PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options   : PropTypes.array.isRequired,
  onFill  : PropTypes.func.isRequired,
  size    : PropTypes.oneOf(['ll', 'sm', 'md', 'lg'])
};
DropDown.defaultProps = {
  size : 'md',
  value: {}
};

export default DropDown;