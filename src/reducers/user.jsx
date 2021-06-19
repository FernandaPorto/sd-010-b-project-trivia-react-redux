import { LOGIN, GRAVATAR, SCORE, EACH_SCORE, ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    eachScore: '',
    gravatarEmail: '',
  },
  ranking: [
    { name: '',
      score: 0,
      picture: '',
    },
  ],
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      player: {
        name: action.payload.name,
        assertions: action.assertions,
        score: action.score,
        gravatarEmail: action.payload.email,
      },
      ranking: {
        name: action.payload.name,
        score: action.score,
        picture: action.payload.gravatarEmail,
      },
    };
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.gravatar,

    };
  case SCORE:
    return {
      ...state,
      score: parseInt(state.player.assertions, 10) + parseInt(action.ranking.score, 10),

    };
  case EACH_SCORE:
    return {
      ...state,
      eachScore: parseInt(action.ranking.score, 10),

    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: parseInt(action.ranking.score, 10)
      + parseInt(action.payload.player.assertions, 10),
    };
  default:
    return state;
  }
}
