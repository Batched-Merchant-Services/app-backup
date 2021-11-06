import {
  FORGOT_YOUR_PASSWORD,
  FORGOT_YOUR_PASSWORD_SUCCESS,
  FORGOT_ERROR,
  CLEAN_ERROR_FORGOT,
} from '../constants';

import { SET_FORGOT_PASSWORD } from '@utils/api/queries/forgotPassword.query';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
const device = DeviceInfo.getUniqueId();


export const getForgotPassword = ({dataRecovery }) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_YOUR_PASSWORD });
    client.mutate({
      mutation: SET_FORGOT_PASSWORD,
      variables: dataRecovery
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: FORGOT_YOUR_PASSWORD_SUCCESS, payload: response?.data?.getLoggin });
      }
    }).catch((error) => {

      dispatch({ type: FORGOT_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, payload: error });
  }
};


export const setForgotPassword = ({dataRecovery }) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_YOUR_PASSWORD });
    client.mutate({
      mutation: SET_FORGOT_PASSWORD,
      variables: dataRecovery
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: FORGOT_YOUR_PASSWORD_SUCCESS, payload: response?.data?.getLoggin });
      }
    }).catch((error) => {

      dispatch({ type: FORGOT_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, payload: error });
  }

};



export const cleanErrorForgot = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_FORGOT })
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, payload: error });
  }

};