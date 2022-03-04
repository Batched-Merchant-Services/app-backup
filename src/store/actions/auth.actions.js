import { 
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_TWO_FACTORS_SUCCESS,
  CLEAN_ERROR ,
  VALIDATE_SESSION,
  VALIDATE_SESSION_SUCCESS,
  VALIDATE_CODE_SMS,
  VALIDATE_CODE_SMS_SUCCESS,
  VALIDATE_CODE_EMAIL,
  VALIDATE_CODE_EMAIL_SUCCESS,
  GET_KEY_TWO_FACTORS,
  GET_KEY_TWO_FACTORS_SUCCESS,
  GET_ENABLE_THIRD_PARTY,
  GET_ENABLE_THIRD_PARTY_SUCCESS,
  GET_ENABLE_SMS,
  GET_ENABLE_SMS_SUCCESS,
  GET_ENABLE_EMAIL,
  GET_ENABLE_EMAIL_SUCCESS
} from '../constants'
import { LOGIN_QUERY,LOGIN_TWO_FACTOR_QUERY } from '@utils/api/queries/auth.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen, userInactivity } from './app.actions';
import { VALIDATE_SESSION_QUERY } from '../../utils/api/queries/user.queries';
import { getLicenses} from '@store/actions/licenses.actions';
import { AUTHENTICATION_TWO_FACTORS_SMS,AUTHENTICATION_TWO_FACTORS_EMAIL,AUTHENTICATION_TWO_FACTORS_QR,LOGOUT_QUERY, ACTIVATION_THIRD_PARTY, ACTIVATION_SMS, ACTIVATION_EMAIL } from '../../utils/api/queries/auth.queries';
import { getDataUser } from './user.action';
const device = DeviceInfo.getUniqueId();


export const getLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN });
    client.query({
      query: LOGIN_QUERY,
      variables: {
        user: email?.value,
        password:  generateRSA(password?.value),
        languaje: "3",
        id: generateRSA(device),
        groupid: "320",
        reference:''
      },
      fetchPolicy: 'no-cache'
    }).then(async (response) => {
      if (response.data) {
        const { token,uuid,left,isTwoFactor } = response?.data['getLoggin'];
        dispatch({ type: LOGIN_SUCCESS, payload: response?.data['getLoggin'] });
        await LocalStorage.set('auth_token', token);
        await LocalStorage.set('uuid', uuid);
        await LocalStorage.set('left', left);
        dispatch(userInactivity(true));
        if(!isTwoFactor) {
          dispatch(getLicenses());
        }
      }
    }).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error });
  }
};



export const getLoginTwoFactor = ({ codeSecurity }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  console.log('token',token,'codeSecurity',codeSecurity)
  try {
    dispatch({ type: LOGIN });
    client.query({
      query: LOGIN_TWO_FACTOR_QUERY,
      variables: {
        token: token,
        code: codeSecurity
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        console.log('response.data two factor',response.data)
        const { token,uuid } = response?.data['getLogginTwoFactor'];
        dispatch({ type: LOGIN_TWO_FACTORS_SUCCESS, payload: response?.data['getLogginTwoFactor'] });
        await LocalStorage.set('auth_token', token);
        await LocalStorage.set('uuid', uuid);
        dispatch(userInactivity(true));
        dispatch(getLicenses());
        dispatch(getDataUser());
      }
    }).catch((error) => {
      console.log('error1 two factor',error)
      dispatch({ type: LOGIN_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error2 two factor',error)
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


export const Activation2faApp = ({code}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  console.log('code',code)
  try {
    dispatch({ type: GET_ENABLE_THIRD_PARTY });
      client.mutate({
      mutation: ACTIVATION_THIRD_PARTY,
      variables: {
        token    : token,
        code     : code,
        isPrimary: true
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      console.log('response Activation2faApp',response)
      if (response.data) {
        dispatch({ type: GET_ENABLE_THIRD_PARTY_SUCCESS, payload: response?.data['Activation2faApp'] });
      }
    }).catch((error) => {
      console.log('error1',error)
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    console.log('error2',error)
    dispatch({ type: LOGIN_ERROR, payload: error });
  }
}


export const Activation2faSms = ({codeComposition}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_ENABLE_SMS });
      client.mutate({
      mutation: ACTIVATION_SMS,
      variables: {
        token    : token,
        code     : codeComposition?codeComposition.toString():'',
        isPrimary: true
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      console.log('response Activation2faSms',response)
      if (response.data) {
        dispatch({ type: GET_ENABLE_SMS_SUCCESS, payload: response?.data['Activation2faApp'] });
      }
    }).catch((error) => {
      console.log('Activation2faSms error1',error)
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    console.log('Activation2faSms error2',error)
    dispatch({ type: LOGIN_ERROR, payload: error });
  }
}


export const Activation2faEmail = ({codeComposition}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  console.log('codeComposition',codeComposition)
  try {
    dispatch({ type: GET_ENABLE_EMAIL });
      client.mutate({
      mutation: ACTIVATION_EMAIL,
      variables: {
        token    : token,
        code     : codeComposition,
        isPrimary: true
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      console.log('response Activation2faApp',response)
      if (response.data) {
        dispatch({ type: GET_ENABLE_EMAIL_SUCCESS, payload: response?.data['Activation2faApp'] });
      }
    }).catch((error) => {
      console.log('error1',error)
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    console.log('error2',error)
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
      query: AUTHENTICATION_TWO_FACTORS_SMS,
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