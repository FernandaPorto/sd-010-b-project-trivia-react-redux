const INITIAL_PLAYER_STATE = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timeOut: false,
};

const player = (state = INITIAL_PLAYER_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL_NOME_LOGIN':
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  case 'SET_PLAYER':
    return action.payload;
  case 'REQUEST_TRIVIA_API':
    return {
      ...state,
      isFetching: action.payload.isFetching,
    };
  case 'REQUEST_TRIVIA_API_SUCCESS':
    return {
      ...state,
      isFetching: action.payload.isFetching,
      query: action.payload.query,
    };
  case 'REQUEST_TRIVIA_API_ERROR':
    return {
      ...state,
      isFetching: action.payload.isFetching,
      error: action.payload.error,
    };
  case 'POINTS_PLAYER':
    return {
      ...state,
      assertions: state.assertions + action.payload.correctAnswer,
      score: state.score + action.payload.answerPoints,
    };
  case 'SET_SCORE':
    return {
      ...state,
      score: action.payload.score,
      assertions: state.assertions + 1,
    };

  default:
    return state;
  }
};

export default player;
