import { LOGIN, START_GAME, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  gravatarEmail: '',
  gravatarURL: '',
  name: '',
  score: 0,
};

function playerReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: payload.email,
      gravatarURL: payload.gravatarURL,
      name: payload.name,
    };
  case START_GAME:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + payload.newScore,
    };
  default:
    return state;
  }
}

export default playerReducer;
