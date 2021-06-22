import { combineReducers } from 'redux';
import player from './player';
import controls from './controls';

const rootReducer = combineReducers({
  controls,
  player,
});

export default rootReducer;
