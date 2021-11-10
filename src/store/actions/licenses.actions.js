import {
  VALIDATE_CODE_LICENSES,
  VALIDATE_CODE_LICENSES_SUCCESS,
  LICENSES_ERROR,
  CLEAN_ERROR_LICENSES
} from '../constants';


import { GET_REFERRED_ID } from '@utils/api/queries/licenses.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
import { getLanguage } from '@utils/api/getLanguage';



export const validateReference = ({ referenceCode }) => async (dispatch) => {
  try {
    dispatch({ type: VALIDATE_CODE_LICENSES });
   
    client.query({
      query: GET_REFERRED_ID,
      variables: {
        id: referenceCode?.validate
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: VALIDATE_CODE_LICENSES_SUCCESS, payload: response?.data });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
  }

};






export const cleanErrorLicenses = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_REGISTER })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
  }

};