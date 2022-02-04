import * as React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

const IconKey = ({
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
      data-name="Group 4"
      viewBox="0 0 30 30"
      height={height}
      width={width}
    >
      <Circle
        cx="15"
        cy="15"
        r="15"
        fill={fill}
        data-name="Oval Copy"
      ></Circle>
      <G data-name="Llave Copy" transform="rotate(-50 23.905 7.334)">
        <Path
          fill={fillSecondary}
          d="M5.856 11.713a5.856 5.856 0 01-4.141-10A5.851 5.851 0 019.049.949 5.878 5.878 0 0111.17 3.4h11.323a.225.225 0 01.187.1l2.05 2.228a.224.224 0 010 .244l-2.05 2.235a.225.225 0 01-.187.1h-.633a.222.222 0 01-.176-.086l-.784-1a.224.224 0 00-.352 0l-.784 1a.222.222 0 01-.176.086H18a.222.222 0 01-.176-.086l-.784-1a.224.224 0 00-.352 0l-.851 1.089h-.556l-.851-1.09a.224.224 0 00-.353 0l-.784 1a.223.223 0 01-.177.086H11.17a5.878 5.878 0 01-2.121 2.455 5.818 5.818 0 01-3.193.952zM3.949 3.858a1.8 1.8 0 101.8 1.8 1.8 1.8 0 00-1.8-1.8z"
          data-name="Fill 1"
        ></Path>
      </G>
    </Svg>
  );
};

export default IconKey;
