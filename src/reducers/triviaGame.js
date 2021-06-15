import { ACTION_TOKEN, ACTION_REDIRECT } from '../actions/index';

const INITIALSTATE = {
  token: '',
  isRedirect: false,
};

function triviaGame(state = INITIALSTATE, action) {
  switch (action.type) {
  case ACTION_REDIRECT:
    return {
      ...state,
      isRedirect: true,
    };
  case ACTION_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}

export default triviaGame;
