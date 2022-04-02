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
  GET_TOTAL_LICENSES_IN_NETWORK_SUCCESS,
  GET_TOTAL_LICENSES_FOR_USER,
  GET_TOTAL_LICENSES_FOR_USER_SUCCESS,
  GET_PRICE_CRYPTO,
  GET_PRICE_CRYPTO_SUCCESS,
  GET_TYPE_CURRENCIES_CRYPTO,
  GET_TYPE_CURRENCIES_CRYPTO_SUCCESS,
  GENERATE_CRYPTO_ADDRESS,
  GET_TYPE_CURRENCIES_FEE_SUCCESS,
  GENERATE_CRYPTO_ADDRESS_SUCCESS,
  GET_FESS,
  GET_FESS_SUCCESS
} from '../constants';

export const initialState = {
  isLoadingLicenses: false,
  isGetAddress: false,
  isGetLicenses: false,
  isGetListLicense: false,
  isCreateLicense: false,
  successLicenses: false,
  successGetLicenses: false,
  successListLicense: false,
  successTotalLicense: false,
  successCryptoCurrencies: false,
  successCreateLicense: false,
  showErrorLicenses: false,
  statusCodeReferral: false,
  getPriceCrypto:false,
  getTypeCurrency:false,
  getFee:false,
  successGenerateAddress:false,
  dataLicenses: [],
  getLicenses: [],
  getListLicenses: [],
  totalLicenses: [],
  cryptoCurrencies: [],
  currentLicense: [],
  createLicenses: [],
  totalLicensesNetwork: null,
  totalLicensesForUsers: null,
  addressCurrency: null,
  priceCrypto: null,
  typeCryptoCurrencies:null,
  dataAddress:null,
  totalFee:0,
  feeCurrency:0,
  error: {},
  success: {},
};

export default licensesReducer = (state = initialState, action) => {

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
        statusCodeReferral: action?.payload?.firstName !== '' ? true : false,
        error: {},
        success: {},
      };
    case GET_LICENSES:
      return { ...state, isGetLicenses: true, showErrorLicenses: false };

    case GET_LICENSES_SUCCESS:
      return {
        ...state,
        isGetLicenses: false,
        successGetLicenses: true,
        showErrorLicenses: false,
        getLicenses: action.payload,
        error: {},
        success: {},
      };
    case GET_LIST_LICENSES:
      return { ...state, isGetListLicense: true, showErrorLicenses: false };

    case GET_LIST_LICENSES_SUCCESS:
      return {
        ...state,
        isGetListLicense: false,
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
      return { ...state, isCreateLicense: true, showErrorLicenses: false };

    case CREATE_LICENSE_SUCCESS:
      return {
        ...state,
        isCreateLicense: false,
        successCreateLicense: true,
        showErrorLicenses: false,
        createLicenses: action.payload,
        error: {},
        success: {},
      };
    case GET_ADDRESS_CURRENCIES:
      return { ...state, isGetAddress: true, showErrorLicenses: false };

    case GET_ADDRESS_CURRENCIES_SUCCESS:
      return {
        ...state,
        isGetAddress: false,
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

    case GET_TOTAL_LICENSES_FOR_USER:
      return { ...state, isLoadingLicenses: true, showErrorLicenses: false };

    case GET_TOTAL_LICENSES_FOR_USER_SUCCESS:
      return {
        ...state,
        isLoadingLicenses: false,
        showErrorLicenses: false,
        totalLicensesForUsers: action.payload,
        error: {},
      };
    case GET_PRICE_CRYPTO:
      return { ...state, getPriceCrypto: true, showErrorLicenses: false };

    case GET_PRICE_CRYPTO_SUCCESS:
      return {
        ...state,
        getPriceCrypto: false,
        showErrorLicenses: false,
        priceCrypto: action.payload,
        error: {},
      };

    case GET_TYPE_CURRENCIES_CRYPTO:
      return { ...state, getTypeCurrency: true, showErrorLicenses: false };

    case GET_TYPE_CURRENCIES_CRYPTO_SUCCESS:
      return {
        ...state,
        getTypeCurrency: false,
        showErrorLicenses: false,
        typeCryptoCurrencies: action.payload,
        error: {},
      };
      case GET_TYPE_CURRENCIES_FEE_SUCCESS:
      return {
        ...state,
        getTypeCurrency: false,
        showErrorLicenses: false,
        feeCurrency: action.payload,
        error: {},
      };

      
    case GENERATE_CRYPTO_ADDRESS:
      return { ...state, generateAddress: true, showErrorLicenses: false,successGenerateAddress:false };

    case GENERATE_CRYPTO_ADDRESS_SUCCESS:
      return {
        ...state,
        generateAddress: false,
        showErrorLicenses: false,
        successGenerateAddress:true,
        dataAddress: action.payload,
        error: {},
      };
    case GET_FESS:
      return { ...state, getFee: true, showErrorLicenses: false };

    case GET_FESS_SUCCESS:
      return {
        ...state,
        getFee: false,
        showErrorLicenses: false,
        totalFee: action.payload,
        error: {},
      };

    case LICENSES_ERROR:
      return {
        ...state,
        isLoadingLicenses: false,
        getPriceCrypto:false,
        getFee:false,
        getTypeCurrency:false,
        generateAddress:false,
        successLicenses: false,
        successGetLicenses: false,
        successListLicense: false,
        successTotalLicense: false,
        successCryptoCurrencies: false,
        successCreateLicense: false,
        showErrorLicenses: true,
        statusCodeReferral: false,
        successGenerateAddress:false,
        error: action.payload,
        success: {},
      };

    case CLEAN_ERROR_LICENSES:
      return {
        ...state,
        isLoadingLicenses: false,
        successLicenses: false,
        getPriceCrypto:false,
        getFee:false,
        getTypeCurrency:false,
        generateAddress:false,
        successListLicense: false,
        successTotalLicense: false,
        successGetLicenses: false,
        successCryptoCurrencies: false,
        successCreateLicense: false,
        showErrorLicenses: false,
        statusCodeReferral: false,
        successGenerateAddress:false,
        error: {},
        success: {},
      };


    default:
      return state;
  }
};
