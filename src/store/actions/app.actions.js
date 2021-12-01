import { 
  GET_APP_RESOURCES,
  TOGGLE_STATUS_CHANGE,
  VALIDATE_REWARDS_STATUS,
  TOGGLE_STATUS_CHANGE_STATUS,
  SET_ERROR_APP
} from '../constants'

import { APP_RESOURCES } from '@utils/api/queries/app.queries';
import { client } from '@utils/api/apollo';
import { GET_VALIDATE_REWARDS_PROCESS } from '../../utils/api/queries/rewards.queries';
import { VALIDATE_SESSION } from '../../utils/api/queries/user.queries';
import LocalStorage from '@utils/localStorage';

export const toggleSnackbarOpen = (message) => ({
  type: "TOGGLE_SNACKBAR_OPEN",
  message,
});

export const toggleSnackbarClose = () => ({
  type: "TOGGLE_SNACKBAR_CLOSE",
});

export const showAppResources = () => async (dispatch) => {
  try {
    client.query({
      query: APP_RESOURCES,
      variables: {
        id:320
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GET_APP_RESOURCES, payload: response?.data['getBrandCompany'] });
      }
    }).catch((error) => {
      dispatch({ type: SET_ERROR_APP, payload: error });
    })
  } catch (error) {
    dispatch({ type: SET_ERROR_APP, payload: error });
  }

};

export const getValidateReward = () => async (dispatch) => {
  try {
    client.query({
      query: GET_VALIDATE_REWARDS_PROCESS,
      variables: {
        id:320
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: VALIDATE_REWARDS_STATUS, payload: response?.data['getValidateSessionToken'] });
      }
    }).catch((error) => {
      dispatch({ type: SET_ERROR_APP, payload: error });
    })
  } catch (error) {
    dispatch({ type: SET_ERROR_APP, payload: error });
  }

}

export const changeStatusTimers = (status,colorStatus) => async (dispatch) => {
  console.log('changeStatusTimers',status,colorStatus)
  return dispatch({ type: TOGGLE_STATUS_CHANGE, payload:status, showStatusTimers:colorStatus })
};

export const changeStatusTimerSecond = (status) => async (dispatch) => {
  return dispatch({ type: TOGGLE_STATUS_CHANGE_STATUS, payload:status })
};

