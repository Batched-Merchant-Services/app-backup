import {
  SET_CONTACT,
  SET_CONTACT_SUCCESS,
  ERROR_CONTACT,
  CLEAN_CONTACT_ERROR
} from '../constants';

export const initialState = {
  isLoadingContact: false,
  showContactError: false,
  successContact: false,
  contactSuccess:null,
  error: {},
  success: {},
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT:
      return { ...state, isLoadingContact: true, showContactError: false };
    case SET_CONTACT_SUCCESS:
      return {
        ...state,
        isLoadingContact: false,
        showContactError: false,
        successContact: true,
        contactSuccess: action.payload,
        error: {}
      };
    case ERROR_CONTACT:
      return {
        ...state,
        isLoadingContact: false,
        showContactError: false,
        successContact: false,
        error: action.payload,
        error: {},
      };

    case CLEAN_CONTACT_ERROR:
      return {
        ...state,
        isLoadingContact: false,
        showContactError: false,
        successContact: false,
        contactSuccess:null,
        error: {},
      };


    default:
      return state;
  }
};
