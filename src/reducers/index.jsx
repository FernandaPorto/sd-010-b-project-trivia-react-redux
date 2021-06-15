import { combineReducers } from 'redux';
import userReducer from './userReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  player: userReducer,
  api: apiReducer,
});

export default rootReducer;
