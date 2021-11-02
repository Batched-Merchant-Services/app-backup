import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, FETCHING_DATA_PEOPLE_SUCCESS,LOGIN,LOGIN_ERROR,LOGIN_SUCCESS} from '../constants'
import { LOGIN_QUERY } from '@utils/api/queries/auth';
import {fetchSchedule, fetchPeople} from '../api'
import { useQuery } from '@apollo/client';

export const doLogin = ({ email, password }) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN });
      client.query({
        query: LOGIN_QUERY,
        variables: { user:email?.value ,
            password:password?.value ,
            languaje:"2",
            id: "BeJCuX6/FE8LB87IxL0vK3ZdFw3yse0zTCC2KiqxvR0q/hCsbZSJjOZefFx1Sfl+p3h25hLH5uB4zodjJWvWQuOTYbMidYVijILSTx2bQImUhzpNJr70Z0hiTx+jp28puOvgtahkg2Z32y8uqv5gLG9yAIARqet8WQxUxxYp0bM=",
            groupid:"0"
        }
    }).then((resp) => {
        if (resp.data) {
            dispatch({ type: 'FETCH_ADS_FULFILLED', payload: resp.data.allAds });
        }
    });


    //   const { loading, data,error } = useQuery(LOGIN_QUERY,
    //     {
    //     variables: { user:email?.value ,
    //                  password:password?.value ,
    //                  languaje:"2",
    //                  id: "BeJCuX6/FE8LB87IxL0vK3ZdFw3yse0zTCC2KiqxvR0q/hCsbZSJjOZefFx1Sfl+p3h25hLH5uB4zodjJWvWQuOTYbMidYVijILSTx2bQImUhzpNJr70Z0hiTx+jp28puOvgtahkg2Z32y8uqv5gLG9yAIARqet8WQxUxxYp0bM=",
    //                  groupid:"0"
    //                 }
    //     })

    //     if (loading) {
            
    //     }
      const response = await APIHelper.post('auth/sign_in', { email, password });
      const { data } = response.data;
      const { name: username, id, account_id } = data;
      // Check user has any account
      if (account_id) {
        Sentry.setUser({ email, username, id });
        identifyUser({ userId: id, email, name: username });
        dispatch({ type: LOGIN_SUCCESS, payload: data });
      } else {
        showToast({ message: I18n.t('ERRORS.NO_ACCOUNTS_MESSAGE') });
        dispatch({ type: LOGIN_ERROR, payload: '' });
      }
    } catch (error) {
      if (error && error.status === 401) {
        showToast({ message: I18n.t('ERRORS.AUTH') });
      }
      dispatch({ type: LOGIN_ERROR, payload: error });
    }
  };


export const selected_tab = (tabId2) => {
    return {type: 'selected_tab', payload: tabId2}
}


export const getData = () => {
    return {type: FETCHING_DATA}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS, data}
}

export const getDataPeopleSuccess = (dataPeople) => {
    return {type: FETCHING_DATA_PEOPLE_SUCCESS, dataPeople}
}

export const getDateFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE}
}

export const fetchData = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchSchedule()
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => console.log(error))
    }
}

export const fetchDataActors = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchPeople()
        .then(([response, json]) => {
            dispatch(getDataPeopleSuccess(json))
        })
        .catch((error) => console.log(error))
    }
}