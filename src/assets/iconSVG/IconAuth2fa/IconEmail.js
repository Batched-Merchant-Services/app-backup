import * as React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

const IconEmail = ({
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
        data-name="Oval Copy 2"
      ></Circle>
      <G transform="translate(6 8)">
        <G data-name="Group 10">
          <Path
            fill={fillSecondary}
            d="M.221 14.483A.219.219 0 010 14.264v-.82a.22.22 0 01.088-.176l7.641-5.724a.219.219 0 01.27 0l1.276 1.038a.219.219 0 00.276 0l1.277-1.033a.219.219 0 01.27 0l7.641 5.724a.22.22 0 01.088.176v.82a.219.219 0 01-.219.219zM18.469 11.8l-6.346-4.958a.22.22 0 010-.343l6.346-5.207a.22.22 0 01.359.17v10.163a.22.22 0 01-.22.22.216.216 0 01-.139-.045zM0 11.625V1.462a.219.219 0 01.359-.17L6.708 6.5a.219.219 0 010 .342L.358 11.8a.216.216 0 01-.134.047.22.22 0 01-.224-.222zM9.275 7.23L.9.389A.219.219 0 011.04 0h16.746a.219.219 0 01.139.389L9.552 7.23a.22.22 0 01-.277 0z"
            data-name="Fill 9"
          ></Path>
        </G>
      </G>
    </Svg>
  );
};

export default IconEmail;
