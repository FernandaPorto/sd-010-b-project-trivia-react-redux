import { combineReducers } from 'redux';

import player from './playerReducer';
import apiReducer from './apiReducer';
import game from './gameReduce';

const rootReducer = combineReducers({ player, apiReducer, game });

export default rootReducer;
