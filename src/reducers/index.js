import { combineReducers } from 'redux'
import trivia from './trivia';

const reducers = combineReducers({
    trivia,
});

export default reducers;