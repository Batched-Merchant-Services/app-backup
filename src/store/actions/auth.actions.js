import { 
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  CLEAN_ERROR 
} from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
const device = DeviceInfo.getUniqueId();





export const getLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN });
   
    client.query({
      query: LOGIN_QUERY,
      variables: {
        user: email?.value,
        password:  generateRSA(password?.value),
        languaje: "2",
        id: device,
        groupid: "320"
      }
    }).then(async (response) => {
      if (response.data) {
        const { token } = response?.data?.getLoggin;
        dispatch({ type: LOGIN_SUCCESS, payload: response?.data?.getLoggin });
        await LocalStorage.set('auth_token', token);
      }
    }).catch((error) => {
      const err = JSON.stringify({ message: error })
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {

    dispatch({ type: LOGIN_ERROR, payload: error });
  }

};



export const cleanError = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

};