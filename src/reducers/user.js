const initialState = {
  name: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ('USER_LOGIN'): {
    const name = action.payload;
    return {
      ...state,
      name,
    };
  }
  default:
    return state;
  }
}
