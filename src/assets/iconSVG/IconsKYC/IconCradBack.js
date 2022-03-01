import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconCardBack = ({
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
        d="M42.1 87.2h1.6V91h-1.6v-3.8zm3.1 3.8h1.6v-3.8h-1.6V91zm15.6 0h1.6v-3.8h-1.6V91zm-12.5 0h1.6v-3.8h-1.6V91zm9.4 0h1.6v-3.8h-1.6V91zm-6.3 0H53v-3.8h-1.6V91zm3.2 0h1.6v-3.8h-1.6V91zm-28.2 0H28v-3.8h-1.6V91zm-2.3 0h.8v-3.8h-.8V91zm0-12.4h4.6v-3.8h-4.6v3.8zM38.9 91h1.6v-3.8h-1.6V91zm-3.1 0h1.6v-3.8h-1.6V91zm-6.3 0h1.6v-3.8h-1.6V91zm3.2 0h1.6v-3.8h-1.6V91zm16.1-16.2h-10v3.8h10v-3.8zM82.7 91h.8v-3.8h-.8V91zm-18.8 0h1.6v-3.8h-1.6V91zm71.5-.1H94.7V48.3h40.7v42.6zm-3.9-38.8h-33v35h33.1v-35zm-65.6-3.5H24v3.8h41.9v-3.8zM149.5 0v105.5H0V0h149.5zm-3.8 40H3.8v61.7h141.9V40zm0-21.9H3.8v18.1h141.9V18.1zm0-14.3H3.8v10.5h141.9V3.8zM14.9 48.6h-3.8v42h3.8v-42zm68.6 12.3H24v3.8h59.5v-3.8zm0 13.9h-4.6v3.8h4.6v-3.8zM70.2 91h1.6v-3.8h-1.6V91zM58.8 78.6h10v-3.8h-10v3.8zM67.1 91h1.6v-3.8h-1.6V91zm6.2 0h1.6v-3.8h-1.6V91zm3.1 0H78v-3.8h-1.6V91zm3.2 0h1.6v-3.8h-1.6V91z"
        fill={fill}
      />
    </Svg>
  );
};

export default IconCardBack;


