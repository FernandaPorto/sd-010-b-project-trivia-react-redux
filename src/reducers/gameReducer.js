import { ADD_GAME_DATA, SET_NEXT_QST } from '../actions';

const initialState = {
  data: {},
  current: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_GAME_DATA:
    return { ...state, data: action.payload };
  case SET_NEXT_QST:
    return { ...state, current: state.current + 1 };
  default:
    return state;
  }
};

export default gameReducer;
