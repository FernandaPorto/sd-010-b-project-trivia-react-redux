import { SAVE_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const reducerName = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return { ...state, name: action.name };
  case 'SAVE_EMAIL':
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default reducerName;
