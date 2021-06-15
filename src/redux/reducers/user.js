const initialState = {
  email: '',
  name: '',
  questions: {},
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return ({
      ...state,
      email: action.value.email,
      name: action.value.name,
    });
  case 'FETCH_QUESTIONS':
    return ({
      ...state,
      questions: action.value,
    });
  default:
    return state;
  }
}

export default loginReducer;
