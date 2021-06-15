import { SEND_EMAIL, SEND_NOME, SEND_GRAVATAR } from '../actions/index';

const INITIAL_STATE = ({
  email: '',
  nome: '',
  gravatar: '',
});

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_EMAIL:
    return ({
      ...state,
      email: action.email,
    });
  case SEND_NOME:
    return ({
      ...state,
      nome: action.nome,
    });
  case SEND_GRAVATAR:
    return ({
      ...state,
      gravatar: action.gravatar,
    });
  default:
    return (state);
  }
};

export default playerReducer;
