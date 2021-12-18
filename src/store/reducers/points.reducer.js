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
  SET_POINTS_GATEWAY,
  SET_POINTS_GATEWAYS_SUCCESS,
  POINTS_ERROR,
  CLEAN_ERROR_POINTS
} from '../constants';

export const initialState = {
  isLoadingRewardsPoints: false,
  successRewardsPoints: false,
  successCommissionPoints: false,
  successGatewayPoints: false,
  successLiquidPoints: false,
  successExecutePoints:false,
  errorPoints: false,
  rewardsData: [],
  commissionData: [],
  gatewayData: [],
  liquidData: [],
  executeData:[],
  error: {},
  success: {},
};

export default pointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REWARDS_POINTS:
      return { ...state, isLoadingRewardsPoints: true, errorPoints: false, };

    case REWARDS_POINTS_SUCCESS:
      return {
        ...state,
        isLoadingRewardsPoints: false,
        successRewardsPoints: true,
        errorPoints: false,
        rewardsData: action.payload,
        error: {}
      };
    case COMMISSION_POINTS:
      return { ...state, isLoadingRewardsPoints: true, errorPoints: false };
    case COMMISSION_POINTS_SUCCESS:
      return {
        ...state,
        isLoadingRewardsPoints: false,
        successCommissionPoints: true,
        errorPoints: false,
        commissionData: action.payload,
        error: {}
      };
    case GATEWAY_POINTS:
      return { ...state, isLoadingRewardsPoints: true, errorPoints: false };
    case GATEWAY_POINTS_SUCCESS:
      return {
        ...state,
        isLoadingRewardsPoints: false,
        successGatewayPoints: true,
        errorPoints: false,
        gatewayData: action.payload,
        error: {}
      };
    case LIQUID_POINTS:
      return { ...state, isLoadingRewardsPoints: true, errorPoints: false };
    case LIQUID_POINTS_SUCCESS:
      return {
        ...state,
        isLoadingRewardsPoints: false,
        successLiquidPoints: true,
        errorPoints: false,
        liquidData: action.payload,
        error: {}
      };
    case EXECUTES_POINTS:
      return { ...state, isLoadingRewardsPoints: true, errorPoints: false };
    case EXECUTES_POINTS_SUCCESS:
      return {
        ...state,
        isLoadingRewardsPoints: false,
        successExecutePoints: true,
        errorPoints: false,
        executeData: action.payload,
        error: {}
      };
    case POINTS_ERROR:
      return {
        ...state,
        isLoadingRewardsPoints: false,
        errorPoints: true,
        error: action.payload,
        success: {},
      };
    case CLEAN_ERROR_POINTS:
      return {
        ...state,
        isLoadingRewardsPoints: false,
        errorPoints: false,
        error: {},
      };

    default:
      return state;
  }
};
