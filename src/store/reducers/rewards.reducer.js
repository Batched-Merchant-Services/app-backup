import {
	VALIDATE_REWARDS_BY_USER,
	VALIDATE_REWARDS_BY_USER_SUCCESS,
	VALIDATE_REWARDS_IN_NETWORK,
	VALIDATE_REWARDS_IN_NETWORK_SUCCESS,
	VALIDATE_REWARDS_STATUS,
	VALIDATE_REWARDS,
  VALIDATE_REWARDS_SUCCESS,
	CONFIG_REWARDS,
	CONFIG_REWARDS_SUCCESS,
	REWARDS_ERROR,
	CLEAN_REWARDS
} from '../constants';

export const initialState = {
	isLoadingRewards: false,
	showErrorRewards: false,
	inProcess: false,
	successReward:false,
	totalRewardInNetwork: 0,
	isStart:false,
	configRewards: null,
	error: {},
};

export default rewardsReducer = (state = initialState, action) => {
	switch (action.type) {

		case VALIDATE_REWARDS_BY_USER:
			return { ...state, isLoadingRewards: true, showErrorRewards: false };

		case VALIDATE_REWARDS_BY_USER_SUCCESS:
			return {
				...state,
				isLoadingRewards: false,
				showErrorRewards: false,
				inProcess: action.payload,
				error: {},
			};

			case VALIDATE_REWARDS_IN_NETWORK:
			return { ...state, isLoadingRewards: true, showErrorRewards: false };

		case VALIDATE_REWARDS_IN_NETWORK_SUCCESS:
			return {
				...state,
				isLoadingRewards: false,
				showErrorRewards: false,
				totalRewardInNetwork: action.payload,
				error: {},
			};


		case VALIDATE_REWARDS_STATUS:
			return {
				...state,
				loading: false,
				getRewardsStatus: action.payload,
				showError: false,
			};
			case VALIDATE_REWARDS:
			return { ...state, isLoadingRewards: true, showErrorRewards: false };

		case VALIDATE_REWARDS_SUCCESS:
			return {
				...state,
				isLoadingRewards: false,
				showErrorRewards: false,
				isStart: action.payload,
				error: {},
			};
		case VALIDATE_REWARDS_STATUS:
			return {
				...state,
				loading: false,
				getRewardsStatus: action.payload,
				showError: false,
			};

		case CONFIG_REWARDS:
			return { ...state, isLoadingRewards: true, showErrorRewards: false,successReward:false };

		case CONFIG_REWARDS_SUCCESS:
			return {
				...state,
				isLoadingRewards: false,
				showErrorRewards: false,
				successReward: true,
				configRewards: action.payload,
				error: {},
			};

		case REWARDS_ERROR:
			return {
				...state,
				isLoadingRewards: false,
				showErrorRewards: true,
				error: action.payload,
			};

		case CLEAN_REWARDS:
			return {
				...state,
				isLoadingRewards: false,
				showErrorRewards: false,
				successReward:false,
				inProcess: false,
				error: {},
			};

		default:
			return state;
	}
};
