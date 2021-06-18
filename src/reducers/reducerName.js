import { SAVE_NAME,
  SAVE_EMAIL,
  SAVE_ASSERTIONS,
  SAVE_GRAVATAR,
  SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  gravatar: '',
  assertions: 0,
};

const reducerName = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return { ...state, name: action.name };
  case SAVE_EMAIL:
    return { ...state, email: action.email };
  case SAVE_ASSERTIONS: // GOAL
    return { ...state,
      assertions: action.acertos };
  case SAVE_GRAVATAR:
    return { ...state, gravatar: action.gravatar };
  case SAVE_SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
};

export default reducerName;
