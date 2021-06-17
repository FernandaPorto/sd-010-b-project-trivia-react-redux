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
    const { name, assetions, score, gravatarEmail } = action.payload;
    return {
      ...state,
      name,
      assetions,
      score,
      gravatarEmail,
    };
  }
  default:
    return state;
  }
}
