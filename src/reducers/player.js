const PLAYER_INITIAL_STATE = {
  playerGravatar: '',
  playerName: '',
  score: 0,
  assertions: 0,
};

function player(state = PLAYER_INITIAL_STATE, action) {
  switch (action.type) {
  case 'PLAYER':
    return {
      ...state,
      playerName: action.payload.name,
    };
  case 'GRAVATAR':
    return {
      ...state,
      playerGravatar: action.payload.email,
    };
  case 'SCORE':
    return {
      ...state,
      score: action.payload.score,
    };
  case 'ASSERTIONS':
    return {
      ...state,
      assertions: state.assertions + action.amount,
    };
  default:
    return state;
  }
}

export default player;
