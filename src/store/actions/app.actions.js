import { 
  GET_APP_RESOURCES,
  SET_ERROR_APP
} from '../constants'

import { APP_RESOURCES } from '@utils/api/queries/app.queries';
import { client } from '@utils/api/apollo';

export const toggleSnackbarOpen = (message) => ({
  type: "TOGGLE_SNACKBAR_OPEN",
  message,
});

export const toggleSnackbarClose = () => ({
  type: "TOGGLE_SNACKBAR_CLOSE",
});

export const showAppResources = () => async (dispatch) => {
  try {
    client.query({
      query: APP_RESOURCES,
      variables: {
        id:320
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GET_APP_RESOURCES, payload: response?.data['getBrandCompany'] });
      }
    }).catch((error) => {
      dispatch({ type: SET_ERROR_APP, payload: error });
    })
  } catch (error) {
    dispatch({ type: SET_ERROR_APP, payload: error });
  }

};
