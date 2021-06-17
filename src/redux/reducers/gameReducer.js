import { TIME_LEFT, TOGGLE_TIMER } from '../actions';

const INITIAL_STATE = {
  timerIsOn: true,
  timeLeft: undefined,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOGGLE_TIMER:
    return {
      ...state,
      timerIsOn: !state.timerIsOn,
    };
  case TIME_LEFT:
    return state;
  default:
    return state;
  }
}

export default gameReducer;
