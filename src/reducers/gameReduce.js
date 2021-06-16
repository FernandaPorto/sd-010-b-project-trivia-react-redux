import { REVEALED } from '../actions/gameAction';

export const INITIAL_STATE = {
  isRevealed: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REVEALED:
    return {
      ...state,
      ...action.payload };
  default:
    return state;
  }
};

export default game;
