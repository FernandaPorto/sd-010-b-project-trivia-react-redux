import { ENVIA_DADOS_USUARIO } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ENVIA_DADOS_USUARIO:
    return {
      ...state,
      name: action.payload.nome,
      gravatarEmail: action.payload.email };
  default:
    return state;
  }
}
