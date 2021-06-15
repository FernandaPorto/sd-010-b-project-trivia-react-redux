import { SET_TOKEN, INPUT_EMAIL, INPUT_USERNAME, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
  token: '',
  triviaGame: {
    score: 0,
    hits: 0,
  },
};

const user = (state = INITIAL_STATE, action) => {
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
  case UPDATE_SCORE:
    return {
      ...state,
      triviaGame: {
        ...state.triviaGame,
        score: state.triviaGame.score + action.payload.score,
      },
    };
  default:
    return state;
  }
};

export default user;
