import { combineReducers } from 'redux';
import userLogin from './userLogin';
import token from './token';

const rootReducers = combineReducers({
  userLogin,
  token,
});

export default rootReducers;
