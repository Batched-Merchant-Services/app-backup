import {
  VALIDATE_CODE_LICENSES,
  VALIDATE_CODE_LICENSES_SUCCESS,
  LICENSES_ERROR,
  CLEAN_ERROR_LICENSES,
  GET_LICENSES,
  GET_LICENSES_SUCCESS,
  GET_LIST_LICENSES,
  GET_LIST_LICENSES_SUCCESS
} from '../constants';


import { GET_REFERRED_ID,GET_CURRENT_TYPE_LICENSES } from '@utils/api/queries/licenses.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { getLanguage } from '@utils/api/getLanguage';



export const validateReference = ({ referenceCode }) => async (dispatch) => {
  console.log('referenceCode',referenceCode?.value)
  try {
    dispatch({ type: VALIDATE_CODE_LICENSES });
   
    client.query({
      query: GET_REFERRED_ID,
      variables: {
        id: referenceCode?.value
      }
    }).then(async (response) => {
      console.log('response',response);
      if (response.data) {
        dispatch({ type: VALIDATE_CODE_LICENSES_SUCCESS, payload: response?.data['getUserReferer'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
  }

};

export const getLicenses = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_LIST_LICENSES });
   
    client.query({
      query: GET_CURRENT_TYPE_LICENSES,
      variables: {
        token: token
      }
    }).then(async (response) => {
      console.log('response',response);
      if (response.data) {
        dispatch({ type: GET_LIST_LICENSES_SUCCESS, payload: response?.data['getCurrentTypeLicenses'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
    })
  } catch (error) {
    console.log('error',error)
    dispatch({ type: LICENSES_ERROR, payload: error });
  }

};

export const getListLicenses = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_LICENSES });
   
    client.query({
      query: GET_CURRENT_TYPE_LICENSES,
      variables: {
        token: token
      }
    }).then(async (response) => {
      console.log('response',response);
      if (response.data) {
        dispatch({ type: GET_LICENSES_SUCCESS, payload: response?.data['getCurrentTypeLicenses'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
    })
  } catch (error) {
    console.log('error',error)
    dispatch({ type: LICENSES_ERROR, payload: error });
  }

};




export const cleanErrorLicenses = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_LICENSES })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
  }

};