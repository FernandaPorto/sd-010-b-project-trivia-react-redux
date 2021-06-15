import { combineReducers } from 'redux';

import user from './user';
import trivia from './trivia';

const reducers = combineReducers({
  user,
  trivia,
});

export default reducers;
