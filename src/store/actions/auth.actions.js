import { 
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  CLEAN_ERROR ,
  VALIDATE_SESSION,
  VALIDATE_SESSION_SUCCESS,
} from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen } from './app.actions';
import { VALIDATE_SESSION_QUERY } from '../../utils/api/queries/user.queries';
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
        const { token,uuid } = response?.data['getLoggin'];
        dispatch({ type: LOGIN_SUCCESS, payload: response?.data['getLoggin'] });
        await LocalStorage.set('auth_token', token);
        await LocalStorage.set('uuid', uuid);
      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {

    dispatch({ type: LOGIN_ERROR, payload: error });
  }

};


export const validateSession = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: VALIDATE_SESSION });
    client.query({
      query: VALIDATE_SESSION_QUERY,
      variables: {
        token:token
      }
    }).then(async (response) => {
      console.log('response response response',response)
      if (response.data) {
        dispatch({ type: VALIDATE_SESSION_SUCCESS, payload: response?.data['getValidateSession'] });
      }
    }).catch((error) => {
      console.log('validateSession error',error)
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    console.log('validateSession error 2',error)
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

}


export const cleanError = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

};