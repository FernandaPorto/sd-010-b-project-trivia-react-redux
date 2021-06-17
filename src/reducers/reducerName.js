import { SAVE_NAME, SAVE_EMAIL, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const reducerName = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return { ...state, name: action.name };
  case SAVE_EMAIL:
    return { ...state, email: action.email };
  case SAVE_SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
};

export default reducerName;
