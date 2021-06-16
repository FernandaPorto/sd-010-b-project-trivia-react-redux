import { ADD_PLAYER_TO_RANKING } from '../actions';

const INITIAL_STATE = [];

export default function ranking(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER_TO_RANKING:
    return [...state, action.payload];

  default:
    return state;
  }
}
