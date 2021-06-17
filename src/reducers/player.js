const initialState = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  token: '',
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
  case ('ADD_TOKEN'): {
    const token = action.payload;
    return {
      ...state,
      token,
    };
  }
  default:
    return state;
  }
}
