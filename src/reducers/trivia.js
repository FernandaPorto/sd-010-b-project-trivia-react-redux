import { SUCCESS_TRIVIA, ERR_TRIVIA, LOADING } from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  results: [],
  err: '',
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS_TRIVIA:
    return { ...state, isFetching: action.isFetching, results: action.results };
  case ERR_TRIVIA:
    return { ...state, err: action.err };
  case LOADING:
    return { ...state, isFetching: action.isFetching };
  default:
    return state;
  }
};

export default trivia;
