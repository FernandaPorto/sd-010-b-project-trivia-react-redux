import { combineReducers } from 'redux';
import tokenState from './tokenReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';
import countdownReducer from './countdownReducer';

const rootReducer = combineReducers({
  tokenState,
  playerReducer,
  gameReducer,
  countdownReducer,
});

export default rootReducer;
