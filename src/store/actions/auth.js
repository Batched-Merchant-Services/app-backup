import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';


export const getLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN });
    client.query({
      query: LOGIN_QUERY,
      variables: {
        user: email?.value,
        password: "Qn8ZJuL94VCDgxeRA6M/R38LfjY3GI0RE0Es90hYBCS70D+gOSKXIcFhyYAwJO5XVwQoYHDMTwA5dQUPtCrWPcGbSXoDZMk67xpunqegA+z1CaYTTDpJJLZ8UzG6C3EJ0hFVFzJbHOO797C1iKxigBL/Z4nsLpwP1LfpPibQ96M=",
        languaje: "2",
        id: "BeJCuX6/FE8LB87IxL0vK3ZdFw3yse0zTCC2KiqxvR0q/hCsbZSJjOZefFx1Sfl+p3h25hLH5uB4zodjJWvWQuOTYbMidYVijILSTx2bQImUhzpNJr70Z0hiTx+jp28puOvgtahkg2Z32y8uqv5gLG9yAIARqet8WQxUxxYp0bM=",
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



    // const { loading, data,error } = useLazyQuery(LOGIN_QUERY,
    //   {
    //   variables: { user:email?.value ,
    //                password:password?.value ,
    //                languaje:"2",
    //                id: "BeJCuX6/FE8LB87IxL0vK3ZdFw3yse0zTCC2KiqxvR0q/hCsbZSJjOZefFx1Sfl+p3h25hLH5uB4zodjJWvWQuOTYbMidYVijILSTx2bQImUhzpNJr70Z0hiTx+jp28puOvgtahkg2Z32y8uqv5gLG9yAIARqet8WQxUxxYp0bM=",
    //                groupid:"0"
    //               }
    //   })
    //   console.log('loading, data,error',loading, data,error);
    //   if (loading) {
    //       console.log('loading')
    //   }
    //   if (loading && !data) {
    //     return <Loading/>;
    //    }
    //    if (data) {
    //      LocalStorage.set('auth_token', response.data.token);
    //    }
    //    if (error) {
    //     showToast({ message: I18n.t('ERRORS.NO_ACCOUNTS_MESSAGE') });
    //     dispatch({ type: LOGIN_ERROR, payload: '' });
    //    }

    // const response = await APIHelper.post('auth/sign_in', { email, password });
    // const { data } = response.data;
    // const { name: username, id, account_id } = data;
    // // Check user has any account
    // if (account_id) {
    //   Sentry.setUser({ email, username, id });
    //   identifyUser({ userId: id, email, name: username });
    //   dispatch({ type: LOGIN_SUCCESS, payload: data });
    // } else {
    //   showToast({ message: I18n.t('ERRORS.NO_ACCOUNTS_MESSAGE') });
    //   dispatch({ type: LOGIN_ERROR, payload: '' });
    // }
  } catch (error) {
    
    if (error && error.status === 401) {
      showToast({ message: I18n.t('ERRORS.AUTH') });
    }
    dispatch({ type: LOGIN_ERROR, payload: error });
  }

  // export function dataUser(payload) {
  //   return { type: LOGIN_SUCCESS , payload };
  // }

  // export function saveDataUser(payload) {
  //   return dispatch => {
  //     dispatch(
  //       dataUser(payload)
  //     );
  //   };
  // }
};