import {
  GET_PLAYER_INFO,
  GET_QUESTIONS,
  GET_TOKEN,
  UPDATE_SCORE,
  UPDATE_TIME,
  UPDATE_ASSERTIONS,
  SAVE_AVATAR,
} from '../action';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  token: '',
  score: 0,
  questions: [],
  assertions: 0,
  isQuestions: false,
  timeLeft: 0,
  urlAvatar: '',
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
  case UPDATE_ASSERTIONS:
    return { ...state, assertions: state.assertions + payload };
  case SAVE_AVATAR:
    return { ...state, urlAvatar: payload };
  default:
    return INITIAL_STATE;
  }
}

export default player;
