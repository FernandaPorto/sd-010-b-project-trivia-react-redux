import { ENVIA_DADOS_USUARIO, UPDATE_PLAYER_POINTS, CLEAR_ALL_DATA_STORE } from '../actions/index';

const INITIAL_STATE = {
  name: 'qualquernome',
  assertions: 0,
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
      assertions: state.assertions + action.payload.correctAnswer,
      score: state.score + action.payload.answerPoints,
    };
  case CLEAR_ALL_DATA_STORE:
    return INITIAL_STATE;
  default:
    return state;
  }
}
