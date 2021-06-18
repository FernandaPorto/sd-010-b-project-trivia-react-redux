import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';
import fetch from './fetch';

const rootReducer = combineReducers({ player, questions, fetch });

export default rootReducer;
