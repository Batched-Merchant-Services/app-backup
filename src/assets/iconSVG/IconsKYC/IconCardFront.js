import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconCardFront = ({
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
    height={height}
    width={width}
    viewBox="0 0 149.5 105.5"
    xmlSpace="preserve"
    enableBackground="new 0 0 149.5 105.5"
    {...props}
  >
    <Path
      d="M76.9 74.8h8.5v3.8h-8.5v-3.8zm0 14.7h8.5v-3.8h-8.5v3.8zM43 78.6h8.5v-3.8H43v3.8zm50.9 10.9h8.5v-3.8h-8.5v3.8zm0-10.9h8.5v-3.8h-8.5v3.8zm-67.9 0h8.5v-3.8H26v3.8zm-13 0h4.6v-3.8H13v3.8zm0 10.9h4.6v-3.8H13v3.8zm97.9 0h8.5v-3.8h-8.5v3.8zm-84.9 0h8.5v-3.8H26v3.8zm17 0h8.5v-3.8H43v3.8zM53.3 64H12.6V13h40.7v51zm-5.6-3.8c-.9-7.4-7.2-13.1-14.8-13.1S19 52.8 18.1 60.2h29.6zm1.7-43.4h-33v36.4c3.2-5.9 9.4-9.9 16.5-9.9s13.4 4 16.5 9.9V16.8zm19 68.9H60v3.8h8.5v-3.8zm42.5-7.1h8.5v-3.8h-8.5v3.8zM149.5 0v105.5H0V0h149.5zm-3.8 3.8H3.8v97.9h141.9V3.8zM22.8 30.4c0-5.6 4.5-10.1 10.1-10.1S43 24.8 43 30.4s-4.5 10.1-10.1 10.1c-5.5 0-10.1-4.6-10.1-10.1zm3.8 0c0 3.5 2.8 6.3 6.3 6.3s6.3-2.8 6.3-6.3-2.8-6.3-6.3-6.3-6.3 2.8-6.3 6.3zm73 27.7H61.7v3.8h37.9v-3.8zM68.4 74.8H60v3.8h8.5v-3.8zm59.5 3.8h4.6v-3.8h-4.6v3.8zm0 10.9h4.6v-3.8h-4.6v3.8zm4.5-58.6H61.7v3.8h70.7v-3.8zm0 13.6H61.7v3.8h70.7v-3.8z"
      fill={fill}
    />
  </Svg>
  );
};

export default IconCardFront;


