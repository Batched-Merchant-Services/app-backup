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
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen } from './app.actions';
import { GET_POOL_BALANCE, GET_TRANSACTIONS_TOKENS } from '../../utils/api/queries/points.queries';
import { getUTCDateString } from '@utils/formatters';


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
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: COMMISSION_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: POINTS_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
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
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: REWARDS_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: POINTS_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
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
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GATEWAY_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: POINTS_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
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
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: LIQUID_POINTS_SUCCESS, payload: response?.data['getBalanceTokens'] });
      }
    }).catch((error) => {
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: POINTS_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};


export const getExecutedPointsTransactions = ({ id, pool,offset }) => async (dispatch) => {
  console.log('values',id, pool,offset)
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EXECUTES_POINTS });
   
    client.query({
      query: GET_TRANSACTIONS_TOKENS,
      variables: {
        token:token,
        id:id,
        pool: pool,
        pageNumber:8,
        rowsOfPage:offset
      }
    }).then(async (response) => {
      console.log('getExecutedPointsTransactions response',response)
      if (response.data) {
        const executeResponse = response?.data['getAccountTransactionsTokens'] ? response?.data['getAccountTransactionsTokens'].length > 0 ? response?.data['getAccountTransactionsTokens']:[]:[] 
        console.log('executeResponse',executeResponse)
        dispatch({ type: EXECUTES_POINTS_SUCCESS, payload: executeResponse });
      }
    }).catch((error) => {
      console.log('getExecutedPointsTransactions error1',error)
      dispatch({ type: POINTS_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('getExecutedPointsTransactions error2',error)
    dispatch({ type: POINTS_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};



export const cleanErrorPoints = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_POINTS })
  } catch (error) {
    dispatch({ type: POINTS_ERROR, payload: error });
  }

};