import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconLineVertical = ({
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
      {...props}
      viewBox="0 0 1 35"
    >
      <Path
        fill={fill}
        d="M0 20h1v3H0zm0 11h1v-3H0zm0-4h1v-3H0zm0 8h1v-3H0zm0-20h1v-3H0zm0-8h1V4H0zm0 4h1V8H0zm0 8h1v-3H0zM0 0v3h1V0z"
        data-name="Line (1)"
      ></Path>
    </Svg>
  );
};

export default IconLineVertical;



