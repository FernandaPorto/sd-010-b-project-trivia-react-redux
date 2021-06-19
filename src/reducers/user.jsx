import { LOGIN, GRAVATAR, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
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
      score: parseInt(state.player.score, 10) + parseInt(action.payload, 10),
    };
  default:
    return state;
  }
}
