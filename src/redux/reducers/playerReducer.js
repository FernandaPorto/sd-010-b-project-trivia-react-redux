import { LOGIN } from '../actions';

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
  default:
    return state;
  }
}

export default playerReducer;
