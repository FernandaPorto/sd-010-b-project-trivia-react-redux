import { REQUEST_API } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

function reducerFetch(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  default:
    return state;
  }
}
export default reducerFetch;
