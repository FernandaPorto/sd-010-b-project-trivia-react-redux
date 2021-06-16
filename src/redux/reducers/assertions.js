import { ASSERTIONS } from '../actions';

const initialState = {
  total: NaN,
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
