import { 
  SET_CONTACT,
  SET_CONTACT_SUCCESS,
  ERROR_CONTACT,
  CLEAN_CONTACT_ERROR
} from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { toggleSnackbarOpen, userInactivity } from './app.actions';
import { VALIDATE_SESSION_QUERY } from '../../utils/api/queries/user.queries';
import { getUTCDateString } from '../../utils/formatters';
import { getDataUser } from './user.action';
import { AUTHENTICATION_TWO_FACTORS, AUTHENTICATION_TWO_FACTORS_EMAIL } from '../../utils/api/queries/auth.queries';
import { CONTACT_QUERIES } from '../../utils/api/queries/contact.queries';
const device = DeviceInfo.getUniqueId();



export const setContact = ({ dataContact }) => async (dispatch) => {
  try {
    dispatch({ type: SET_CONTACT });
    client.query({
      query: CONTACT_QUERIES,
      variables: {
        token: email?.value,
        process: dataContact
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: SET_CONTACT_SUCCESS, payload: response?.data['setMessageProcess'] });
      }
    }).catch((error) => {
      dispatch({ type: ERROR_CONTACT, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: ERROR_CONTACT, payload: error });
  }

};


export const cleanContactError = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_CONTACT_ERROR })
  } catch (error) {
    dispatch({ type: ERROR_CONTACT, payload: error });
  }

};