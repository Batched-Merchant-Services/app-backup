import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import { View } from '@components';
import { useSelector } from 'react-redux';
import Styles from './styles';
import { TouchableOpacity } from 'react-native';
import Ripple from 'react-native-advanced-ripple'
const ButtonRounded = ({
  size,
  blue,
  dark,
  green,
  success,
  changeColor,
  disabled,
  children,
  style = {},
  isLoading,
  containerStyle = {},
  ...props
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const btnSize = { width: getBtnSize(size) };

  const blueColor = disabled
    ? [brandTheme?.blue02 ?? Colors.blue02, brandTheme?.blue02 ?? Colors.blue02]
    : [brandTheme?.blue02 ?? Colors.blue02, brandTheme?.blue02 ?? Colors.blue02];

  const linearColorBlue = disabled
    ? [brandTheme?.blue02 ?? Colors.blue02, brandTheme?.blue04 ?? Colors.blue04]
    : [brandTheme?.blue02 ?? Colors.blue02, brandTheme?.blue04 ?? Colors.blue04];

  const successButton = disabled
    ? [brandTheme?.green ?? Colors.green, brandTheme?.green ?? Colors.green]
    : [brandTheme?.green ?? Colors.green, brandTheme?.green ?? Colors.green];


  const greenButton = disabled
    ? ['transparent', 'rgba(0, 0, 0, 0.1)']
    : ['transparent', 'rgba(0, 0, 0, 0.0)'];


  const darkBlue = disabled
    ? ['transparent', 'rgba(0, 0, 0, 0.1)']
    : ['transparent', 'rgba(0, 0, 0, 0.0)'];




  let backgroundGradient;
  switch (true) {
    case linearColorBlue:
      backgroundGradient = linearColorBlue;
      break;
    case blue || changeColor === 'blue':
      backgroundGradient = blueColor;
      break;
    case dark || changeColor === 'dark':
      backgroundGradient = darkBlue;
      break;
    case success || changeColor === 'success':
      backgroundGradient = successButton;
      break;
    case green || changeColor === 'green':
      backgroundGradient = greenButton;
      break;
    default:
      backgroundGradient = linearColorBlue;
  }
  return (
    <Ripple color={'rgb(0, 106, 200)'} centered={true} disabled={disabled} {...props}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={backgroundGradient}
      style={[Styles.wrapper, style, btnSize,
      dark || changeColor === 'dark' ? [Styles.borderDark,style] : [],
      disabled || changeColor === 'disabled' ?[ Styles.disableColor,style] : [],
      green || changeColor === 'green' ? [Styles.greenBorder,style] : [],
      ]}
    >
      
        <TouchableOpacity 
          style={[Styles.wrapper,
            containerStyle, { width: '100%' },
          !size ? { paddingHorizontal: verticalScale(15) } : []
          ]}
          disabled={disabled}
          {...props}>
          {children}
        </TouchableOpacity>
    
    </LinearGradient>
    </Ripple>
  );
};

function getBtnSize(size) {
  let sizeMd;
  const sizes = {
    lg: scale(310),
    md: scale(250),
    sm: scale(150),
  };

  switch (size) {
    case 'lg':
      sizeMd = false;
      break;
    case 'sm':
      sizeMd = false;
      break;
    case 'md':
      sizeMd = false;
      break;
    default:
      sizeMd = true;
  }

  return sizeMd ? size?parseInt(size):size : sizes[size];
}

export default ButtonRounded;
