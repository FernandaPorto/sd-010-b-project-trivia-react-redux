import {
  REQUEST_API,
  GET_TOKEN,
  GET_QUESTIONS,
} from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

function apiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
}

export default apiReducer;
