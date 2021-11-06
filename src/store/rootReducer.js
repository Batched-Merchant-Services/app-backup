import { combineReducers } from 'redux';
import user from '@store/reducers/user.reducer';
import app from '@store/reducers/app.reducer';
import auth from '@store/reducers/auth.reducer';
import register from '@store/reducers/register.reducer';
import forgotPassword from '@store/reducers/forgotPassword.reducer';

const rootReducer = combineReducers({ app, user,auth,register,forgotPassword });

export default rootReducer;

