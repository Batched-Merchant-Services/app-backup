import { combineReducers } from 'redux';
import user from '@store//reducers/user.reducer';
import app from '@store/reducers/app.reducer';

const rootReducer = combineReducers({ app, user });

export default rootReducer;

