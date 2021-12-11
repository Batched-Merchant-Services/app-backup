import {
  VALIDATE_CODE_LICENSES,
  VALIDATE_CODE_LICENSES_SUCCESS,
  LICENSES_ERROR,
  CLEAN_ERROR_LICENSES,
  GET_LICENSES,
  GET_LICENSES_SUCCESS,
  GET_LIST_LICENSES,
  GET_LIST_LICENSES_SUCCESS,
  GET_TOTAL_LICENSES,
  GET_TOTAL_LICENSES_SUCCESS,
  GET_CRYPTO_CURRENCY,
  GET_CRYPTO_CURRENCY_SUCCESS,
  CURRENT_LICENSE,
  CURRENT_LICENSE_SUCCESS,
  CREATE_LICENSE,
  CREATE_LICENSE_SUCCESS,
  GET_ADDRESS_CURRENCIES,
  GET_ADDRESS_CURRENCIES_SUCCESS,
	GET_TOTAL_LICENSES_IN_NETWORK,
  GET_TOTAL_LICENSES_IN_NETWORK_SUCCESS
} from '../constants';
import { GET_REFERRED_ID, GET_CURRENT_TYPE_LICENSES, GET_LICENSES_QUERY,
  GET_TOTAL_LICENSES_QUERY, GET_CRYPTO_CURRENCY_QUERY, GET_CREATE_LICENSES_CRYPTO,
  GET_ADDRESS_CURRENCY,GET_TOTAL_LICENSES_IN_NETWORK_QUERY
} from '@utils/api/queries/licenses.queries';
import { client } from '@utils/api/apollo';
import LocalStorage from '@utils/localStorage';
import { toggleSnackbarOpen } from './app.actions';
import { getUTCDateString } from '../../utils/formatters';
import { generateRSA } from '../../utils/api/encrypt';


const utc = getUTCDateString();
export const validateReference = ({ referenceCode }) => async (dispatch) => {
  try {
    dispatch({ type: VALIDATE_CODE_LICENSES });

    client.query({
      query: GET_REFERRED_ID,
      variables: {
        id: referenceCode?.value
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: VALIDATE_CODE_LICENSES_SUCCESS, payload: response?.data['getUserReferer'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};

export const getLicenses = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_LICENSES });

    client.query({
      query: GET_CURRENT_TYPE_LICENSES,
      variables: {
        token: token
      },
    }).then(async (response) => {

      if (response.data) {
        dispatch({ type: GET_LICENSES_SUCCESS, payload: response?.data['getCurrentTypeLicenses'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};

export const getListLicenses = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_LIST_LICENSES });

    client.query({
      query: GET_LICENSES_QUERY,
      variables: {
        token: token,
        filter: ''
      },
    }).then(async (response) => {
      if (response.data) {
        nameLicenses(response.data);
        dispatch({ type: GET_LIST_LICENSES_SUCCESS, payload: nameLicenses(response.data) });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

};

export const nameLicenses = (data) => {
  const typeLicensesArray = [];
  data['getTypeLicenses'].forEach(typeLicenses => {
    typeLicensesArray.push(
      {
        value: typeLicenses.id,
        name: `${typeLicenses.description}`
      }
    )
  });
  return typeLicensesArray;
};



export const getTotalLicenses = () => async (dispatch) => {

  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_TOTAL_LICENSES });

    client.query({
      query: GET_TOTAL_LICENSES_QUERY,
      variables: {
        token: token,
        filter: ''
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GET_TOTAL_LICENSES_SUCCESS, payload: response?.data['getTotalTypeLicenses'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

}

export const getCryptoCurrency = () => async (dispatch) => {

  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_CRYPTO_CURRENCY });

    client.query({
      query: GET_CRYPTO_CURRENCY_QUERY,
      variables: {
        token: token,
        filter: ''
      },
    }).then(async (response) => {
      if (response.data) {
        nameCryptoCurrencies(response.data)
        dispatch({ type: GET_CRYPTO_CURRENCY_SUCCESS, payload: nameCryptoCurrencies(response.data) });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }

}

export const nameCryptoCurrencies = (data) => {
  const cryptoCurryArray = [{value: 'UUL',name: 'Uulala Tokens'}];
  data['getCryptoCurrency'].forEach(cryptoCurrencies => {
    cryptoCurryArray.push(
      {
        value: cryptoCurrencies.currency,
        id   : cryptoCurrencies.id,
        name : `${cryptoCurrencies.name}`
      }
    )
  });
  return cryptoCurryArray;
};


export const saveCurrentLicense = ({ selectLicense }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_LICENSE, payload: selectLicense });
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
  }
}

export const createLicense = ({createLicenses}) => async (dispatch) => {
  
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_LICENSE });
    client.mutate({
      mutation: GET_CREATE_LICENSES_CRYPTO,
      variables: {
        token: token,
        ...createLicenses
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_LICENSE_SUCCESS, payload: response.data['createLicensesCryptoTransactionDeposit'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
}

export const getAddressCurrency = (currencyId) => async (dispatch) => {

  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_ADDRESS_CURRENCIES });

    client.query({
      query: GET_ADDRESS_CURRENCY,
      variables: {
        token: token,
        currencyId:currencyId
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GET_ADDRESS_CURRENCIES_SUCCESS, payload: response?.data?.getCryptoCurrencyAddress[0] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      //dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    //dispatch(toggleSnackbarOpen(error));
  }
}


export const getTotalLicensesInNetwork = () => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: GET_TOTAL_LICENSES_IN_NETWORK });

    client.query({
      query: GET_TOTAL_LICENSES_IN_NETWORK_QUERY,
      variables: {
        token: token
      },
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: GET_TOTAL_LICENSES_IN_NETWORK_SUCCESS, payload: response?.data['getTotalLicensesInNetwork'] });
      }
    }).catch((error) => {
      dispatch({ type: LICENSES_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
    //dispatch(toggleSnackbarOpen(error));
  }

};


export const cleanErrorLicenses = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_LICENSES })
  } catch (error) {
    dispatch({ type: LICENSES_ERROR, payload: error });
  }

};