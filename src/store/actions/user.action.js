import {
  SAVE_DATA_USER,
  CLEAN_DATA_USER
} from '../constants';

import { LOGIN_QUERY } from '@utils/api/queries/auth.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { generateRSA } from '@utils/api/encrypt';
const device = DeviceInfo.getUniqueId();


export const saveDataUser = (data) => async (dispatch) => {
  return dispatch({ type: SAVE_DATA_USER, payload: data  })
};

export const cleanDataUser = () => async (dispatch) => {
  return dispatch({ type: CLEAN_DATA_USER })
};
