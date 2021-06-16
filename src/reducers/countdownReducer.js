import { DECREASE_COUNT, START_COUNT } from '../actions/index';

const INITIAL_STATE = {
  count: 30,
};

const countReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_COUNT:
    return (INITIAL_STATE);
  case DECREASE_COUNT:
    return ({
      ...state,
      count: state.count - 1,
    });
  default:
    return state;
  }
};

export default countReducer;
