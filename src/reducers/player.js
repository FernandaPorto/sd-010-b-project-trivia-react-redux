import { ENVIA_DADOS_USUARIO, UPDATE_PLAYER_POINTS } from '../actions/index';

const INITIAL_STATE = {
  name: 'qualquernome',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ENVIA_DADOS_USUARIO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email };
  case UPDATE_PLAYER_POINTS:
    return {
      ...state,
      assertions: assertions + action.payload.correctAnswer,
      score: score + action.payload.answerPoints,
    };
  default:
    return state;
  }
}
