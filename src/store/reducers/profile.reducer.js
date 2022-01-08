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
  TYPE_IDENTIFICATION,
  TYPE_IDENTIFICATION_SUCCESS,
  UPDATE_PROFILE_AVATAR,
  UPDATE_PROFILE_AVATAR_SUCCESS,
  PROFILE_ERROR,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_INFO_SUCCESS
} from '../constants';

export const initialState = {
  isLoadingProfile: false,
  errorProfile: false,
  finishProfileSuccess: false,
  successCreateAddress: false,
  successCreateKYC: false,
  successEditAddress: false,
  successCreateBankInfo: false,
  successEditBankInfo: false,
  successEditBankInfo: false,
  successEditKYC: false,
  successTypeIdentification: false,
  successUpdateAvatar: false,
  imageProfile: null,
  successUpdateInfo: false,
  dataUpdateProfile: null,
  dropDownIdentification: null,
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
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case UPDATE_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successUpdateInfo: true,
        errorProfile: false,
        dataUpdateProfile: action.payload,
        error: {}
      };
    case UPDATE_PROFILE_AVATAR:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case UPDATE_PROFILE_AVATAR_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successUpdateAvatar: true,
        errorProfile: false,
        imageProfile: action.payload,
        error: {}
      };
    case CREATE_ADDRESS:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successCreateAddress: true,
        errorProfile: false,
        dataCreateAddress: action.payload,
        error: {}
      };
    case EDIT_ADDRESS:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successEditAddress: true,
        errorProfile: false,
        dataCreateAddress: action.payload,
        error: {}
      };
    case CREATE_KYC:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case CREATE_KYC_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successCreateKYC: true,
        errorProfile: false,
        dataCreateKYC: action.payload,
        error: {}
      };
    case EDIT_KYC:
      return { ...state, isLoadingProfile: true, errorProfile: false, successEditKYC: false };
    case EDIT_KYC_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successEditKYC: true,
        errorProfile: false,
        dataCreateKYC: action.payload,
        error: {}
      };
    case CREATE_BANK_INFO:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case CREATE_BANK_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successCreateBankInfo: true,
        errorProfile: false,
        dataCreateBankInfo: action.payload,
        error: {}
      };
    case EDIT_BANK_INFO:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case EDIT_BANK_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successEditBankInfo: true,
        errorProfile: false,
        dataCreateBankInfo: action.payload,
        error: {}
      };
    case TYPE_IDENTIFICATION:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case TYPE_IDENTIFICATION_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successTypeIdentification: true,
        errorProfile: false,
        dropDownIdentification: action.payload,
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

