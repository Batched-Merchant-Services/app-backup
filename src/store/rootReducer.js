import { combineReducers } from 'redux';
import user from '@store//reducers/user.reducer';
import app from '@store/reducers/app.reducer';
import auth from '@store/reducers/auth.reducer';

const rootReducer = combineReducers({ app, user,auth });

export default rootReducer;

