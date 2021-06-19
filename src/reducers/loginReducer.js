import { ADD_PLAYER_INFO, ADD_PLAYER_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_PLAYER_INFO:
    return { ...state,
      name: payload.name,
      gravatarEmail: payload.email };
  case ADD_PLAYER_SCORE:
    return { ...state,
      assertions: state.assertions + payload.assertions,
      score: state.score + payload.score };
  default:
    return state;
  }
};

export default loginReducer;
