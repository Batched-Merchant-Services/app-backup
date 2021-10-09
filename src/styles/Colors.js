const error = '#F02842';
const success = '#23C9D3';
const warning = '#F5A834';
const background = '#242C4C';
const white = '#FFFFFF';
const blue01 = '#DAF3FF';
const blue02 = '#00A9FF';
const blue03 = '#2E3A6E';
const blue04 = '#3F529E';
const green = '#24BFAC';

 
 
const Colors = {
  error,
  success,
  warning,
  background,
  white,
  blue01,
  blue02,
  blue03,
  blue04,
  green,
  get: value => {
    if (Colors[value]) {
      const returnValue = { color: Colors[value] };
      return returnValue;
    }
    return null;
  }
};

export default Colors;

