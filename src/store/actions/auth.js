import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS,CLEAN_ERROR } from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import DeviceInfo from 'react-native-device-info';
const device = DeviceInfo.getUniqueId();
console.log('device',device)

export const getLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN });
    client.query({
      query: LOGIN_QUERY,
      variables: {
        user: email?.value,
        password: "Qn8ZJuL94VCDgxeRA6M/R38LfjY3GI0RE0Es90hYBCS70D+gOSKXIcFhyYAwJO5XVwQoYHDMTwA5dQUPtCrWPcGbSXoDZMk67xpunqegA+z1CaYTTDpJJLZ8UzG6C3EJ0hFVFzJbHOO797C1iKxigBL/Z4nsLpwP1LfpPibQ96M=",
        languaje: "2",
        id: device,
        groupid: "320"
      }
    }).then(async(response) => {
      const { token } = response?.data?.getLoggin;
      if (response.data) {
        dispatch({ type: LOGIN_SUCCESS, payload: response?.data?.getLoggin });
        await LocalStorage.set('auth_token', token);
        
      }
    }).catch((error) => {
      const err = JSON.stringify({ message: error })
      console.log('error',err);
      dispatch({ type: LOGIN_ERROR, payload: error });
    })
  } catch (error) {
    
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

};


export const cleanError = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR})
  } catch (error) {
    
  
    dispatch({ type: LOGIN_ERROR, payload: error });
  }
 
};