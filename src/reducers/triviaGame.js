import { ACTION_TOKEN } from '../actions/index';

const INITIALSTATE = {};

function triviaGame(state = INITIALSTATE, action) {
  switch (action.type) {
  case ACTION_TOKEN:
    return {
      ...state, token,
    };
  default:
    return state;
  }
}

export default triviaGame;
