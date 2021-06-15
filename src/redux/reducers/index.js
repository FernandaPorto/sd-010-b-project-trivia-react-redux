import { combineReducers } from 'redux';

import playerReducer from './playerReducer';

const rootReducers = combineReducers({
  player: playerReducer,
});

export default rootReducers;
