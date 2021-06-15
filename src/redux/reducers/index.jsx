import { combineReducers } from 'redux';
import user from './user';
import perguntas from './perguntas'

const rootReducer = combineReducers({
  user,
  perguntas,
});

export default rootReducer;
