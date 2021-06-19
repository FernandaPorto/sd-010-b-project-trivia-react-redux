import { SAVE_NUM_QUESTION } from '../actions';

const INITIAL_STATE = {
  numQuestion: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NUM_QUESTION:
    return {
      ...state,
      numQuestion: action.payload.numQuestion,
    };
  default:
    return state;
  }
};

export default game;
