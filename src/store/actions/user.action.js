import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  USER_ERROR,
  CLEAN_DATA_USER
} from '../constants';

import { GET_USER_BATCHED } from '@utils/api/queries/user.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import { toggleSnackbarOpen } from './app.actions';


export const getDataUser = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  const uuid = await LocalStorage.get('uuid');
  console.log('uuid',uuid);

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


export const cleanDataUser = () => async (dispatch) => {
  return dispatch({ type: CLEAN_DATA_USER })
};
