import {
  REGISTER,
  REGISTER_SUCCESS,
  VALIDATE_CODE, 
  VALIDATE_CODE_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_GENDER,
  GET_GENDER_SUCCESS,
  VALIDATE_SMS,
  VALIDATE_SMS_SUCCESS,
  REGISTER_PROFILE,
  REGISTER_PROFILE_SUCCESS,
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  //estos 2 son genericos para todos los reducers
  REGISTER_ERROR,
  CLEAN_ERROR_REGISTER,
} from '../constants';

import { SET_REGISTER,COMPANY_REFERENCE,VALIDATE_CODE_SMS,SET_PASSWORD_QUERY,SET_REGISTER_COMPLETE} from '@utils/api/queries/register.queries';
import { GET_COUNTRIES_QUERY,GET_DATA } from '@utils/api/queries/dropdown.queries';
import { toggleSnackbarOpen } from './app.actions';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { getLanguage } from '@utils/api/getLanguage';



export const getCodeReference = ({ reference }) => async (dispatch) => {
  try {
    dispatch({ type: VALIDATE_CODE });
   
    client.query({
      query: COMPANY_REFERENCE,
      variables: {
        reference: reference
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: VALIDATE_CODE_SUCCESS, payload: response?.data });
      }
    }).catch((error) => {
      dispatch({ type: REGISTER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};


export const getCountries =() => async (dispatch) => {
  try {
    dispatch({ type: GET_COUNTRIES });
   
    client.query({
      query: GET_COUNTRIES_QUERY,
    }).then(async (response) => {
      if (response.data) {
        nameCountry(response.data);
        dispatch({ type: GET_COUNTRIES_SUCCESS, payload: nameCountry(response.data) });
      }
    }).catch((error) => {
      dispatch({ type: REGISTER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
}


export const nameCountry= (data) =>  {
  const output = [];
  data['getCountries'].forEach(country => {
    output.push(
      {
        value: country.phoneCode,
        name: `${country.englishName} +${country.phoneCode}`
      }
    )
  });
  return output;
};


export const getGender =() => async (dispatch) => {
  try {
    dispatch({ type: GET_GENDER });
    client.query({
      query: GET_DATA,
      variables: {
        id: 'GENDER', 
        languaje:getLanguage()
      }
    }).then(async (response) => {
      if (response.data) {
        nameGender(response.data);
        dispatch({ type: GET_GENDER_SUCCESS, payload: nameGender(response.data) });
      }
    }).catch((error) => {
      dispatch({ type: REGISTER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
}


export const nameGender= (data) =>  {
  const genderArray = [];
  data['getCombo'].forEach(gender => {
    genderArray.push(
      {
        value: gender.value,
        name: `${gender.description}`
      }
    )
  });
  return genderArray;
};

export const setRegister = ({ dataRegister }) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER });
   
    client.mutate({
      mutation: SET_REGISTER,
      variables: {
        register: dataRegister
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: REGISTER_SUCCESS, payload: response?.data });
      }
    }).catch((error) => {
      dispatch({ type: REGISTER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};

export const validateSMS = ({codeSms}) => async (dispatch) => {
  try {
    dispatch({ type: VALIDATE_SMS });
   
    client.mutate({
      mutation: VALIDATE_CODE_SMS,
      variables: {
        token: codeSms?.value
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: VALIDATE_SMS_SUCCESS, payload: response?.data });
      }
    }).catch((error) => {
      dispatch({ type: REGISTER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};


export const registerProfile = ({ dataRegisterProf,term }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: REGISTER_PROFILE });
   
    client.mutate({
      mutation: SET_REGISTER_COMPLETE,
      variables: {
        token: token,
        data: {
          ...dataRegisterProf
        },
        terms: term, 
        reference:'', 
        notSendActiveAccount:true,
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: REGISTER_PROFILE_SUCCESS, payload: response?.data });
      }
    }).catch((error) => {
      dispatch({ type: REGISTER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};



export const setPassword = ({ pinConfirm,password }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_PASSWORD });
   
    client.mutate({
      mutation: SET_PASSWORD_QUERY,
      variables: {
        token: token,
        pin:generateRSA(pinConfirm),
        password:generateRSA(password) 
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_PASSWORD_SUCCESS, payload: response?.data });
      }
    }).catch((error) => {
      dispatch({ type: REGISTER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};




export const cleanErrorRegister = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_REGISTER })
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
  }

};