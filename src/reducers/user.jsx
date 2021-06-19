import { LOGIN, GRAVATAR, SCORE, EACH_SCORE, ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    eachScore: 0,
    gravatarEmail: '',
  },
  // ranking: [
  //   { name: '',
  //     score: 0,
  //     picture: '',
  //   },
  // ],
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    //   player: {
    //     name: action.payload.name,
    //     gravatarEmail: action.payload.email,
    //   },
    };
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.gravatar,

    };
  case SCORE:
    return {
      ...state,
      player: { score: parseInt(state.player.score, 10)
        + parseInt(action.player.eachScore, 10) },

    };
  case EACH_SCORE:
    return {
      ...state,
      player: { eachScore: parseInt(action.payload, 10) },

    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: parseInt(action.assertions.score, 10)
      + parseInt(action.payload.player.assertions, 10),
    };
  default:
    return state;
  }
}
