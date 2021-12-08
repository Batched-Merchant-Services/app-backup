import { combineReducers } from 'redux';
import user from '@store/reducers/user.reducer';
import app from '@store/reducers/app.reducer';
import auth from '@store/reducers/auth.reducer';
import register from '@store/reducers/register.reducer';
import forgotPassword from '@store/reducers/forgotPassword.reducer';
import licenses from '@store/reducers/licenses.reducer';
import rewards from '@store/reducers/rewards.reducer';
import points from '@store/reducers/points.reducer';


const rootReducer = combineReducers({ app, user,auth,register,forgotPassword,licenses,rewards,points });

export default rootReducer;

