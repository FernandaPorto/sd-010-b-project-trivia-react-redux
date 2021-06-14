import { createStore, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../reducers/index';

const devTools = window.devToolsExtension() || ((data) => data);

const store = createStore(
  rootReducers,
  compose(devTools),
);

export default store;
