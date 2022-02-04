import * as React from 'react';
import Svg, { Path,G,Circle } from 'react-native-svg';

const IconAsterisk = ({
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
      <Circle cx="15" cy="15" r="15" fill={fill}></Circle>
      <G data-name="asteriscos copy 2" transform="translate(5 5)">
        <G fill={fillSecondary} data-name="Group 5">
          <Path
            d="M3.125 0v2.664L.817 1.331 0 2.748 2.307 4.08 0 5.412l.817 1.416L3.125 5.5v2.66H4.76V5.5l2.307 1.328.817-1.416L5.577 4.08l2.308-1.332-.818-1.417L4.76 2.664V0z"
            data-name="Fill 1"
          ></Path>
          <Path
            d="M3.125 0v2.664L.818 1.331 0 2.748 2.307 4.08 0 5.412l.818 1.416L3.125 5.5v2.66H4.76V5.5l2.307 1.328.817-1.416L5.577 4.08l2.308-1.332-.818-1.417L4.76 2.664V0z"
            data-name="Fill 2"
            transform="translate(11.825)"
          ></Path>
          <Path
            d="M3.125 0v2.665L.817 1.332 0 2.749 2.307 4.08 0 5.412l.817 1.417L3.125 5.5v2.66H4.76V5.5l2.307 1.329.817-1.416L5.577 4.08l2.308-1.331-.818-1.417L4.76 2.665V0z"
            data-name="Fill 3"
            transform="translate(0 11.367)"
          ></Path>
          <Path
            d="M3.125 0v2.665L.818 1.332 0 2.749 2.307 4.08 0 5.412l.818 1.417L3.125 5.5v2.66H4.76V5.5l2.307 1.329.817-1.416L5.577 4.08l2.308-1.331-.818-1.417L4.76 2.665V0z"
            data-name="Fill 4"
            transform="translate(11.825 11.367)"
          ></Path>
        </G>
      </G>
    </Svg>
  );
};

export default IconAsterisk;
