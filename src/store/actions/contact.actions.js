import {
  SET_CONTACT,
  SET_CONTACT_SUCCESS,
  ERROR_CONTACT,
  CLEAN_CONTACT_ERROR
} from '../constants'
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import { getLanguageName } from '@utils/api/getLanguage';
import { toggleSnackbarOpen } from './app.actions';
import { CONTACT_QUERIES } from '../../utils/api/queries/contact.queries';

export const setContact = ({ dataContact }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: SET_CONTACT });
    client.mutate({
      mutation: CONTACT_QUERIES,
      variables: {
        token: token,
        process: {
          "module": "12",
          "process": "120001",
          "key": "",
          "description": "Mensaje de soporte",
          "parameters": [
            {
              "name": "emailUser",
              "value": dataContact?.email ? dataContact?.email : ""
            },
            {
              "name": "template",
              "value": getLanguageName() === 'es' ? "user_template_contact_client_es" : "user_template_contact_client_en"
            },
            {
              "name": "subject",
              "value": dataContact?.subject || ""
            },
            {
              "name": "message",
              "value": dataContact?.message || ""
            },
            {
              "name": "param1",
              "value": dataContact?.message || ""
            },
            {
              "name": "param2",
              "value": dataContact?.email || ""
            },
            {
              "name": "param3",
              "value": dataContact?.clientId || ""
            },
            {
              "name": "param4",
              "value": dataContact?.clientName || ""
            },
            {
              "name": "param5",
              "value": dataContact?.clientPhone || ""
            },
            {
              "name": "param6",
              "value": dataContact?.clientCompany || ""
            }
          ]
        }
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