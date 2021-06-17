import { ADD_PLAYER_INFO, ADD_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_PLAYER_INFO:
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email };
  case ADD_SCORE:
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
};

export default loginReducer;
