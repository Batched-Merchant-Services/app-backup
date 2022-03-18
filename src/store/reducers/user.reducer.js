import {
	GET_USER_DATA,
	GET_USER_DATA_SUCCESS,
	USER_ERROR,
	CLEAN_DATA_USER,
	SET_FILE_URL,
	SET_FILE_FRONT,
	SET_FILE_BACK,
	SET_FILE_URL_SUCCESS,
	SET_FILE_FRONT_SUCCESS,
	SET_FILE_BACK_SUCCESS,
	SET_FILE_ADDRESS_SUCCESS,
	SET_FILE_SELFIE_SUCCESS,
	SET_FILE_URL_ERROR,
	CLEAN_DATA_FILE
} from '../constants';

export const initialState = {
	isLoadingData: false,
	isLoadingFile: false,
	showErrorUser: false,
	showErrorFile: false,
	successDataUser:false,
	setFile: null,
	fileFront: null,
	fileBack: null,
	fileAddress: null,
	fileSelfie: null,
	dataUser: [],
	error: {},
	errorFile: {}

};

export default userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_DATA:
			return { ...state, isLoadingData: true, showErrorUser: false,successDataUser:false };

		case GET_USER_DATA_SUCCESS:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: false,
				successDataUser:true,
				dataUser: action.payload,
				error: {},
			};
		case SET_FILE_URL:
			return { ...state, isLoadingFile: true, showErrorUser: false };
		case SET_FILE_FRONT:
			return { ...state, isLoadingFile: true, showErrorUser: false };
		case SET_FILE_BACK:
			return { ...state, isLoadingFile: true, showErrorUser: false };
		case SET_FILE_URL_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				setFile: action.payload,
				error: {},
			};
		case SET_FILE_FRONT_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				fileFront: action.payload,
				error: {}
			};
		case SET_FILE_BACK_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				fileBack: action.payload,
				error: {}
			};
		case SET_FILE_ADDRESS_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				fileAddress: action.payload,
				error: {}
			};
		case SET_FILE_SELFIE_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				fileSelfie: action.payload,
				error: {}
			};
		case SET_FILE_URL_ERROR:
			return {
				...state,
				isLoadingData: false,
				showErrorFile: true,
				errorFile: action.payload,
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
				showErrorFile: false,
				successDataUser:false,
				dataUser: null,
				error: {},
				errorFile: {}
			};
		case CLEAN_DATA_FILE:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: false,
				showErrorFile: false,
				successDataUser:false,
				setFile: null,
				error: {},
				errorFile: {}
			};

		default:
			return state;
	}
};
