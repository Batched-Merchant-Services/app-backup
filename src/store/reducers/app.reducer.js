import {
    TOGGLE_SNACKBAR_OPEN,
    TOGGLE_SNACKBAR_CLOSE,
    GET_APP_RESOURCES,
    SET_ERROR_APP
} from '../constants';

const initialState = {
    loading: false,
    toggleSnackbar: false,
    snackbarMessage: null,
    getAppResources: null,
    showError: false,
    error: {},
    success: {},
}


export default appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SNACKBAR_OPEN:
            return {
                ...state,
                toggleSnackbar: true,
                snackbarMessage: action.message,
            };

        case TOGGLE_SNACKBAR_CLOSE:
            return {
                ...state,
                toggleSnackbar: false,
                snackbarMessage: null,
            };
        case GET_APP_RESOURCES:
            return {
                ...state,
                loading: false,
                getAppResources: action.payload,
                showError: false,
            };
        case SET_ERROR_APP:
            return {
                ...state,
                loading: false,
                getAppResources: null,
                error: action.payload,
                showError: true,
                success: {},
            };
        default:
            return state
    }
}