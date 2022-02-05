import {
  LOGIN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_ERROR,
  CLEAN_ERROR,
  VALIDATE_SESSION,
  VALIDATE_SESSION_SUCCESS,
  VALIDATE_CODE_SMS,
  VALIDATE_CODE_SMS_SUCCESS,
  VALIDATE_CODE_EMAIL,
  VALIDATE_CODE_EMAIL_SUCCESS,
  GET_KEY_TWO_FACTORS,
  GET_KEY_TWO_FACTORS_SUCCESS
} from '../constants';

export const initialState = {
  user: [],
  headers: {},
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggedOut: false,
  isSession: false,
  finishSuccess: false,
  showError: false,
  isResettingPassword: false,
  isUpdating: true,
  isValidateCode: false,
  isGetInfoQrCode:false,
  successQrCode:false,
  successValidateCode: false,
  dataQrCode:null,
  dataCode: null,
  dataCodeEmail: null,
  error: {},
  success: {},
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggingIn: true, showError: false, };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        isSession: true,
        showError: false,
        user: action.payload,
        error: {},
        success: {},
      };
    case LOGOUT:
      return { ...state, isLoggingIn: true, showError: false, };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedOut: true,
        isSession: false,
        showError: false,
        error: {},
        success: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        showError: true,
        error: action.payload,
        user: null,
        success: {},
      };
    case SET_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        finishSuccess: false,
        showError: true,
        error: action.payload,
        user: null,
        success: {},
      };
    case VALIDATE_SESSION:
      return { ...state, isLoggingIn: true, showError: false, };
    case VALIDATE_SESSION_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        showError: false,
        user: action.payload,
        error: {},
        success: {},
      };
    case GET_KEY_TWO_FACTORS:
      return { ...state, isGetInfoQrCode: true, showError: false, };
    case GET_KEY_TWO_FACTORS_SUCCESS:
      return {
        ...state,
        isGetInfoQrCode: false,
        successQrCode: true,
        showError: false,
        dataQrCode: action.payload,
        error: {},
        success: {},
      };
    case VALIDATE_CODE_SMS:
      return { ...state, isValidateCode: true, showError: false, };
    case VALIDATE_CODE_SMS_SUCCESS:
      return {
        ...state,
        isValidateCode: false,
        successValidateCode: true,
        showError: false,
        dataCode: action.payload,
        error: {},
        success: {},
      };
    case VALIDATE_CODE_EMAIL:
      return { ...state, isValidateCode: true, showError: false, };
    case VALIDATE_CODE_EMAIL_SUCCESS:
      return {
        ...state,
        isValidateCode: false,
        successValidateCode: true,
        showError: false,
        dataCode: action.payload,
        error: {},
        success: {},
      };
    case CLEAN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isSession: false,
        isLoggedIn: false,
        isLoggedOut: false,
        showError: false,
        dataCode: null,
        error: {},
      };


    default:
      return state;
  }
};
