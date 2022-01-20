import {
    TOGGLE_SNACKBAR_OPEN,
    TOGGLE_SNACKBAR_CLOSE,
    TOGGLE_STATUS_CHANGE,
    TOGGLE_STATUS_CHANGE_STATUS,
    GET_APP_RESOURCES,
    SET_ERROR_APP,
    USER_ACTIVE
} from '../constants';

const initialState = {
    loading: false,
    toggleSnackbar: false,
    changeStatus: 0,
    changeSeconds: 0,
    showStatusTimers: 'blueDark',
    statusUserActive:false,
    snackbarMessage: null,
    typeSnack:'error',
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
                typeSnack: action.typeSnack
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
        case TOGGLE_STATUS_CHANGE:
            return {
                ...state,
                changeStatus: action.payload,
                showStatusTimers: action.showStatusTimers ?? ''
            };
        case USER_ACTIVE:
            return {
                ...state,
                statusUserActive: action.payload
            };
        case TOGGLE_STATUS_CHANGE_STATUS:
            return {
                ...state,
                changeSeconds: action.payload,
            };
        default:
            return state
    }
}