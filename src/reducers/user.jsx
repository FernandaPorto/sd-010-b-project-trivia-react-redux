import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',

};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
}
