import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_ERROR,
  CLEAN_ERROR
} from '../constants';

export const initialState = {
  user: [],
  headers: {},
  isLoggedIn: false,
  isLoggingIn: false,
  finishSuccess:false,
  showError:false,
  isResettingPassword: false,
  isUpdating: true,
  error: {},
  success: {},
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggingIn: true,  showError:false, };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        showError:false,
        user: action.payload,
        error: {},
        success: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        showError:true,
        error: action.payload,
        user: null,
        success: {},
      };
      case SET_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        finishSuccess:false,
        showError:true,
        error: action.payload,
        user: null,
        success: {},
      };

      case CLEAN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        showError:false,
        error: {},
      };
      

    default:
      return state;
  }
};
