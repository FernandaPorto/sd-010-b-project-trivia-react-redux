const initialState = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ('PLAYER_LOGIN'): {
    const { name, gravatarEmail } = action.payload;
    return {
      ...state,
      name,
      gravatarEmail,
    };
  }
  case ('SUM_SCORE'): {
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  }
  case ('RESET_SCORE'): {
    return {
      ...state,
      score: 0,
      asserstions: 0,
    };
  }
  default:
    return state;
  }
}
