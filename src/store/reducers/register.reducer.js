import {
  REGISTER,
  REGISTER_SUCCESS,
  VALIDATE_CODE,
  VALIDATE_CODE_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_GENDER,
  GET_GENDER_SUCCESS,
  VALIDATE_SMS,
  VALIDATE_SMS_SUCCESS,
  REGISTER_PROFILE,
  REGISTER_PROFILE_SUCCESS,
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,

  //actions generics
  REGISTER_ERROR,
  CLEAN_ERROR_REGISTER,
} from '../constants';

export const initialState = {
  dataRegister: [],
  countries: [],
  gender: [],
  isLoading: false,
  finishValidateCodeSuccess: false,
  finishRegisterSuccess: false,
  finishSmsSuccess: false,
  finishRProfileSuccess: false,
  finishSetPasswordSuccess: false,
  finishSuccess: false,
  finishGetCountries: false,
  finishGetGender: false,
  showError: false,
  isResettingPassword: false,
  isUpdating: true,
  error: {},
  success: {},
};

export default registerReducer = (state = initialState, action) => {
  console.log('action', action, state);
  switch (action.type) {

    case VALIDATE_CODE:
      return {
        ...state,
        isLoading: true,
        showError: false
      };
    case VALIDATE_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishValidateCodeSuccess: true,
        showError: false,
        //dataRegister: action.payload,
        error: {},
        success: {},
      };
    case REGISTER:
      return { ...state, isLoading: true, showError: false, };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishRegisterSuccess: true,
        showError: false,
        dataRegister: action.payload,
        error: {},
        success: {},
      };
    case GET_COUNTRIES:
      return { ...state, isLoading: true, showError: false, };

    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishGetCountries: true,
        showError: false,
        countries: action.payload,
        error: {},
        success: {},
      };

    case GET_GENDER:
      return { ...state, isLoading: true, showError: false, };

    case GET_GENDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishGetGender: true,
        showError: false,
        gender: action.payload,
        error: {},
        success: {},
      };

    case VALIDATE_SMS:
      return {
        ...state,
        isLoading: true,
        showError: false
      };
    case VALIDATE_SMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishSmsSuccess: true,
        showError: false,
        //dataRegister: action.payload,
        error: {},
        success: {},
      };
    case REGISTER_PROFILE:
      return { ...state, isLoading: true, showError: false, };

    case REGISTER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishRProfileSuccess: true,
        showError: false,
        //dataRegister: action.payload,
        error: {},
        success: {},
      };

    case SET_PASSWORD:
      return { ...state, isLoading: true, showError: false, };

    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finishSetPasswordSuccess: true,
        showError: false,
        //dataRegister: action.payload,
        error: {},
        success: {},
      };

    case REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        finishValidateCodeSuccess: false,
        finishRegisterSuccess: false,
        finishSmsSuccess:false,
        finishRProfileSuccess:false,
        finishSetPasswordSuccess:false,
        finishSuccess: false,
        finishGetCountries: false,
        finishGetGender: false,
        showError: true,
        error: action.payload,
        // dataRegister: null,
        success: {},
      };

    case CLEAN_ERROR_REGISTER:
      return {
        ...state,
        isLoading: false,
        finishValidateCodeSuccess: false,
        finishRegisterSuccess: false,
        finishSmsSuccess:false,
        finishRProfileSuccess:false,
        finishSetPasswordSuccess:false,
        finishSuccess: false,
        finishGetCountries: false,
        finishGetGender: false,
        showError: false,
        error: {},
      };

    default:
      return state;
  }
};
