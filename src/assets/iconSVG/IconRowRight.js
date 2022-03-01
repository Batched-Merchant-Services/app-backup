import * as React from 'react';
import Svg, { Path,G } from 'react-native-svg';

const IconRowRight = ({
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
      viewBox="0 0 9.192 15.557"
      {...props}
    >
      <Path
        data-name="Fill 1 Copy"
        d="M1.414 0L0 1.415l6.363 6.363L0 14.143l1.414 1.414 7.778-7.779z"
        fill={fill}
      />
    </Svg>
  );
};

export default IconRowRight;



