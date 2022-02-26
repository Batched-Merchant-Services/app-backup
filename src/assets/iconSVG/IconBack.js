import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconBack = ({
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
      viewBox="0 0 32 32"
    >
      <Path
        fill={fill}
        d="M29.5 0h-27A2.476 2.476 0 000 2.5v27A2.476 2.476 0 002.5 32h27a2.476 2.476 0 002.5-2.5v-27A2.476 2.476 0 0029.5 0zM31 29.5a1.538 1.538 0 01-1.5 1.5h-27A1.538 1.538 0 011 29.5v-27A1.538 1.538 0 012.5 1h27A1.538 1.538 0 0131 2.5zM18.2 7.8L10 16.1l8.2 8.2 2.2-2.2-6-6 6-6zm.8 14.3l-.8.8-6.8-6.8 6.8-6.8.8.7-6 6z"
      ></Path>
    </Svg>
  );
};

export default IconBack;


