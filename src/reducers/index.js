import { combineReducers } from 'redux';
import reducerFetch from './reducerFetch';
import reducerName from './reducerName';
import reducerQuestions from './reducerQuestions';

const rootReducers = combineReducers({ reducerFetch, reducerName, reducerQuestions });

export default rootReducers;
