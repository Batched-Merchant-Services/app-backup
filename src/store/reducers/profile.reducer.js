import {
  CLEAN_ERROR_PROFILE,
  CREATE_ADDRESS,
  CREATE_ADDRESS_SUCCESS,
  CREATE_BANK_INFO,
  CREATE_BANK_INFO_SUCCESS,
  CREATE_KYC,
  CREATE_KYC_SUCCESS,
  EDIT_ADDRESS,
  EDIT_ADDRESS_SUCCESS,
  EDIT_BANK_INFO,
  EDIT_BANK_INFO_SUCCESS,
  EDIT_KYC,
  EDIT_KYC_SUCCESS,
  PROFILE_ERROR,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_INFO_SUCCESS
} from '../constants';

export const initialState = {
  isLoadingProfile: false,
  finishProfileSuccess: false,
  successCreateAddress: false,
  successCreateKYC: false,
  successEditAddress: false,
  successCreateBankInfo: false,
  successEditBankInfo: false,
  successEditBankInfo: false,
  successEditKYC: false,
  successUpdateInfo:false,
  dataUpdateProfile:null,
  dataCreateKYC: null,
  dataCreateBankInfo: null,
  dataCreateBankInfo: null,
  dataCreateKYC: null,
  dataCreateAddress: null,
  showError: false,
  error: {},
  success: {},
};

export default profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_INFO:
      return { ...state, isLoadingProfile: true, errorPoints: false };
    case UPDATE_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successUpdateInfo: true,
        errorPoints: false,
        dataUpdateProfile: action.payload,
        error: {}
      };
    case CREATE_ADDRESS:
      return { ...state, isLoadingProfile: true, errorPoints: false };
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successCreateAddress: true,
        errorPoints: false,
        dataCreateAddress: action.payload,
        error: {}
      };
    case EDIT_ADDRESS:
      return { ...state, isLoadingProfile: true, errorPoints: false };
    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successEditAddress: true,
        errorPoints: false,
        dataCreateAddress: action.payload,
        error: {}
      };
    case CREATE_KYC:
      return { ...state, isLoadingProfile: true, errorPoints: false };
    case CREATE_KYC_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successCreateKYC: true,
        errorPoints: false,
        dataCreateKYC: action.payload,
        error: {}
      };
    case EDIT_KYC:
      return { ...state, isLoadingProfile: true, errorPoints: false };
    case EDIT_KYC_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successEditKYC: true,
        errorPoints: false,
        dataCreateKYC: action.payload,
        error: {}
      };
    case CREATE_BANK_INFO:
      return { ...state, isLoadingProfile: true, errorPoints: false };
    case CREATE_BANK_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successCreateBankInfo: true,
        errorPoints: false,
        dataCreateBankInfo: action.payload,
        error: {}
      };
    case EDIT_BANK_INFO:
      return { ...state, isLoadingProfile: true, errorPoints: false };
    case EDIT_BANK_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successEditBankInfo: true,
        errorPoints: false,
        dataCreateBankInfo: action.payload,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        isLoadingProfile: false,
        finishProfileSuccess: false,
        isLoggedIn: false,
        showError: true,
        error: action.payload,
        success: {},
      };
    case CLEAN_ERROR_PROFILE:
      return {
        ...state,
        isLoadingProfile: false,
        finishProfileSuccess: false,
        sendMessage: false,
        showError: false,
        error: {},
      };
    default:
      return state;
  }
};

