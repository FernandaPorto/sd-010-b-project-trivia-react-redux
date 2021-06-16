import { IS_FETCH, GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: [],
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCH:
    return {
      ...state,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };

  default:
    return state;
  }
};

export default token;
