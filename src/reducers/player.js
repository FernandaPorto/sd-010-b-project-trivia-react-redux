const initialState = {
  name: '',
  imgPath: '',
  score: '0',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ('PLAYER_LOGIN'): {
    const { name, imgPath } = action.payload;
    return {
      ...state,
      name,
      imgPath,
    };
  }
  default:
    return state;
  }
}
