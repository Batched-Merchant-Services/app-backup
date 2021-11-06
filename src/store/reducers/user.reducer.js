import {
    SAVE_DATA_USER,
    CLEAN_DATA_USER,
} from '../constants';

export const initialState = {
    dataUser: [],
};

export default userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SAVE_DATA_USER:
            return {
                ...state,
                dataUser: action.payload,
            };
        case CLEAN_DATA_USER:
            return {
                ...state,
                dataUser: null,
            };
        default:
            return state;
    }
};
