import { SEND_EMAIL, SEND_NOME, SEND_GRAVATAR, GOAL } from '../actions/index';

const INITIAL_STATE = ({
  email: '',
  nome: '',
  gravatar: '',
  score: 0,
  assertions: 0,
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
  case GOAL:
    return ({
      ...state,
      score: action.score + state.score,
      assertions: state.assertions + 1,
    });
  default:
    return (state);
  }
};

export default playerReducer;
