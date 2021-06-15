import { combineReducers } from 'redux';
import user from './user';
import questionReducer from './questions';

const rootReducers = combineReducers({ user, questionReducer });
// user é o loginreducer
export default rootReducers;
