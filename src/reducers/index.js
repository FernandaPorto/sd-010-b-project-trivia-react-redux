import { combineReducers } from 'redux';
import userLogin from './userLogin';
import token from './token';
import getQuestions from './getQuestions';

const rootReducers = combineReducers({
  userLogin,
  token,
  getQuestions,
});

export default rootReducers;
