import { SCORE } from '../actions';

const initialState = {
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SCORE:
    return {
      total: action.payload,
    };
  default:
    return state;
  }
};
