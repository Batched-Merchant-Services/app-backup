import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import { View } from '@components';
import { useSelector} from 'react-redux';
import Styles from './styles';
import { TouchableOpacity } from 'react-native';

const ButtonRounded = ({
  size = 'sm',
  blue,
  dark,
  disabled,
  children,
  style = {},
  isLoading,
  containerStyle ={},
  ...props
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  

  const btnSize = { width: getBtnSize(size) };

  const blueColor = disabled
    ? [brandTheme?.blue01??Colors.blue01, brandTheme?.blue01??Colors.blue01]
    : [brandTheme?.blue02??Colors.blue02, brandTheme?.blue02??Colors.blue02];

  const linearColorBlue = disabled
    ? [brandTheme?.blue02??Colors.blue02 , brandTheme?.blue04??Colors.blue04]
    : [brandTheme?.blue02??Colors.blue02 , brandTheme?.blue04??Colors.blue04 ];

  const darkBlue = disabled
    ? ['transparent', 'rgba(0, 0, 0, 0.5)']
    : ['transparent', 'rgba(0, 0, 0, 0.5)'];




  let backgroundGradient;
  let colorText;
  switch (true) {
  case linearColorBlue:
    backgroundGradient = linearColorBlue;
    colorText = Colors.white
    break;
  case blue:
    backgroundGradient = blueColor;
    colorText = Colors.white
    break;
  case dark:
    backgroundGradient = darkBlue;
    colorText = Colors.blue02
    break;
  default:
    backgroundGradient = linearColorBlue;
    colorText = Colors.white
  }
  return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={backgroundGradient}
        style={[Styles.wrapper, style,btnSize]}
      >
       <TouchableOpacity style={[Styles.wrapper, btnSize, containerStyle]} {...props}>
          {/* {isLoading ? <Bubbles size={5} color={brandTheme.white??Colors.white} /> : children} */}
          { children }
      </TouchableOpacity>
      </LinearGradient>
  );
};

function getBtnSize(size) {
  const sizes = {
    lg : scale(320),
    md : scale(250),
    sm : scale(15),
  };
  return sizes[size];
}

export default ButtonRounded;
