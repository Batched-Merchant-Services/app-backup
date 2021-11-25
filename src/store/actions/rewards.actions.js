import {
  VALIDATE_REWARDS_BY_USER,
  VALIDATE_REWARDS_BY_USER_SUCCESS,
  VALIDATE_REWARDS,
  VALIDATE_REWARDS_SUCCESS,
  CONFIG_REWARDS,
  CONFIG_REWARDS_SUCCESS,
  REWARDS_ERROR,
  CLEAN_REWARDS
} from '../constants';


import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import { toggleSnackbarOpen } from './app.actions';
import { GET_VALIDATE_REWARDS_PROCESS_BY_USER,GET_CONFIG_REWARDS_TOKEN } from '@utils/api/queries/rewards.queries';
import { GET_VALIDATE_REWARDS_PROCESS } from '../../utils/api/queries/rewards.queries';


export const getValidateRewardsByUser = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: VALIDATE_REWARDS_BY_USER });

    client.query({
      query: GET_VALIDATE_REWARDS_PROCESS_BY_USER,
      variables: {
        token: token
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: VALIDATE_REWARDS_BY_USER_SUCCESS, payload: response?.data['getTotalLicensesInNetworkByUser'] });
      }
    }).catch((error) => {
      dispatch({ type: REWARDS_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REWARDS_ERROR, payload: error });
    //dispatch(toggleSnackbarOpen(error));
  }

};

export const setValidateRewardsProcess = ({isStart}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: VALIDATE_REWARDS });

    client.query({
      query: GET_VALIDATE_REWARDS_PROCESS,
      variables: {
        token: token,
        isStart: isStart
      }
    }).then(async (response) => {
        console.log('setValidateRewardsProcess',response)
      if (response.data) {
        dispatch({ type: VALIDATE_REWARDS_SUCCESS, payload: response?.data['getValidateSessionToken'] });
      }
    }).catch((error) => {
      console.log('setValidateRewardsProcess error',error)
      dispatch({ type: REWARDS_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: REWARDS_ERROR, payload: error });
    //dispatch(toggleSnackbarOpen(error));
  }

};



export const getRewardsConfig = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CONFIG_REWARDS });

    client.query({
      query: GET_CONFIG_REWARDS_TOKEN,
      variables: {
        token: token
      }
    }).then(async (response) => {
      console.log('response rewards CONFIG',response)
      if (response.data) {
        dispatch({ type: CONFIG_REWARDS_SUCCESS, payload: response?.data['getLastTimeRewards'] });
      }
    }).catch((error) => {
      console.log('error 1',error)
      dispatch({ type: REWARDS_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error 2',error)
    dispatch({ type: REWARDS_ERROR, payload: error });
    //dispatch(toggleSnackbarOpen(error));
  }

};



export const cleanReward = () => async (dispatch) => {
  return dispatch({ type: CLEAN_REWARDS })
};
