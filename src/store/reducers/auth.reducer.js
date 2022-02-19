import {
  LOGIN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGIN_TWO_FACTORS_SUCCESS,
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
  GET_KEY_TWO_FACTORS_SUCCESS,
  GET_ENABLE_THIRD_PARTY,
  GET_ENABLE_THIRD_PARTY_SUCCESS,
  GET_ENABLE_SMS,
  GET_ENABLE_SMS_SUCCESS,
  GET_ENABLE_EMAIL,
  GET_ENABLE_EMAIL_SUCCESS
} from '../constants';

export const initialState = {
  user: [],
  headers: {},
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggedOut: false,
  isSession: false,
  isSessionTwoFactors:false,
  finishSuccess: false,
  showError: false,
  isResettingPassword: false,
  isUpdating: true,
  isValidateCode: false,
  isGetInfoQrCode: false,
  successQrCode: false,
  successValidateCode: false,
  isActivateApp:false,
  successActivateApp:false,
  isActivateSms:false,
  successActivateSms:false,
  isActivateEmail:false,
  successActivateEmail:false,
  codeLeft:null,
  dataQrCode: null,
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
      case LOGIN_TWO_FACTORS_SUCCESS:
        return {
          ...state,
          isLoggingIn: false,
          isLoggedIn: true,
          isSessionTwoFactors: true,
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
    case GET_ENABLE_THIRD_PARTY:
      return { ...state, isActivateApp: true, showError: false, };
    case GET_ENABLE_THIRD_PARTY_SUCCESS:
      return {
        ...state,
        isActivateApp: false,
        successActivateApp: true,
        showError: false,
        error: {},
        success: {},
      };
    case GET_ENABLE_SMS:
      return { ...state, isActivateSms: true, showError: false, };
    case GET_ENABLE_SMS_SUCCESS:
      return {
        ...state,
        isActivateSms: false,
        successActivateSms: true,
        showError: false,
        codeLeft: action.payload,
        error: {},
        success: {},
      };
    case GET_ENABLE_EMAIL:
      return { ...state, isActivateEmail: true, showError: false, };
    case GET_ENABLE_EMAIL_SUCCESS:
      return {
        ...state,
        isActivateEmail: false,
        successActivateEmail: true,
        showError: false,
        codeLeft: action.payload,
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
        isSessionTwoFactors: false,
        finishSuccess: false,
        isResettingPassword: false,
        isUpdating: true,
        isValidateCode: false,
        isGetInfoQrCode: false,
        successQrCode: false,
        successValidateCode: false,
        isActivateApp:false,
        successActivateApp:false,
        isActivateSms:false,
        successActivateSms:false,
        isActivateEmail:false,
        successActivateEmail:false,
        dataCode: null,
        error: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        isLoggedOut: false,
        isSession: false,
        isSessionTwoFactors: false,
        finishSuccess: false,
        showError: false,
        isResettingPassword: false,
        isUpdating: true,
        isValidateCode: false,
        isGetInfoQrCode: false,
        successQrCode: false,
        successValidateCode: false,
        isActivateApp:false,
        successActivateApp:false,
        isActivateSms:false,
        successActivateSms:false,
        isActivateEmail:false,
        successActivateEmail:false,
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

    default:
      return state;
  }
};
