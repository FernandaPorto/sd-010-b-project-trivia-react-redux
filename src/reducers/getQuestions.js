import { IS_LOADING_TRIVIA, GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
  // isLoadingTrivia: true,
};

const getQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING_TRIVIA:
    return {
      ...state,
      isLoadingTrivia: action.isLoadingTrivia,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      response_code: action.response_code,
      results: action.results,
      isLoadingTrivia: action.isLoadingTrivia,
    };
  default:
    return state;
  }
};

export default getQuestions;
