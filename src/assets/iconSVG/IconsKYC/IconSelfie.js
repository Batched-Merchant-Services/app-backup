import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconSelfie = ({
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
    viewBox="0 0 160 107"
    xmlSpace="preserve"
    enableBackground="new 0 0 160 107"
    {...props}
  >
    <Path
      d="M107.7 65.2h1.1v3.6h-1.1v-3.6zm3.3 3.6h2.2v-3.6H111v3.6zm9.5-6.3h-12.4V46h12.4v16.5zm-3.6-12.9h-5.2v9.3h5.2v-9.3zm-16.3 56.7H97c0-11.7-9.3-21.2-20.9-21.4 0 8.2-6.7 14.9-15 14.9-8.2 0-14.9-6.7-15-14.9-11.6.1-21 9.7-21 21.4v.3H0V83.4h3.6V103h18.1c1.6-12.2 11.9-21.6 24.4-21.7v-3.6c-11.5-5.6-19.4-17.4-19.4-31V32.6C26.8 14.6 41.4 0 59.3 0h3.8C81 0 95.6 14.6 95.6 32.6v14.1c0 13.7-7.9 25.5-19.4 31.1v3.6c13.5.2 24.4 11.3 24.4 24.9zm-28.1-27c-3.6 1.2-7.4 1.9-11.3 1.9-4 0-7.8-.7-11.4-2v5.6c0 6.3 5.1 11.4 11.4 11.4 6.3 0 11.4-5.1 11.4-11.4v-5.5zM92 46.7V32.6c0-16-13-29-28.9-29h-3.8c-15.9 0-28.9 13-28.9 29v14.1c0 17 13.8 30.9 30.8 30.9S92 63.8 92 46.7zm-28.4 3.1H58V33.6h-3.6v19.8h9.2v-3.6zm10.7-16.2c-2.1 0-3.8 1.7-3.8 3.8 0 2.1 1.7 3.8 3.8 3.8 2.1 0 3.8-1.7 3.8-3.8 0-2.1-1.7-3.8-3.8-3.8zM3.6 8.6h21.5V5H0v23.3h3.6V8.6zm46.6 55.9h18.5v-3.6H50.2v3.6zm-6.9-30.9c-2.1 0-3.8 1.7-3.8 3.8 0 2.1 1.7 3.8 3.8 3.8 2.1 0 3.8-1.7 3.8-3.8 0-2.1-1.7-3.8-3.8-3.8zm80.6 16H143V46h-19.2v3.6zm0 6.4H143v-3.6h-19.2V56zm13.6 12.8h2.2v-3.6h-2.2v3.6zm4.4 0h1.1v-3.6h-1.1v3.6zm13.9 14.6h3.6v23.3H134l.8-2.4c1.8-5.5 2.4-11.1 2.7-14.9-1.8 1.3-4.1 2-6.5 2-2.7 0-5.3-1-7.3-2.6-.1 4.6-.7 10.9-3.1 16.1l-3.3-1.5c3-6.6 2.9-15.4 2.7-19h-4.8c-5.6 0-10.3-4.2-11.1-9.6h-2.7V38.7h48.9v36.2h-9c.7 1.6 1.1 3.4 1.1 5.1 0 1.8-.4 3.6-1.2 5.1 0 1.9 0 9.7-2.3 18h16.9V83.4zm-17.1-3.5c0-1.8-.6-3.8-1.6-5.1h-29.4c.8 3.4 3.9 5.9 7.5 5.9h7.9l.4 1.3c.9 3.4 4 5.7 7.5 5.7 4.2.1 7.7-3.4 7.7-7.8zm.1-8.7h7.8V42.3h-41.7v28.9h33.9zM134.3 5v3.6h21.5v19.6h3.6V5h-25.1zm-18.9 63.8h2.2v-3.6h-2.2v3.6zm18-10h-9.6v3.6h9.6v-3.6zm-13.6 10h2.2v-3.6h-2.2v3.6zm4.4 0h2.2v-3.6h-2.2v3.6zm4.5 0h2.2v-3.6h-2.2v3.6zm4.4 0h2.2v-3.6h-2.2v3.6z"
      fill={fill}
    />
  </Svg>
  );
};

export default IconSelfie;


