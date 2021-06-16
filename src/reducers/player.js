import {
  GET_PLAYER_INFO,
  GET_QUESTIONS,
  GET_TOKEN,
  UPDATE_SCORE,
  UPDATE_TIME,
} from '../action';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  token: '',
  score: 0,
  questions: [],
  assertions: [],
  isQuestions: false,
  timeLeft: 0,
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_TOKEN:
    return { ...state, token: payload.token };
  case GET_PLAYER_INFO:
    return { ...state, name: payload.name, gravatarEmail: payload.gravatarEmail };
  case GET_QUESTIONS:
    return { ...state, questions: payload.results, isQuestions: true };
  case UPDATE_TIME:
    return { ...state, timeLeft: payload };
  case UPDATE_SCORE:
    return { ...state, score: payload };
  default:
    return state;
  }
}

export default player;
