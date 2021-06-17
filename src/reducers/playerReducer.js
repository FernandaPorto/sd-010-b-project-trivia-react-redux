import { CORRECT } from '../actions/correctAnswer';
import { LOGIN } from '../actions/gameAction';

export const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

// name é o nome da pessoa que joga
// assertions é o número de acertos
// score é a pontuação
// gravatarEmail é o email da pessoa que joga

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CORRECT:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.points.score };
  case LOGIN:
    return {
      ...state,
      ...action.payload };
  default:
    return state;
  }
};

export default player;
