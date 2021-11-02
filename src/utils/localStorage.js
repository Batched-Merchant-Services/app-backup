/* 
  React Native Library for securely storing keys to iOS and Android devices
  in KeyChain and KeyStore respectively
*/
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";


const set = (key,value) =>{
console.log('key',key,'value',value)
RNSecureKeyStore.set(key, value, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
    .then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
    });

  } 
const get = key => RNSecureKeyStore.get(key);

const remove = key => RNSecureKeyStore.remove(key);

/* Example:
 * import LocalStorage from '@utils/localStorage';
 * ...
 * await LocalStorage.set('auth_token', 'token');
 */
export default { set, get, remove };
