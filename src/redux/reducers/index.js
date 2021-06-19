import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import playerReducer from './playerReducer';

const rootReducers = combineReducers({
  game: gameReducer,
  player: playerReducer,
});

export default rootReducers;
