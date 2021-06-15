import { combineReducers } from 'redux';
import trivia from './trivia';
import player from './player';

const rootReducer = combineReducers({ trivia, player });
export default rootReducer;
