import { combineReducers } from 'redux';

import player from './playerReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({ player, apiReducer });

export default rootReducer;
