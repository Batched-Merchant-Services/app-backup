import {
  VALIDATE_CODE_LICENSES,
  VALIDATE_CODE_LICENSES_SUCCESS,
  LICENSES_ERROR,
  CLEAN_ERROR_LICENSES,
  GET_LICENSES,
  GET_LICENSES_SUCCESS,
  GET_LIST_LICENSES,
  GET_LIST_LICENSES_SUCCESS,
  GET_TOTAL_LICENSES,
  GET_TOTAL_LICENSES_SUCCESS,
  GET_CRYPTO_CURRENCY,
  GET_CRYPTO_CURRENCY_SUCCESS,
  CURRENT_LICENSE,
  CREATE_LICENSE,
  CREATE_LICENSE_SUCCESS,
  GET_ADDRESS_CURRENCIES,
  GET_ADDRESS_CURRENCIES_SUCCESS,
	GET_TOTAL_LICENSES_IN_NETWORK,
  GET_TOTAL_LICENSES_IN_NETWORK_SUCCESS
} from '../constants';

export const initialState = {
  isLoadingLicenses: false,
  successLicenses: false,
  successGetLicenses: false,
  successListLicense: false,
  successTotalLicense: false,
  successCryptoCurrencies: false,
  successCreateLicense: false,
  showErrorLicenses: false,
  statusCodeReferral:false,
  dataLicenses: [],
  getLicenses: [],
  getListLicenses: [],
  totalLicenses: [],
  cryptoCurrencies: [],
  currentLicense: [],
  createLicenses: [],
  totalLicensesNetwork: null,
  addressCurrency: null,
  error: {},
  success: {},
};

export default licensesReducer = (state = initialState, action) => {
  console.log(action?.payload?.firstName !== ''?true:false)
  switch (action.type) {
    case VALIDATE_CODE_LICENSES:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case VALIDATE_CODE_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        successLicenses: true,
        showErrorLicenses: false,
        dataLicenses: action.payload,
        statusCodeReferral:action?.payload?.firstName !== ''?true:false,
        error: {},
        success: {},
      };
    case GET_LICENSES:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case GET_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        successGetLicenses: true,
        showErrorLicenses: false,
        getLicenses: action.payload,
        error: {},
        success: {},
      };
    case GET_LIST_LICENSES:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case GET_LIST_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        successListLicense: true,
        showErrorLicenses: false,
        getListLicenses: action.payload,
        error: {},
        success: {},
      };
    case GET_TOTAL_LICENSES:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case GET_TOTAL_LICENSES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        successTotalLicense: true,
        showErrorLicenses: false,
        totalLicenses: action.payload,
        error: {},
        success: {},
      };
    case GET_CRYPTO_CURRENCY:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case GET_CRYPTO_CURRENCY_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        successCryptoCurrencies: true,
        showErrorLicenses: false,
        cryptoCurrencies: action.payload,
        error: {},
        success: {},
      };
    case CURRENT_LICENSE:
      return {
        ...state,
        showErrorLicenses: false,
        currentLicense: action.payload,
        error: {},
        success: {},
      };
    case CREATE_LICENSE:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case CREATE_LICENSE_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        successCreateLicense: true,
        showErrorLicenses: false,
        createLicenses: action.payload,
        error: {},
        success: {},
      };
    case GET_ADDRESS_CURRENCIES:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case GET_ADDRESS_CURRENCIES_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        showErrorLicenses: false,
        addressCurrency: action.payload,
        error: {},
        success: {},
      };
    case GET_TOTAL_LICENSES_IN_NETWORK:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case GET_TOTAL_LICENSES_IN_NETWORK_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        showErrorLicenses: false,
        totalLicensesNetwork: action.payload,
        error: {},
      };

    case LICENSES_ERROR:
      return {
        ...state,
        isLoadingLicenses: false,
        successLicenses: false,
        successGetLicenses: false,
        successListLicense: false,
        successTotalLicense: false,
        successCryptoCurrencies: false,
        showErrorLicenses: true,
        error: action.payload,
        success: {},
      };

    case CLEAN_ERROR_LICENSES:
      return {
        ...state,
        isLoadingLicenses: false,
        successLicenses: false,
        successListLicense: false,
        successTotalLicense: false,
        successGetLicenses: false,
        successCryptoCurrencies: false,
        successCreateLicense: false,
        showErrorLicenses: false,
        error: {},
        success: {},
      };


    default:
      return state;
  }
};
