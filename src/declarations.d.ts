import React from 'react';

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<
    SvgProps & {
      fillSecondary?: string;
    }
  >;
  export default content;
}

declare module '@env'  { 
  export  const  PUBLIC_KEY : string ; 
  export  const  API_URL_STAGING : string ; 
}