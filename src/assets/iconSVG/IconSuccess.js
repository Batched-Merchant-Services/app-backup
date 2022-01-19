import * as React from 'react';
import Svg, { Path,Ellipse } from 'react-native-svg';

const IconSuccess = ({
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
      viewBox="0 0 11.077 11"
    >
      <Ellipse id="Oval" cx="5.538" cy="5.5" rx="5.538" ry="5.5" fill={fill}/>
      <Path id="Fill_1" data-name="Fill 1" d="M2.236,4A.5.5,0,0,1,1.9,3.874L.156,2.313a.459.459,0,0,1-.026-.666.5.5,0,0,1,.692-.025L2.2,2.855l2.48-2.7a.5.5,0,0,1,.691-.04.459.459,0,0,1,.042.665L2.6,3.841A.5.5,0,0,1,2.26,4H2.236" transform="translate(2.769 4)" fill={fillSecondary}/>
    </Svg>
  );
};

export default IconSuccess;
