import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconHistory = ({
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
    viewBox="0 0 18 19"
    {...props}
  >
    <Path
      d="M.5.5v18H10c4.1 0 7.5-3.4 7.5-7.5V.5H.5zm16 10.5c0 3.6-2.9 6.5-6.5 6.5H1.5v-16h15V11zM11 6H3V5h8v1zm3 6H3v-1h11v1zm0-3H3V8h11v1z"
      fill={fill}
    />
  </Svg>
  );
};

export default IconHistory;


