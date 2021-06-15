const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
  case ('ADD_TOKEN'): {
    const token = action.payload;
    return [
      ...state,
      token,
    ];
  }
  default:
    return state;
  }
}
