import { combineReducers } from 'redux';
import user from './user';
import perguntas from './perguntas';
import score from './score';
import assertions from './assertions';

const rootReducer = combineReducers({
  user,
  perguntas,
  score,
  assertions,
});

export default rootReducer;
