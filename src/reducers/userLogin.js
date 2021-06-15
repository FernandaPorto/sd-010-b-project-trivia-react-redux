import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userLogin;
