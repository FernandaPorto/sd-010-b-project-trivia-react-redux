import { combineReducers } from 'redux';
import reducerFetch from './reducerFetch';
import reducerName from './reducerName';

const rootReducers = combineReducers({ reducerFetch, reducerName });

export default rootReducers;
