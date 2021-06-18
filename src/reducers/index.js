import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import loginReducer from './loginReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  loginReducer,
  gameReducer,
  timerReducer,
});

export default rootReducer;
