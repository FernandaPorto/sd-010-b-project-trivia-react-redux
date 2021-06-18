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
  const stateTeste = {
    player: {
      name: action.name,
      gravatarEmail: action.email,
      score: action.score,
      assertions: action.assertions,
    },
  };

  switch (action.type) {
  case LOGIN_PLAYER:
    localStorage.setItem('state', JSON.stringify(stateTeste));
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SCORE_PLAYER:
    const storageScore = JSON.parse(localStorage.getItem('state'));
    storageScore.player.score = action.score;
    localStorage.setItem('state', JSON.stringify(storageScore));
    return {
      ...state,
      score: action.score,
    };
  case ASSERTIONS_PLAYER:
    const storageAssertions = JSON.parse(localStorage.getItem('state'));
    storageAssertions.player.assertions = action.assertions;
    localStorage.setItem('state', JSON.stringify(storageAssertions));
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default userReducer;
