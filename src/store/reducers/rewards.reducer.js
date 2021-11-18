import {
	VALIDATE_REWARDS_BY_USER,
	VALIDATE_REWARDS_BY_USER_SUCCESS,
	CONFIG_REWARDS,
	CONFIG_REWARDS_SUCCESS,
	REWARDS_ERROR,
	CLEAN_REWARDS
} from '../constants';

export const initialState = {
	isLoadingRewards: false,
	showErrorRewards: false,
	inProcess: false,
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

		case CONFIG_REWARDS:
			return { ...state, isLoadingRewards: true, showErrorRewards: false };

		case CONFIG_REWARDS_SUCCESS:
			return {
				...state,
				isLoadingRewards: false,
				showErrorRewards: false,
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
				inProcess: false,
				error: {},
			};

		default:
			return state;
	}
};
