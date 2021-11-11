import {
  VALIDATE_CODE_LICENSES,
  VALIDATE_CODE_LICENSES_SUCCESS,
  LICENSES_ERROR,
  CLEAN_ERROR_LICENSES,
  GET_LICENSES,
  GET_LICENSES_SUCCESS,
  GET_LIST_LICENSES,
  GET_LIST_LICENSES_SUCCESS
} from '../constants';

export const initialState = {
  isLoadingLicenses:false,
  successLicenses:false,
  successGetLicenses:false,
  successListLicense:false,
  showErrorLicenses:false,
  dataLicenses:[],
  getLicenses:[],
  getListLicenses:[],
  error: {},
  success: {},
};

export default licensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_CODE_LICENSES:
      return { ...state, isLoadingLicenses: true,  showErrorLicenses:false};

    case VALIDATE_CODE_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        successLicenses:true,
        showErrorLicenses:false,
        dataLicenses: action.payload,
        error: {},
        success: {},
      };
      case GET_LICENSES:
      return { ...state, isLoadingLicenses: true,  showErrorLicenses:false};

    case GET_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses:false,
        successGetLicenses:true,
        showErrorLicenses:false,
        getLicenses: action.payload,
        error: {},
        success: {},
      };
      case GET_LIST_LICENSES:
      return { ...state, isLoadingLicenses: true,  showErrorLicenses:false};

    case GET_LIST_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses:false,
        successListLicense:true,
        showErrorLicenses:false,
        getListLicenses: action.payload,
        error: {},
        success: {},
      };
    case LICENSES_ERROR:
      return {
        ...state,
        isLoadingLicenses: false,
        successLicenses:false,
        successGetLicenses:false,
        successListLicense:false,
        showErrorLicenses:true,
        error: action.payload,
        dataLicenses: null,
        getListLicenses:null,
        success: {},
      };
      
      case CLEAN_ERROR_LICENSES:
      return {
        ...state,
        isLoadingLicenses: false,
        successLicenses:false,
        successListLicense:false,
        successGetLicenses:false,
        showErrorLicenses:false,
        error: {},
        success: {},
      };
      

    default:
      return state;
  }
};
