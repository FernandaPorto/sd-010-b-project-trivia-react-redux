import { ADD_PLAYER_NAME, ADD_SCORE } from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER_NAME:
    return {
      ...state,
      name: action.payload.name,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
}
export default player;
