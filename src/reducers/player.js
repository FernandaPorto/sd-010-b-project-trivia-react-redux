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
  case ('PLAYER_SCORE'): {
    const { name, assertions, score, gravatarEmail } = action.payload;
    return {
      ...state,
      name,
      assertions,
      score,
      gravatarEmail,
    };
  }
  case ('PLAY_RESET'): {
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  }
  default:
    return state;
  }
}
