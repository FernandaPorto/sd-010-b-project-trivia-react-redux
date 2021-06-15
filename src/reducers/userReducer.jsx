import {
  LOGIN_PLAYER,
  SCORE_PLAYER,
  ASSERTIONS_PLAYER,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SCORE_PLAYER:
    return {
      ...state,
      score: action.score,
    };
  case ASSERTIONS_PLAYER:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default userReducer;
