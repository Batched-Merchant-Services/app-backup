import { 
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  CLEAN_ERROR ,
  VALIDATE_SESSION,
  VALIDATE_SESSION_SUCCESS,
  VALIDATE_CODE_SMS,
  VALIDATE_CODE_SMS_SUCCESS,
  VALIDATE_CODE_EMAIL,
  VALIDATE_CODE_EMAIL_SUCCESS
} from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen, userInactivity } from './app.actions';
import { VALIDATE_SESSION_QUERY } from '../../utils/api/queries/user.queries';
import { getUTCDateString } from '../../utils/formatters';
import { getDataUser } from './user.action';
import { AUTHENTICATION_TWO_FACTORS, AUTHENTICATION_TWO_FACTORS_EMAIL } from '../../utils/api/queries/auth.queries';
const device = DeviceInfo.getUniqueId();



const utc = getUTCDateString();
export const getLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN });
    client.query({
      query: LOGIN_QUERY,
      variables: {
        user: email?.value,
        password:  generateRSA(password?.value),
        languaje: "2",
        id: generateRSA(device),
        groupid: "320"
      },
    }).then(async (response) => {
      if (response.data) {
        const { token,uuid } = response?.data['getLoggin'];
        console.log('token',token)
        dispatch({ type: LOGIN_SUCCESS, payload: response?.data['getLoggin'] });
        await LocalStorage.set('auth_token', token);
        await LocalStorage.set('uuid', uuid);
        dispatch(userInactivity(true));
        dispatch(getDataUser({token,uuid}))
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
      if (response.data) {
        dispatch({ type: VALIDATE_SESSION_SUCCESS, payload: response?.data['getValidateSession'] });
      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

}

export const validateCodeSms = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: VALIDATE_CODE_SMS });
    client.query({
      query: AUTHENTICATION_TWO_FACTORS,
      variables: {
        token:token
      }
    }).then(async (response) => {
      console.log('response code sms',response)
      if (response.data) {
        dispatch({ type: VALIDATE_CODE_SMS_SUCCESS, payload: response?.data['getSecurityCodeDirect'] });
      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

}

export const validateCodeEmail = () => async (dispatch) => {
  console.log('validateCodeEmail')
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: VALIDATE_CODE_EMAIL });
    client.query({
      query: AUTHENTICATION_TWO_FACTORS_EMAIL,
      variables: {
        token:token
      }
    }).then(async (response) => {
      console.log('response code email',response)
      if (response.data) {
        dispatch({ type: VALIDATE_CODE_EMAIL_SUCCESS, payload: response?.data['getSecurityCodeDirectSES'] });
      }
    }).catch((error) => {
      console.log('response code error 1',error)
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    console.log('response code error 2',error)
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