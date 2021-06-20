import { ADD_GAME_DATA } from '../actions';

const initialState = {
  data: {},
};

const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_GAME_DATA:
    return { ...state, data: payload };
  default:
    return state;
  }
};

export default gameReducer;
