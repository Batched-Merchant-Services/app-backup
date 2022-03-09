import {
    TOGGLE_SNACKBAR_OPEN,
    TOGGLE_SNACKBAR_CLOSE,
    TOGGLE_STATUS_CHANGE,
    TOGGLE_STATUS_CHANGE_STATUS,
    SAVE_HISTORY_PAGINATION,
    CLEAN_HISTORY_PAGINATION,
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
    dataHistorySave: [],
    page: 0,
    statusUserActive: false,
    snackbarMessage: null,
    typeSnack: 'error',
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

        case SAVE_HISTORY_PAGINATION:
            return {
                ...state,
                dataHistorySave: action.payload,
                pagePagination: action.page,
            };
        case CLEAN_HISTORY_PAGINATION:
            return {
                ...state,
                dataHistorySave: [],
                pagePagination: 0,
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