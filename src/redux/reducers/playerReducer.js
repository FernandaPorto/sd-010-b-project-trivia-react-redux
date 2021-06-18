import { LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  gravatarURL: '',
  assertions: 0,
  score: 0,
};

function playerReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
      gravatarURL: payload.gravatarURL,
    };
  case UPDATE_SCORE:
    if (payload.score !== 0) {
      return {
        ...state,
        assertions: state.assertions + 1,
        score: state.score + payload.score,
      };
    }
    return state;
  default:
    return state;
  }
}

export default playerReducer;
