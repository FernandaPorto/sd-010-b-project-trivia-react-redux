import { combineReducers } from 'redux';
import tokenState from './tokenReducer';

const rootReducer = combineReducers({ tokenState });

export default rootReducer;
