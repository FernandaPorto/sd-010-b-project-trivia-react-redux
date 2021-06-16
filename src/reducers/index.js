import { combineReducers } from 'redux';
import player from './player';

const listReducer = combineReducers({ player });

export default listReducer;
