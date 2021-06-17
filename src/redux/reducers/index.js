import { combineReducers } from 'redux';

import playerReducer from './playerReducer';
import gameReducer from './gameReducer';

const rootReducers = combineReducers({
  player: playerReducer,
  game: gameReducer,
});

export default rootReducers;
