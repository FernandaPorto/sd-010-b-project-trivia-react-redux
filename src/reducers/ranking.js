const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
  case ('ADD_TO_RANKING'): {
    const { name, score, gravatarEmail } = action.payload;
    return [
      ...state,
      {
        name,
        score,
        picture: gravatarEmail,
      },
    ];
  }
  default:
    return state;
  }
}
