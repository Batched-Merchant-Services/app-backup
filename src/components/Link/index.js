import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Text from '@components/Text';
import Styles from '@components/Link/styles';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const Link = ({ children, linkStyle = {}, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <TouchableOpacity {...props}>
      <Text center h12 medium style={[Styles.text,linkStyle,{color: brandTheme?.blue02??Colors?.blue02}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  children: PropTypes.any
};

export default Link;
