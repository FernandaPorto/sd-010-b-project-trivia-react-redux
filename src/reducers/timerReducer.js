import { START_TIMER, DOWN_TIMER, RESET_TIMER, ANSWERED } from '../actions/index';

const initialState = {
  time: 30,
  ticTac: null,
  answered: false,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_TIMER:
    return { ...state, ticTac: action.payload };
  case DOWN_TIMER:
    return { ...state, time: state.time - 1 };
  case RESET_TIMER:
    return { ...state, time: 30 };
  case ANSWERED:
    return { ...state, answered: action.payload };
  default:
    return state;
  }
};

export default timerReducer;
