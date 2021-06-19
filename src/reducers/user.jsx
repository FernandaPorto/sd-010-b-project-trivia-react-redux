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
        gravatarEmail: action.gravatar,
      },
      ranking: {
        name: action.name,
        score: action.score,
        picture: action.gravatarEmail,
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
      score: parseInt(action.payload.score, 10) + parseInt(action.payload.score, 10),

    };
  default:
    return state;
  }
}
