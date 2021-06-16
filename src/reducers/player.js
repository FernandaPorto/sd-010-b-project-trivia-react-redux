const initialState = {
  name: '',
  gravatarEmail: '',
  score: '0',
  assertions: '',
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
  default:
    return state;
  }
}
