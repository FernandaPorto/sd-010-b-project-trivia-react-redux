import { combineReducers } from 'redux';
import tokenState from './tokenReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({ tokenState, playerReducer, gameReducer });

export default rootReducer;
