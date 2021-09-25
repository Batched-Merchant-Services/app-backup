import React,{useState} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import { View,Text } from '@components';
import Styles from './styles';
import { useSelector} from 'react-redux';
import InputError from '@components/FloatingLabelInput/InputError';
import Colors from '@styles/Colors';

const DropDown = ({ error, label, value, options, size,onSelect, languages,onFill , ...props }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [styleBackground] = useState('transparent');
  const [styleBorder] = useState( brandTheme?.blue02??Colors.blue02);
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;



  return (
    <View>
      <ModalDropdown
        options={items}
        style={[
          Styles.dropDown,{ borderColor: styleBorder},
          ...(error ? [{ borderColor: brandTheme?.red??Colors.red}] : [])
        ]}
        dropdownStyle={[Styles.dropdownContainer,{backgroundColor: styleBackground,borderColor: styleBorder}]}
        isFullWidth={true}
        showSearch
      />
       <View style={{ position: "absolute", right: 10, top: 20}}><Text>▼</Text></View>
      <InputError error={error} />
    </View>
  );
};

DropDown.propTypes = {
  label   : PropTypes.string,
  error   : PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options : PropTypes.array.isRequired,
  onFill  : PropTypes.func.isRequired,
  size    : PropTypes.oneOf(['ll', 'sm', 'md', 'lg'])
};
DropDown.defaultProps = {
  size : 'md',
  value: {}
};

export default DropDown;