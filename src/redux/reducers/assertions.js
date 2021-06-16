import { ASSERTIONS } from '../actions';

const initialState = {
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ASSERTIONS:
    return {
      total: action.payload,
    };
  default:
    return state;
  }
};
