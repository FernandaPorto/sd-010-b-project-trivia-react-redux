import { REQUEST } from '../actions/gameAction';

export const INITIAL_STATE = {
  token: '',
  request: '',
};

// name é o nome da pessoa que joga
// assertions é o número de acertos
// score é a pontuação
// gravatarEmail é o email da pessoa que joga

const apiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      request: action.array,
    };
  default:
    return state;
  }
};

export default apiReducer;
