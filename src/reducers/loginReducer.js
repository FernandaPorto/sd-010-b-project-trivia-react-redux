import { ADD_PLAYER_INFO } from '../actions';

const initialState = {
  name: '',
  gravatarEmail: '',
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_PLAYER_INFO:
    return { ...payload };
  default:
    return state;
  }
};

export default loginReducer;
