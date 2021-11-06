import { PUBLIC_KEY } from '@env';
console.log('PUBLIC_KEY',PUBLIC_KEY);
export const generateRSA = (text) => {
  try {
    var JSEncrypt = require('jsencrypt');
    const pub_key =' -----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrfWPRGsWnWzxRun7hzrqxdJ88133zwnJ8K9lD2DaJpyWfKpRt6VPbNQB9N1oFjYO8UkbmDTxI/RoA95Syse52T02smwTKvLqXuLSstcLCPPSYsr3tHaI0STU/Ta0UujffiEC9sXzk70xkIOiBeJAxKaSWZMjyLl8go5mHCF71nwIDAQAB-----END PUBLIC KEY-----';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pub_key);
    return encrypt.encrypt(text);
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

};