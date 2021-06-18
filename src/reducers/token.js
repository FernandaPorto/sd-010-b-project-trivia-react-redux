import { IS_LOADING, GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: [],
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      ...state,
      isLoading: false,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
      isLoading: false,
    };

  default:
    return state;
  }
};

export default token;
