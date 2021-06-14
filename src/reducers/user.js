import { SET_TOKEN, INPUT_EMAIL, INPUT_USERNAME } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
  token: '',
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_EMAIL:
    return {
      ...state,
      email: action.payload.email,
    };
  case INPUT_USERNAME:
    return {
      ...state,
      username: action.payload.username,
    };
  case SET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default trivia;
