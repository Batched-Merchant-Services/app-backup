import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconCycle = ({
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
      d="M29.5 0h-27C1.1 0 0 1.1 0 2.5v27C0 30.9 1.1 32 2.5 32h27c1.4 0 2.5-1.1 2.5-2.5v-27C32 1.1 30.9 0 29.5 0zM31 29.5c0 .8-.7 1.5-1.5 1.5h-27c-.8 0-1.5-.7-1.5-1.5v-27C1 1.7 1.7 1 2.5 1h27c.8 0 1.5.7 1.5 1.5v27zM16 5.4C10.2 5.4 5.4 10.2 5.4 16S10.2 26.6 16 26.6 26.6 21.8 26.6 16 21.8 5.4 16 5.4zm0 20.2c-5.3 0-9.6-4.3-9.6-9.6s4.3-9.6 9.6-9.6 9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm.5-15.4v4.2c.7.2 1.2.8 1.2 1.6 0 .9-.8 1.7-1.7 1.7-.9 0-1.7-.8-1.7-1.7 0-.8.5-1.4 1.2-1.6v-4.2h1zm7.9 5.8c0 1.5-.4 2.9-1.2 4.2l-.2.4-3-1.6.5-.9 2.2 1.1c.5-1 .8-2.2.8-3.3 0-1.7-.6-3.3-1.6-4.6l-2 1.7-.6-.8 1.8-1.5C19.8 9.4 18 8.6 16 8.6c-2 0-3.8.8-5.1 2.1l1.8 1.5-.6.8-1.9-1.5c-1 1.3-1.6 2.8-1.6 4.5 0 1.1.3 2.3.8 3.3l2.2-1.1.5.9-3 1.6-.2-.4C8 18.9 7.6 17.5 7.6 16c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4zm-3.2 5.2l.7.7c-1.6 1.6-3.7 2.5-5.9 2.5s-4.3-.9-5.9-2.5l.7-.7c1.4 1.4 3.2 2.2 5.2 2.2s3.8-.8 5.2-2.2z"
      fill={fill}
    />
  </Svg>
  );
};

export default IconCycle;

