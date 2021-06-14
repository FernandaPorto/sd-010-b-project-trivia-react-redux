import { LOGIN } from '../actions';

const initialState = {
  email: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case LOGIN:
    return {
      email: payload.email,
      user: payload.user,
    };

  default:
    return state;
  }
};
