const initialState = {
  email: '',
  name: '',
  perguntas: {},
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return ({
      ...state,
      email: action.value.email,
      name: action.value.name,
    });
  case 'GET_QUESTIONS':
    return ({
      ...state,
      perguntas: action.value.perguntas,
    });
  default:
    return state;
  }
}

export default loginReducer;
