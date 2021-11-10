import {
  VALIDATE_CODE_LICENSES,
  VALIDATE_CODE_LICENSES_SUCCESS,
  LICENSES_ERROR,
  CLEAN_ERROR_LICENSES
} from '../constants';

export const initialState = {
  isLoadingLicenses:false,
  showErrorLicensesLicenses:false,
  dataLicenses:[],
  error: {},
  success: {},
};

export default licensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_CODE_LICENSES:
      return { ...state, isLoadingLicenses: true,  showErrorLicenses:false, };

    case VALIDATE_CODE_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        showErrorLicenses:false,
        dataLicenses: action.payload,
        error: {},
        success: {},
      };
    case LICENSES_ERROR:
      return {
        ...state,
        isLoadingLicenses: false,
        showErrorLicenses:true,
        error: action.payload,
        dataLicenses: null,
        success: {},
      };
      
      case CLEAN_ERROR_LICENSES:
      return {
        ...state,
        isLoadingLicenses: false,
        showErrorLicenses:false,
        error: {},
      };
      

    default:
      return state;
  }
};
