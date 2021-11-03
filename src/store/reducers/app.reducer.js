import {
    TOGGLE_SNACKBAR_OPEN,
    TOGGLE_SNACKBAR_CLOSE
} from '../constants';

const initialState = {
    toggleSnackbar: false,
    snackbarMessage: null,
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
        default:
            return state
    }
}