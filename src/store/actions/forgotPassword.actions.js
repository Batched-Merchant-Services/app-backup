import {
  FORGOT_YOUR_PASSWORD,
  FORGOT_YOUR_PASSWORD_SUCCESS,
  FORGOT_ERROR,
  CLEAN_ERROR_FORGOT,
  CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_SUCCESS
} from '../constants';

import { SET_FORGOT_PASSWORD,SET_CONFIRM_PASSWORD } from '@utils/api/queries/forgotPassword.queries';
import { client } from '@utils/api/apollo';
import { toggleSnackbarOpen } from './app.actions';


export const getForgotPassword = ({dataRecovery }) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_YOUR_PASSWORD });
    client.mutate({
      mutation: SET_FORGOT_PASSWORD,
      variables: dataRecovery,
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: FORGOT_YOUR_PASSWORD_SUCCESS, payload: response?.data['setRecoveryPwd'] });
      }
    }).catch((error) => {
      dispatch({ type: FORGOT_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const confirmForgotPassword = ({dataConfirm }) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_PASSWORD });
    client.mutate({
      mutation: SET_CONFIRM_PASSWORD,
      variables: dataConfirm,
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CONFIRM_PASSWORD_SUCCESS, payload: response?.data});
      }
    }).catch((error) => {
      dispatch({ type: FORGOT_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const cleanErrorForgot = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_FORGOT })
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, payload: error });
  }

};