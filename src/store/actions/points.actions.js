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
  EXECUTES_POINTS_COMMISSION_SUCCESS,
  SET_POINTS_GATEWAY_LIQUIDITY,
  SET_POINTS_GATEWAY_LIQUIDITY_SUCCESS,
  pointsConstants,
  POINTS_ERROR,
  CLEAN_ERROR_POINTS,
  walletConstants
} from '../constants'
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen } from './app.actions';
import { CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS, CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS_TO_CLIENT, GET_POOL_BALANCE, GET_TRANSACTIONS_TOKENS } from '../../utils/api/queries/points.queries';
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
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EXECUTES_POINTS });
   
    client.query({
      query: GET_TRANSACTIONS_TOKENS,
      variables: {
        token:token,
        id:id,
        pool: pool,
        pageNumber:offset,
        rowsOfPage:10
      }
    }).then(async (response) => {
      if (response.data) {
        const executeResponse = response?.data['getAccountTransactionsTokens'];  
        dispatch({ type: EXECUTES_POINTS_SUCCESS, payload: executeResponse });
        switch (pool) {
          case 1:
            dispatch({ type: EXECUTES_POINTS_COMMISSION_SUCCESS , payload: executeResponse });
            break;
        }
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


export const setRewardsPointsToTransactionGateway = ({ address, amount,code }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY });
    client.mutate({
      mutation: CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS,
      variables: {
        token:token,
        withdrawalAddress: address??'',
        withdrawalPool: pointsConstants.POOLS.REWARDS??'',
        depositAddress: address??'',
        depositPool: pointsConstants.POOLS.GATEWAY,
        amount: amount,
        transactionDate: new Date(),
        note: `Send points to gateway for ${address}`,
        code:code
      }
    }).then(async (response) => {
  
      if (response.data) {
        dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY_SUCCESS, payload: response?.data['createPoolTransactionByTokenAddress'] });
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


export const setGatewayPointsToTransactionRewards = ({ address, amount,code }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY });
    client.mutate({
      mutation: CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS,
      variables: {
        token:token,
        withdrawalAddress: address??'',
        withdrawalPool: pointsConstants.POOLS.GATEWAY??'',
        depositAddress: address??'',
        depositPool: pointsConstants.POOLS.REWARDS,
        amount: amount,
        transactionDate: new Date(),
        note: `Send points to gateway for ${address}`,
        code:code
      }
    }).then(async (response) => {
  
      if (response.data) {
        dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY_SUCCESS, payload: response?.data['createPoolTransactionByTokenAddress'] });
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


export const setCommissionBalanceToLiquidityPool = ({ address, amount,code }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY });
    client.mutate({
      mutation: CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS,
      variables: {
        token:token,
        withdrawalAddress: address??'',
        withdrawalPool: pointsConstants.POOLS.COMMISSION??'',
        depositAddress: address??'',
        depositPool: pointsConstants.POOLS.LIQUIDITY,
        amount: amount,
        transactionDate: new Date(),
        note: `Liquidity points for ${address}`,
        code:code
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY_SUCCESS, payload: response?.data['createPoolTransactionByTokenAddress'] });
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


export const setLiquidityPoolToUulalaWallet = ({ address, amount,depositClient,code }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY });
    client.mutate({
      mutation: CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS_TO_CLIENT,
      variables: {
        token:token,
        withdrawalAddress: address??'',
        withdrawalPool:pointsConstants.POOLS.LIQUIDITY??'',
        amountAddress:amount / 0.1??0,
        depositClient:depositClient??'',
        depositPool: walletConstants.POOLS.PENDING,
        amountClient: amount,
        transactionDate: new Date(),
        note: `Sent points to wallet for ${address}`,
        code:code
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_POINTS_GATEWAY_LIQUIDITY_SUCCESS, payload: response?.data['createPoolTransactionByTokenAddressToClient'] });
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




export const cleanErrorPoints = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_POINTS })
  } catch (error) {
    dispatch({ type: POINTS_ERROR, payload: error });
  }

};