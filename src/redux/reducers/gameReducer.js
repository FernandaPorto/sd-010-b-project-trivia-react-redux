import { UPDATE_SECONDS } from '../actions';

const INITIAL_STATE = {
  secondsLeft: 30,
};

function gameReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case UPDATE_SECONDS:
    return {
      ...state,
      secondsLeft: payload.secondsLeft,
    };
  default:
    return state;
  }
}

export default gameReducer;
