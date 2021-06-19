import { LOGIN, GRAVATAR, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
  userScore: 0,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.gravatar,

    };
  case SCORE:
    return {
      ...state,
      userScore: action.payload.score,

    };
  default:
    return state;
  }
}
