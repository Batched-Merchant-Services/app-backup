import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconLineDotted = ({
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
      viewBox="0 0 330 1"
      {...props}
    >
      <Path
        data-name="Line 3 Copy 2"
        d="M.5.5h320"
        fill="none"
        stroke={fill}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
    </Svg>
  );
};

export default IconLineDotted;


