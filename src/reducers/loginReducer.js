import { ADD_PLAYER_INFO } from '../actions';

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
  default:
    return state;
  }
};

export default loginReducer;
