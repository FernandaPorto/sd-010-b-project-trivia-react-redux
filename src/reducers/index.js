import { combineReducers } from 'redux';
import login from './login';
import token from './token';
import ranking from './ranking';

const rootReducer = combineReducers({
  login,
  token,
  ranking,
});

export default rootReducer;
