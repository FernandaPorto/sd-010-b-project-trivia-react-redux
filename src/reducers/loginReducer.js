import { SET_NAME, SET_ASSERTIONS, SET_SCORE, SET_EMAIL } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_NAME:
    return { ...state, name: action.payload };
  case SET_ASSERTIONS:
    return { ...state, assertions: action.payload };
  case SET_SCORE:
    return { ...state, score: action.payload };
  case SET_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  default:
    return state;
  }
};

export default loginReducer;
