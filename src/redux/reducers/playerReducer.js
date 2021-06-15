import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
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
    };
  default:
    return state;
  }
}

export default playerReducer;
