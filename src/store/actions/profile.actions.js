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
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';


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
    }).then(async (response) => {
      console.log('response update prof',response)
      if (response.data) {
        dispatch({ type: UPDATE_PROFILE_INFO_SUCCESS, payload: response?.data['editAccountData'] });
      }
    }).catch((error) => {
      console.log('error update 1',error)
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error update 2',error)
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const createAddress = ({dataCreateAddress}) => async (dispatch) => {
  console.log('dataCreateAddress',dataCreateAddress)
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_ADDRESS });
   
    client.mutate({
      mutation: CREATE_ADDRESS_QUERY,
      variables: {
        token:token,
        data: dataCreateAddress
      },
    }).then(async (response) => {
      console.log('response update address',response)
      if (response.data) {
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: response?.data['createAccountsAddress'] });
      }
    }).catch((error) => {
      console.log('error address 1',error)
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error address 2',error)
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const editAddress = ({dataEditAddress}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_ADDRESS });
   
    client.mutate({
      mutation: EDIT_ADDRESS_QUERY,
      variables: {
        token:token,
        data: dataEditAddress
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: EDIT_ADDRESS_SUCCESS, payload: response?.data['editAccountsAddress'] });
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

export const editKYC = ({dataKYC}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_KYC });
   
    client.mutate({
      mutation: EDIT_KYC_QUERY,
      variables: {
        token:token,
        data: dataKYC
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: EDIT_KYC_SUCCESS, payload: response?.data['editAccountsKyc'] });
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



export const createKYC = ({dataKYC}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_KYC });
   
    client.mutate({
      mutation: CREATE_KYC_QUERY,
      variables: {
        token:token,
        data: dataKYC
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_KYC_SUCCESS, payload: response?.data['editAccountsKyc'] });
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



export const createBankInfo = ({dataKYC}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_BANK_INFO });
   
    client.mutate({
      mutation: CREATE_BANK_INFO_QUERY,
      variables: {
        token:token,
        data: dataKYC
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_BANK_INFO_SUCCESS, payload: response?.data['createAccountsBankInformation'] });
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


export const editBankInfo = ({dataKYC}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_BANK_INFO });
   
    client.mutate({
      mutation: EDIT_BANK_INFO_QUERY,
      variables: {
        token:token,
        data: dataKYC
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: EDIT_BANK_INFO_SUCCESS, payload: response?.data['editAccountsBankInformation'] });
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





export const cleanErrorProfile = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_PROFILE })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
  }
};