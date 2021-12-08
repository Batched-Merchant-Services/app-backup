import { 
  REWARDS_POINTS,
  REWARDS_POINTS_SUCCESS,
  COMMISSION_POINTS,
  COMMISSION_POINTS_SUCCESS,
  GATEWAY_POINTS,
  GATEWAY_POINTS_SUCCESS,
  LIQUID_POINTS,
  LIQUID_POINTS_SUCCESS,
  EXECUTES_POINTS,
  EXECUTES_POINTS_SUCCESS,
  pointsConstants,
  POINTS_ERROR,
  CLEAN_ERROR_POINTS
} from '../constants'
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen } from './app.actions';

import { GET_POOL_BALANCE, GET_TRANSACTIONS_TOKENS } from '../../utils/api/queries/points.queries';
const device = DeviceInfo.getUniqueId();


export const getCommissionPoints = ({ id }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: COMMISSION_POINTS });
   
    client.query({
      query: GET_POOL_BALANCE,
      variables: {
        token:token,
        id:id,
        pool: pointsConstants.POOLS.COMMISSION
      }
    }).then(async (response) => {
      console.log('getCommissionPoints',response)
      if (response.data) {
        dispatch({ type: COMMISSION_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      console.log('getCommissionPoints error1',error)
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('getCommissionPoints error2',error)
    dispatch({ type: CLEAN_ERROR_POINTS, payload: error });
  }

};

export const getRewardsPoints = ({ id }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: REWARDS_POINTS });
   
    client.query({
      query: GET_POOL_BALANCE,
      variables: {
        token:token,
        id:id,
        pool: pointsConstants.POOLS.REWARDS
      }
    }).then(async (response) => {
      console.log('getRewardsPoints',response)
      if (response.data) {
        dispatch({ type: REWARDS_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      console.log('getRewardsPoints error 1',response)
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('getRewardsPoints error 2',response)
    dispatch({ type: CLEAN_ERROR_POINTS, payload: error });
  }

};

export const getGatewayPointsBalance = ({ id }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GATEWAY_POINTS });
   
    client.query({
      query: GET_POOL_BALANCE,
      variables: {
        token:token,
        id:id,
        pool: pointsConstants.POOLS.GATEWAY
      }
    }).then(async (response) => {
      console.log('getGatewayPointsBalance',response)
      if (response.data) {
        dispatch({ type: GATEWAY_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      console.log('getGatewayPointsBalance error 1',response)
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('getGatewayPointsBalance error 2',response)
    dispatch({ type: CLEAN_ERROR_POINTS, payload: error });
  }

};

export const getLiquidPointsBalance = ({ id }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: LIQUID_POINTS });
   
    client.query({
      query: GET_POOL_BALANCE,
      variables: {
        token:token,
        id:id,
        pool: pointsConstants.POOLS.LIQUIDITY
      }
    }).then(async (response) => {
      console.log('getLiquidPointsBalance',response)
      if (response.data) {
        dispatch({ type: LIQUID_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      console.log('getLiquidPointsBalance error 1',response)
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('getLiquidPointsBalance error 2',response)
    dispatch({ type: CLEAN_ERROR_POINTS, payload: error });
  }

};


export const getExecutedPointsTransactions = ({ id }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EXECUTES_POINTS });
   
    client.query({
      query: GET_TRANSACTIONS_TOKENS,
      variables: {
        token:token,
        id:id,
        pool: pointsConstants.POOLS.LIQUIDITY
      }
    }).then(async (response) => {
      console.log('getExecutedPointsTransactions',response)
      if (response.data) {
        dispatch({ type: EXECUTES_POINTS_SUCCESS, payload: response?.data['getAccountTransactionsTokens'] });
      }
    }).catch((error) => {
      console.log('getExecutedPointsTransactions error 1',response)
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('getExecutedPointsTransactions error 2',response)
    dispatch({ type: CLEAN_ERROR_POINTS, payload: error });
  }

};



export const cleanErrorPints = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_POINTS })
  } catch (error) {
    dispatch({ type: POINTS_ERROR, payload: error });
  }

};