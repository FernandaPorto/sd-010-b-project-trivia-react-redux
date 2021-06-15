import { CREATE_ASKS } from '../actions';

const INITIAL_STATE = {
  asks: [],
};

const askReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_ASKS:
    return {
      ...state,
      asks: action.asks,
    };
  default:
    return state;
  }
};

export default askReducer;
