import { RECEIVE_TOKEN } from '../actions';

const initialState = {
  token: '',
};

function login(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}
export default login;
