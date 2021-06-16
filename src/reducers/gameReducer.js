import { ADD_GAME_DATA } from '../actions';

const initialState = {
  data: {},
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_GAME_DATA:
    return { ...state, data: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
