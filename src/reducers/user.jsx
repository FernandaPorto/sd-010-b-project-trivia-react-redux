import { LOGIN, GRAVATAR } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
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
  default:
    return state;
  }
}
