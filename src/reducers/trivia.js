import { RECEIVE_QUESTIONS, RECEIVE_TOKEN } from '../actions/actionsType';

const initialState = {
  token: '',
  questions: [],
};

function trivia(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
}
export default trivia;
