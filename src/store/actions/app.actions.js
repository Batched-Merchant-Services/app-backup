import { 
  GET_APP_RESOURCES,
  TOGGLE_STATUS_CHANGE,
  VALIDATE_REWARDS_STATUS,
  TOGGLE_STATUS_CHANGE_STATUS,
  SAVE_HISTORY_PAGINATION,
  CLEAN_HISTORY_PAGINATION,
  SAVE_STATE_MODAL_2FA,
  SET_ERROR_APP,
  USER_ACTIVE
} from '../constants'

import { APP_RESOURCES } from '@utils/api/queries/app.queries';
import { client } from '@utils/api/apollo';
import { GET_VALIDATE_REWARDS_PROCESS } from '../../utils/api/queries/rewards.queries';
import { VALIDATE_SESSION } from '../../utils/api/queries/user.queries';
import LocalStorage from '@utils/localStorage';
import { getUTCDateString } from '@utils/formatters';
import { generateRSA } from '../../utils/api/encrypt';

const utc = getUTCDateString();

export const toggleSnackbarOpen = (message,typeSnack) => ({
  type: "TOGGLE_SNACKBAR_OPEN",
  message,
  typeSnack: typeSnack?typeSnack:'error'
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
      },
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

export const userInactivity = (status) => async (dispatch) => {
  return dispatch({ type: USER_ACTIVE, payload:status })
};

export const changeStatusTimers = (status,colorStatus) => async (dispatch) => {
  return dispatch({ type: TOGGLE_STATUS_CHANGE, payload:status, showStatusTimers:colorStatus })
};

export const changeStatusTimerSecond = (status) => async (dispatch) => {
  return dispatch({ type: TOGGLE_STATUS_CHANGE_STATUS, payload:status })
};
export const saveHistoryPagination = (data,page) => async (dispatch) => {
  return dispatch({ type: SAVE_HISTORY_PAGINATION, payload:data , page:page})
};
export const cleanHistoryPagination = () => async (dispatch) => {
  return dispatch({ type: CLEAN_HISTORY_PAGINATION })
};

export const saveStateModal2fa = (state) => async (dispatch) => {
  return dispatch({ type: SAVE_STATE_MODAL_2FA ,payload:state})
};

