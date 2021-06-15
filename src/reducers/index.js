import { combineReducers } from 'redux';
import tokenState from './tokenReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({ tokenState, playerReducer });

export default rootReducer;
