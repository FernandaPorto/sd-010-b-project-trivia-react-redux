import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  loginReducer,
  gameReducer,
});

export default rootReducer;
