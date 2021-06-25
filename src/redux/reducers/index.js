import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import playerReducer from './playerReducer';
import settingsReducer from './settingsReducer';

const rootReducers = combineReducers({
  game: gameReducer,
  player: playerReducer,
  settings: settingsReducer,
});

export default rootReducers;
