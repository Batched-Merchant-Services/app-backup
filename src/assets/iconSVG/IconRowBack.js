import * as React from 'react';
import Svg, { Path,G } from 'react-native-svg';

const IconRowBack = ({
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
      viewBox="0 0 15.556 18.899"
      {...props}
    >
      <G
        data-name="Group 11 Copy 4"
        fill="none"
        stroke={fill}
        strokeMiterlimit={10}
        strokeWidth={1}
      >
        <Path
          data-name="Stroke 1"
          d="M7.243 6.486L12.9.829l1.414 1.414L8.657 7.9 7.243 9.314 5.828 7.9.172 2.243 1.586.829z"
          transform="translate(.536 -.121)"
        />
        <Path
          data-name="Stroke 1 Copy"
          d="M7.243 15.485L12.9 9.828l1.414 1.414-5.657 5.657-1.414 1.414-1.415-1.414-5.656-5.657 1.414-1.414z"
          transform="translate(.536 -.121)"
        />
      </G>
    </Svg>
  );
};

export default IconRowBack;



