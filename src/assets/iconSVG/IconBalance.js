import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconBalance = ({
  fill,
  fillSecondary,
  height,
  width,
  ...props
}) => {

  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19 18"
    {...props}
  >
    <Path
      d="M19 2.5v13h-1v-13A1.538 1.538 0 0016.5 1h-14A1.538 1.538 0 001 2.5v13A1.538 1.538 0 002.5 17H15V8.5A1.538 1.538 0 0013.5 7H4a2 2 0 010-4h11.5v1H4a.945.945 0 00-1 1 .945.945 0 001 1h9.5A2.476 2.476 0 0116 8.5V18H2.5A2.476 2.476 0 010 15.5v-13A2.476 2.476 0 012.5 0h14A2.476 2.476 0 0119 2.5zM12 14a2 2 0 112-2 2.006 2.006 0 01-2 2zm0-1a1 1 0 10-1-1 .945.945 0 001 1z"
      fill={fill}
    />
  </Svg>
  );
};

export default IconBalance;


