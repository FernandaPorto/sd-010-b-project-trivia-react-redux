const initialState = {
  email: '',
  name: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return ({
      ...state,
      email: action.value.email,
      name: action.value.name,
    });
  default:
    return state;
  }
}

export default loginReducer;
