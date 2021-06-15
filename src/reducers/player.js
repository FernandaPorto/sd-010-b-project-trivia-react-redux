import { ADD_PLAYER_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER_NAME:
    return {
      ...state,
      name: action.payload.name,
    };
  default:
    return state;
  }
}
export default player;
