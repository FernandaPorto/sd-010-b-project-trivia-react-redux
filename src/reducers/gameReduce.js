import { TIMER } from '../actions/correctAnswer';
import { REVEALED } from '../actions/gameAction';

export const INITIAL_STATE = {
  isRevealed: false,
  time: 30,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER:
    return {
      ...state,
      time: action.time - 1 };
  case REVEALED:
    return {
      ...state,
      ...action.payload };
  default:
    return state;
  }
};

export default game;
