import * as React from 'react';
import Svg, { Path,Ellipse } from 'react-native-svg';

const IconRightRow = ({
  fill,
  fillSecondary,
  height,
  width,
  ...props
}) => {

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      data-name="Group 3"
      viewBox="0 0 9 16"
      xmlSpace="preserve" 
      height={height} 
      width={width}
    >
      <Path
        fill={fill}
        d="M1.384 0L0 1.455 6.23 8 0 14.546 1.384 16 9 8z"
        data-name="Fill 1 Copy"
      ></Path>
    </Svg>
  );
};

export default IconRightRow;
