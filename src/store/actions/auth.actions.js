import { 
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAN_ERROR ,
  VALIDATE_SESSION,
  VALIDATE_SESSION_SUCCESS,
  VALIDATE_CODE_SMS,
  VALIDATE_CODE_SMS_SUCCESS,
  VALIDATE_CODE_EMAIL,
  VALIDATE_CODE_EMAIL_SUCCESS,
  GET_KEY_TWO_FACTORS,
  GET_KEY_TWO_FACTORS_SUCCESS
} from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen, userInactivity } from './app.actions';
import { VALIDATE_SESSION_QUERY } from '../../utils/api/queries/user.queries';
import { getLicenses} from '@store/actions/licenses.actions';
import { AUTHENTICATION_TWO_FACTORS,AUTHENTICATION_TWO_FACTORS_EMAIL,AUTHENTICATION_TWO_FACTORS_QR,LOGOUT_QUERY } from '../../utils/api/queries/auth.queries';
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
        id: generateRSA(device),
        groupid: "320"
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        const { token,uuid } = response?.data['getLoggin'];
        dispatch({ type: LOGIN_SUCCESS, payload: response?.data['getLoggin'] });
        await LocalStorage.set('auth_token', token);
        await LocalStorage.set('uuid', uuid);
        dispatch(userInactivity(true));
        dispatch(getLicenses());

      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

};

export const getAuth2faQr = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_KEY_TWO_FACTORS });
    client.query({
      query: AUTHENTICATION_TWO_FACTORS_QR,
      variables: {
        token:token
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GET_KEY_TWO_FACTORS_SUCCESS, payload: response?.data['getImageTwoFactor'] });
      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }
}


export const validateSession = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: VALIDATE_SESSION });
    client.query({
      query: VALIDATE_SESSION_QUERY,
      variables: {
        token:token
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        const { token } = response?.data['getValidateSession'];
        dispatch({ type: VALIDATE_SESSION_SUCCESS, payload: response?.data['getValidateSession'] });
        await LocalStorage.set('auth_token', token);
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
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
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
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: VALIDATE_CODE_EMAIL });
    client.query({
      query: AUTHENTICATION_TWO_FACTORS_EMAIL,
      variables: {
        token:token
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: VALIDATE_CODE_EMAIL_SUCCESS, payload: response?.data['getSecurityCodeDirectSES'] });
      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }
}


export const logoutSession = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: LOGOUT });
    client.query({
      query: LOGOUT_QUERY,
      variables: {
       token:token
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: LOGOUT_SUCCESS, payload: response?.data['getLogout'] });
        dispatch(userInactivity(false));
      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
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