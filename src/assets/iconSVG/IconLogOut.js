import * as React from 'react';
import Svg, { Path,Circle } from 'react-native-svg';

const IconLogOut = ({
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
      viewBox="0 0 14 16"
      {...props}
    >
      <Path
        data-name="Fill 1"
        d="M14 16H0V0h14v16zM10 2v12h2V2zM2 2v12h6V2z"
        fill={fill}
      />
      <Circle
        cx={0.5}
        cy={0.5}
        r={0.5}
        transform="translate(6 7)"
        fill={fill}
        stroke={fill}
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default IconLogOut;



