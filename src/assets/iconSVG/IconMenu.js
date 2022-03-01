import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconMenu = ({
  fill,
  fillSecondary,
  height,
  width,
  ...props
}) => {

  return (
    <Svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={width}
    height={height}
    {...props}
  >
    <Path
      d="M30.5 0h-29C.7 0 0 .7 0 1.5V4c0 .8.7 1.5 1.5 1.5h29c.8 0 1.5-.7 1.5-1.5V1.5c0-.8-.7-1.5-1.5-1.5zm.5 4c0 .3-.2.5-.5.5h-29c-.3 0-.5-.2-.5-.5V1.5c0-.3.2-.5.5-.5h29c.3 0 .5.2.5.5V4zm-.5 9.2h-29c-.8 0-1.5.7-1.5 1.5v2.5c0 .8.7 1.5 1.5 1.5h29c.8 0 1.5-.7 1.5-1.5v-2.5c0-.8-.7-1.5-1.5-1.5zm.5 4.1c0 .3-.2.5-.5.5h-29c-.3 0-.5-.2-.5-.5v-2.5c0-.3.2-.5.5-.5h29c.3 0 .5.2.5.5v2.5zm-16.5 9.2h-13c-.8 0-1.5.7-1.5 1.5v2.5c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5V28c0-.8-.7-1.5-1.5-1.5zm.5 4c0 .3-.2.5-.5.5h-13c-.3 0-.5-.2-.5-.5V28c0-.3.2-.5.5-.5h13c.3 0 .5.2.5.5v2.5zM2.2 2.3H30v1H2.2v-1zm0 13.2H30v1H2.2v-1zm-.3 13.2h12.2v1H1.9v-1z"
      fill={fill}
    />
  </Svg>
  );
};

export default IconMenu;


