import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import { View } from '@components';
import { useSelector} from 'react-redux';
import Styles from './styles';
import { TouchableOpacity } from 'react-native';

const ButtonRounded = ({
  size,
  blue,
  dark,
  green,
  success,
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
  console.log('size',size)

  const btnSize = { width: getBtnSize(size) };

  const blueColor = disabled
    ? [brandTheme?.blue02??Colors.blue02, brandTheme?.blue02??Colors.blue02]
    : [brandTheme?.blue02??Colors.blue02, brandTheme?.blue02??Colors.blue02];

  const linearColorBlue = disabled
    ? [brandTheme?.blue02??Colors.blue02 , brandTheme?.blue04??Colors.blue04]
    : [brandTheme?.blue02??Colors.blue02 , brandTheme?.blue04??Colors.blue04 ];

  const successButton = disabled
    ? [brandTheme?.green??Colors.green , brandTheme?.green??Colors.green]
    : [brandTheme?.green??Colors.green , brandTheme?.green??Colors.green ];


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
  case blue:
    backgroundGradient = blueColor;
    break;
  case dark:
    backgroundGradient = darkBlue;
    break;
  case success:
    backgroundGradient = successButton;
    break;
  case green:
    backgroundGradient = greenButton;
    break;
  default:
    backgroundGradient = linearColorBlue;
  }
  return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={backgroundGradient}
        style={[Styles.wrapper, style,btnSize,
        dark?Styles.borderDark:[],
        disabled?Styles.disableColor:[],
        green?Styles.greenBorder:[],
        !size?{paddingHorizontal:verticalScale(15)} :[] ]}
      >
      <TouchableOpacity disabled={disabled} style={[Styles.wrapper, containerStyle,{width:'100%'}]}  {...props}>
        { children }
      </TouchableOpacity>
      </LinearGradient>
  );
};

function getBtnSize(size) {
  const sizes = {
    lg : scale(310),
    md : scale(250),
    sm : scale(150),
  };
  return sizes[size];
}

export default ButtonRounded;
