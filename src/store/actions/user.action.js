import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  USER_ERROR,
  CLEAN_DATA_USER,
	SET_FILE_URL,
  SET_FILE_FRONT,
  SET_FILE_BACK,
  SET_FILE_ADDRESS,
  SET_FILE_SELFIE,
	SET_FILE_URL_SUCCESS,
  SET_FILE_FRONT_SUCCESS,
  SET_FILE_BACK_SUCCESS,
  SET_FILE_ADDRESS_SUCCESS,
  SET_FILE_SELFIE_SUCCESS,
  SET_FILE_URL_ERROR,
  CLEAN_DATA_FILE
} from '../constants';

import { GET_USER_BATCHED,SET_FILE } from '@utils/api/queries/user.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import { toggleSnackbarOpen } from './app.actions';
import { getUTCDateString } from '@utils/formatters';
import { generateRSA } from '@utils/api/encrypt';

const utc = getUTCDateString();

export const getDataUser = () => async (dispatch) => {
    const token = await LocalStorage.get('auth_token');
    const uuid = await LocalStorage.get('uuid');
  try {
    dispatch({ type: GET_USER_DATA });

    client.query({
      query: GET_USER_BATCHED,
      variables: {
        token: token,
        field:'id',
        id:uuid
      }
    }).then(async (response) => {
      console.log('get dataaaa',response)
      if (response.data) {
        dispatch({ type: GET_USER_DATA_SUCCESS, payload: response?.data?.getUsersByField[0] });
      }
    }).catch((error) => {
      dispatch({ type: USER_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};



export const setFile = ({nameFile,resultBase}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_FILE_URL });

    client.mutate({
      mutation: SET_FILE,
      variables: {
        token: token,
        fileName: nameFile,
        file64: resultBase
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_FILE_URL_SUCCESS, payload: response?.data['setFile'] });
      }
    }).catch((error) => {
      dispatch({ type: SET_FILE_URL_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: SET_FILE_URL_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};




export const setFileFront = ({nameFile,resultBase}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_FILE_FRONT });

    client.mutate({
      mutation: SET_FILE,
      variables: {
        token: token,
        fileName: nameFile,
        file64: resultBase
      }
    }).then(async (response) => {
      console.log('response true ',response)
      if (response.data) {
        dispatch({ type: SET_FILE_FRONT_SUCCESS, payload: response?.data['setFile'] });
      }
    }).catch((error) => {
      console.log('error 1 ',response)
      dispatch({ type: SET_FILE_URL_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error 2 ',response)
    dispatch({ type: SET_FILE_URL_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};



export const setFileBack = ({nameFile,resultBase}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_FILE_BACK });

    client.mutate({
      mutation: SET_FILE,
      variables: {
        token: token,
        fileName: nameFile,
        file64: resultBase
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_FILE_BACK_SUCCESS, payload: response?.data['setFile'] });
      }
    }).catch((error) => {
      dispatch({ type: SET_FILE_URL_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: SET_FILE_URL_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};



export const setFileAddress = ({nameFile,resultBase}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_FILE_ADDRESS });

    client.mutate({
      mutation: SET_FILE,
      variables: {
        token: token,
        fileName: nameFile,
        file64: resultBase
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_FILE_ADDRESS_SUCCESS, payload: response?.data['setFile'] });
      }
    }).catch((error) => {
      dispatch({ type: SET_FILE_URL_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: SET_FILE_URL_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const setFileSelfie = ({nameFile,resultBase}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_FILE_SELFIE });

    client.mutate({
      mutation: SET_FILE,
      variables: {
        token: token,
        fileName: nameFile,
        file64: resultBase
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_FILE_SELFIE_SUCCESS, payload: response?.data['setFile'] });
      }
    }).catch((error) => {
      dispatch({ type: SET_FILE_URL_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: SET_FILE_URL_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};



export const cleanDataUser = () => async (dispatch) => {
  return dispatch({ type: CLEAN_DATA_USER })
};
export const cleanDataFile = () => async (dispatch) => {
  return dispatch({ type: CLEAN_DATA_FILE})
};
