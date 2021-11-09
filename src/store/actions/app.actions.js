import { 
  GET_APP_RESOURCES,
  SET_ERROR_APP
} from '../constants'

import { APP_RESOURCES } from '@utils/api/queries/app.queries';



export const showAppResources = ({id}) => async (dispatch) => {
  try {
    client.query({
      query: APP_RESOURCES,
      variables: {
        id:id
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GET_APP_RESOURCES, payload: response?.data });
      }
    }).catch((error) => {
      dispatch({ type: SET_ERROR_APP, payload: error });
    })
  } catch (error) {

    dispatch({ type: SET_ERROR_APP, payload: error });
  }

};