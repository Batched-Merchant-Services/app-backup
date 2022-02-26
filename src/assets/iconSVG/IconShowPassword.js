import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconShowPassword = ({
  fill,
  fillSecondary,
  height,
  width,
  ...props
}) => {

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height} 
      width={width}
      xmlSpace="preserve" 
      viewBox="0 0 15.4 10"
    >
     <Path
        fill={fill}
        d="M15.4 3.8C13 1.4 10.5.1 8 0h-.6C4.9.1 2.4 1.4 0 3.8L1.2 5 0 6.2C2.5 8.7 5.1 10 7.7 10s5.2-1.3 7.7-3.8L14.2 5zM1.6 5a13.978 13.978 0 012.6-2c0 .2-.1.3-.1.5A3.7 3.7 0 007.7 7a3.543 3.543 0 003.5-3.5.9.9 0 00-.1-.5 15.1 15.1 0 012.6 2c-4 4-8 4-12.1 0z"
      ></Path>
    </Svg>
  );
};

export default IconShowPassword;
