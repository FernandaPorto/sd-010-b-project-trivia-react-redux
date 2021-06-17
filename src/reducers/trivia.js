import {
  RECEIVE_QUESTIONS, RECEIVE_TOKEN,
  TOGGLE_CRONOMETER, GET_SECONDS } from '../actions/actionsType';

const initialState = {
  token: '',
  questions: [],
  statusCronometer: 'on',
  seconds: 30,
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
  case TOGGLE_CRONOMETER:
    return {
      ...state,
      statusCronometer: action.status,
    };
  case GET_SECONDS:
    return {
      ...state,
      seconds: action.seconds,
    };
  default:
    return state;
  }
}
export default trivia;
