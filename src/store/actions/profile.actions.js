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
  PROFILE_ERROR,
  UPDATE_PROFILE_INFO, 
  UPDATE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_AVATAR,
  UPDATE_PROFILE_AVATAR_SUCCESS 
} from '../constants';
import { 
  CREATE_ADDRESS_QUERY, 
  CREATE_BANK_INFO_QUERY, 
  CREATE_KYC_QUERY, 
  EDIT_ACCOUNT, 
  EDIT_ADDRESS_QUERY, 
  EDIT_BANK_INFO_QUERY, 
  EDIT_KYC_QUERY 
} from '@utils/api/queries/profile.queries';
import { toggleSnackbarOpen } from './app.actions';
import { getLanguage } from '@utils/api/getLanguage';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import i18n from '@utils/i18n';
import { GET_TYPE_IDENTIFICATION } from '../../utils/api/queries/dropdown.queries';
import { GET_USER_BATCHED, SET_FILE } from '../../utils/api/queries/user.queries';
import { CHANGE_PROFILE_PICTURE } from '../../utils/api/queries/profile.queries';
import { getDataUser } from './user.action';


export const updateUserProfileInfo = ({dataProfile}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: UPDATE_PROFILE_INFO });
    client.mutate({
      mutation: EDIT_ACCOUNT,
      variables: {
        token:token,
        data: dataProfile
      },
    fetchPolicy : 'network-only' ,  
    nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: UPDATE_PROFILE_INFO_SUCCESS, payload: response?.data['editAccountData'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const updateUserAvatar = ({ id,image }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: UPDATE_PROFILE_AVATAR });
    client.mutate({
      mutation: CHANGE_PROFILE_PICTURE,
      variables: {
        token:token,
        id: id,
        image: image
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
  
      if (response.data) {
        dispatch({ type: UPDATE_PROFILE_AVATAR_SUCCESS, payload: response?.data['setPictureChange'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
  
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {

    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const createAddress = ({dataCreateAddress}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_ADDRESS });
   
    client.mutate({
      mutation: CREATE_ADDRESS_QUERY,
      variables: {
        token:token,
        data: dataCreateAddress
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: response?.data['createAccountsAddress'] });
         dispatch(getDataUser());
         dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const editAddress = ({ dataUpdateAddress}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_ADDRESS });
   
    client.mutate({
      mutation: EDIT_ADDRESS_QUERY,
      variables: {
        token:token,
        data: dataUpdateAddress
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: EDIT_ADDRESS_SUCCESS, payload: response?.data['editAccountsAddress'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const editKYC = ({ dataUpdateKYC }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_KYC });
   
    client.mutate({
      mutation: EDIT_KYC_QUERY,
      variables: {
        token:token,
        data: dataUpdateKYC
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: EDIT_KYC_SUCCESS, payload: response?.data['editAccountsKyc'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const createKYC = ({dataCreateKYC}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_KYC });
   
    client.mutate({
      mutation: CREATE_KYC_QUERY,
      variables: {
        token:token,
        data: dataCreateKYC
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_KYC_SUCCESS, payload: response?.data['editAccountsKyc'] });
         dispatch(getDataUser());
         dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};



export const createBankInfo = ({dataCreateBank}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_BANK_INFO });
   
    client.mutate({
      mutation: CREATE_BANK_INFO_QUERY,
      variables: {
        token:token,
        data: dataCreateBank
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_BANK_INFO_SUCCESS, payload: response?.data['createAccountsBankInformation'] });
         dispatch(getDataUser());
         dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const editBankInfo = ({dataUpdateBank}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_BANK_INFO });
   
    client.mutate({
      mutation: EDIT_BANK_INFO_QUERY,
      variables: {
        token:token,
        data: dataUpdateBank
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: EDIT_BANK_INFO_SUCCESS, payload: response?.data['editAccountsBankInformation']});
         dispatch(getDataUser());
         dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));

    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const getTypeIdentification = ({countryCode}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: TYPE_IDENTIFICATION });
   
    client.query({
      query: GET_TYPE_IDENTIFICATION,
      variables: {
        token:token,
        id: `Identificacion-${countryCode}`,
        languaje:getLanguage()
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        nameTypeIdentification(response.data);
        dispatch({ type: TYPE_IDENTIFICATION_SUCCESS, payload: nameTypeIdentification(response.data)});
         dispatch(getDataUser());
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const nameTypeIdentification = (data) => {
  const typeIdentificationArray = [];
  data['getUserCombo'].forEach(typeIdentification => {

    typeIdentificationArray.push(
      {
        value: typeIdentification.value,
        name: `${i18n.t(typeIdentification.description)}`
      }
    )
  });
  return typeIdentificationArray;
};



export const cleanErrorProfile = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_PROFILE })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
  }
};