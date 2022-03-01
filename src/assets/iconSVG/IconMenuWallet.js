import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconMenuWallet = ({
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
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        d="M29.5 0h-27C1.1 0 0 1.1 0 2.5v27C0 30.9 1.1 32 2.5 32h27c1.4 0 2.5-1.1 2.5-2.5v-27C32 1.1 30.9 0 29.5 0zM31 29.5c0 .8-.7 1.5-1.5 1.5h-27c-.8 0-1.5-.7-1.5-1.5v-27C1 1.7 1.7 1 2.5 1h27c.8 0 1.5.7 1.5 1.5v27zM27.2 7.3v15.8h-1V7.3c0-.8-.7-1.5-1.5-1.5H7.3c-.8 0-1.5.7-1.5 1.5v16.1c0 .8.7 1.5 1.5 1.5h15.3V14.4c0-.8-.7-1.5-1.5-1.5H9.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3h13.6v1H9.5c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3h11.6c1.4 0 2.5 1.1 2.5 2.5V26H7.3c-1.4 0-2.5-1.1-2.5-2.5V7.3C4.8 6 6 4.8 7.3 4.8h17.3c1.4 0 2.6 1.2 2.6 2.5zm-6 11.7c0-1.3-1-2.3-2.3-2.3s-2.3 1-2.3 2.3 1 2.3 2.3 2.3 2.3-1.1 2.3-2.3zm-3.5 0c0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7-.1-1.3-.6-1.3-1.3z"
        fill={fill}
      />
    </Svg>
  );
};

export default IconMenuWallet;


