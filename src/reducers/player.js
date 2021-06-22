import { RESET_DATA, UPDATE_NAME, UPDATE_ASSERTIONS,
  UPDATE_GRAVATAR_EMAIL, UPDATE_SCORE, UPDATE_URL_GRAVATAR } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  urlGravatar: '',
};

export default function player(state = INITIAL_STATE,
  { type, name, score, gravatarEmail, urlGravatar,
  }) {
  switch (type) {
  case UPDATE_NAME:
    return {
      ...state,
      name,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + score,
    };
  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case UPDATE_GRAVATAR_EMAIL:
    return {
      ...state,
      gravatarEmail,
    };
  case UPDATE_URL_GRAVATAR:
    return {
      ...state,
      urlGravatar,
    };
  case RESET_DATA:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      urlGravatar: '',
    };
  default:
    return state;
  }
}
