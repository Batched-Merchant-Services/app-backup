import {
  FORGOT_YOUR_PASSWORD,
  FORGOT_YOUR_PASSWORD_SUCCESS,
  FORGOT_ERROR,
  CLEAN_ERROR_FORGOT,
  CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_SUCCESS,
} from '../constants';

export const initialState = {
  isLoadingForgot: false,
  finishForgotSuccess:false,
  showError:false,
  error: {},
  success: {},
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_YOUR_PASSWORD:
      return { ...state, isLoadingForgot: true,  showError:false, };

    case FORGOT_YOUR_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingForgot:false,
        finishForgotSuccess: true,
        showError:false,
        error: {},
        success: {},
      };
    case FORGOT_ERROR:
      return {
        ...state,
        isLoadingForgot: false,
        isLoggedIn: false,
        showError:true,
        error: action.payload,
        success: {},
      };
      case CLEAN_ERROR_FORGOT:
      return {
        ...state,
        isLoadingForgot:false,
        finishForgotSuccess: false,
        showError:false,
        error: {},
      };
      

    default:
      return state;
  }
};

