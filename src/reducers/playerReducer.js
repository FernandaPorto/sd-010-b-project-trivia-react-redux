import { LOGIN } from '../actions/gameAction';

export const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

// name é o nome da pessoa que joga
// assertions é o número de acertos
// score é a pontuação
// gravatarEmail é o email da pessoa que joga

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload };
  default:
    return state;
  }
};

export default player;
