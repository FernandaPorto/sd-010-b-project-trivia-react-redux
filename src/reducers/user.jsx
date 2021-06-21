import { LOGIN, GRAVATAR, EACH_SCORE, ASSERTIONS, FETCH } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
  fetchArray: [],
  player: {
    name: '',
    assertions: 0,
    total_Assertions: 0,
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
    };
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.gravatar,

    };
  case EACH_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        eachScore: parseInt(action.payload, 10),
        score: parseInt(state.player.score, 10) + parseInt(action.payload, 10),
      },
    };
  case ASSERTIONS:
    return {
      ...state,
      player: {
        ...state.player,
        assertions:
        state.player.assertions
        + parseInt(action.payload, 10),
      },
    };
  case FETCH:
    return {
      ...state,
      fetchArray: action.payload,
    };
  default:
    return state;
  }
}
