const red = '#FA3776';
const green = '#00C79B';
const primary = '#F7CE51';/**/
const bgOrange02 = '#FF9522';/**/
const orange = '#FFB800';
const textGray = '#D0D7E1';
const bgGray = '#EDEFF2';
const card = '#FFFFFF';
const bgBlue06 = '#6990FC'; 
const bgBlue07 = '#775EFF';
const textBlueDark = '#4B5ACD';
const textBlue01 = '#3C48A2';
const bgBlue01 = '#232E65';
const bgBlue02 = '#303A6D';
const disabled = '#7D81AF';
const title =  '#8DAEE8';

const Colors = {
  red,
  primary,
  bgOrange02,
  textBlueDark,
  textGray,
  card,
  orange,
  textBlue01,
  disabled,
  title,
  bgBlue02,
  bgBlue06,
  bgGray,
  bgBlue01,
  bgBlue07,
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

