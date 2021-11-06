import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconWarning = ({
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
      viewBox="0 0 16 16"
    >
        <Path
          fill={fill}
          d="M6.6.866L.165 13.748A1.559 1.559 0 001.57 16h12.86a1.559 1.559 0 001.4-2.252L9.4.866a1.572 1.572 0 00-2.8 0z"
          data-name="Stroke 3"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M1.243 9.168a1.228 1.228 0 01-.886-.344A1.12 1.12 0 010 7.989a1.087 1.087 0 01.349-.822 1.253 1.253 0 01.894-.33 1.253 1.253 0 01.894.33 1.087 1.087 0 01.35.822 1.12 1.12 0 01-.356.835 1.232 1.232 0 01-.888.344zm.8-3.251H.44L.039 0h2.408l-.4 5.917z"
          data-name="!"
          transform="translate(7 5)"
        ></Path>
    </Svg>
  );
};

export default IconWarning;