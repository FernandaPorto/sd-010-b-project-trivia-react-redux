import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({ playerReducer, apiReducer });

export default rootReducer;
