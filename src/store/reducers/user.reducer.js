import {
	GET_USER_DATA,
	GET_USER_DATA_SUCCESS,
	USER_ERROR,
	CLEAN_DATA_USER
} from '../constants';

export const initialState = {
	isLoadingData: false,
	showErrorUser: false,
	dataUser: [],
	error: {},
};

export default userReducer = (state = initialState, action) => {
	switch (action.type) {

		case GET_USER_DATA:
			return { ...state, isLoadingData: true, showErrorUser: false };

		case GET_USER_DATA_SUCCESS:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: false,
				dataUser: action.payload,
				error: {},
			};
		case USER_ERROR:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: true,
				error: action.payload,
			};

		case CLEAN_DATA_USER:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: false,
				dataUser: null,
				error: {},
			};

		default:
			return state;
	}
};
